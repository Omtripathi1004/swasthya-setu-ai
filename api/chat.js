/**
 * SwasthyaSetu AI - Server-Side Intelligent Healthcare Chat API Handler
 * Route: /api/chat
 * 
 * Pipeline:
 * User Message → Input Validation (No PHI) → Independent Safety & Urgency Check 
 *   → Intent & Location Analysis → Selective TinyFish Retrieval → LLM Grounded Synthesis 
 *   → Simplified Structured Answer → Session Isolated Context
 */

const { analyzeUserQuery, INTENT_TYPES } = require('./_intent.js');
const { searchHealthcareResources } = require('./_tinyfish.js');
const { generateHealthcareChatResponse } = require('./_llm.js');

// In-memory isolated session store for short-term conversation context (30 min TTL)
const sessions = new Map();
const SESSION_TTL_MS = 30 * 60 * 1000;

function getSessionHistory(sessionId) {
  if (!sessionId) return [];
  const session = sessions.get(sessionId);
  if (session && (Date.now() - session.updatedAt < SESSION_TTL_MS)) {
    return session.history;
  }
  return [];
}

function updateSessionHistory(sessionId, userMsg, botAnswer) {
  if (!sessionId) return;
  const history = getSessionHistory(sessionId);
  history.push({ role: 'user', content: userMsg });
  history.push({ role: 'assistant', content: botAnswer });
  // Keep max 6 turns to avoid context bloat
  const trimmed = history.slice(-6);
  sessions.set(sessionId, {
    history: trimmed,
    updatedAt: Date.now()
  });
}

function clearSession(sessionId) {
  if (sessionId && sessions.has(sessionId)) {
    sessions.delete(sessionId);
    return true;
  }
  return false;
}

module.exports = async function handler(req, res) {
  const reqId = `chat_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
  const startTime = Date.now();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'The /api/chat route only accepts POST requests.'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { message, sessionId = 'default_session', language = 'en', userLocation = 'Lucknow', clear = false } = body;

    // Handle session clearing request
    if (clear) {
      clearSession(sessionId);
      return res.status(200).json({
        request_id: reqId,
        status: 'session_cleared',
        message: 'Conversation history successfully cleared for this session.'
      });
    }

    if (!message || String(message).trim() === '') {
      return res.status(400).json({
        status: 'invalid_request',
        error_code: 'EMPTY_MESSAGE',
        message: 'Message cannot be empty.'
      });
    }

    const cleanMessage = String(message).trim().slice(0, 500);

    // Privacy Safeguard: Reject raw 10-12 digit identification sequences (Aadhaar / Mobile) or email
    if (/\b\d{10,12}\b/.test(cleanMessage) || /@/.test(cleanMessage)) {
      return res.status(400).json({
        status: 'invalid_request',
        error_code: 'PHI_REJECTED',
        message: 'To protect your privacy, personal identification numbers (Aadhaar), phone numbers, and email addresses must not be shared with the chat assistant.'
      });
    }

    // Step 1: Independent Safety & Urgency Screen (Runs before any LLM or web retrieval)
    const analysis = analyzeUserQuery(cleanMessage, { preferredLanguage: language, userLocation });

    if (analysis.intent === INTENT_TYPES.EMERGENCY) {
      const em = analysis.emergencyCheck;
      const isHindi = analysis.language === 'hi' || analysis.language === 'hinglish';
      
      const emergencyResponse = {
        request_id: reqId,
        status: 'emergency_escalation',
        intent: INTENT_TYPES.EMERGENCY,
        is_emergency: true,
        urgency_level: 'EMERGENCY',
        simple_answer: isHindi
          ? '🚨 अत्यंत महत्वपूर्ण आपातकालीन चेतावनी: आपके द्वारा बताए गए लक्षण जीवन के लिए गंभीर जोखिम की ओर इशारा करते हैं।'
          : '🚨 CRITICAL EMERGENCY WARNING: The symptoms described indicate a potentially life-threatening emergency.',
        what_this_means: isHindi
          ? 'यह एक मेडिकल आपातकाल है। इसे सामान्य ओपीडी या घरेलू उपचार से ठीक नहीं किया जा सकता। तत्काल अस्पताल पहुंचना अनिवार्य है।'
          : 'This situation requires immediate professional emergency medical intervention. Do not wait for routine appointments.',
        what_to_do_next: [
          isHindi ? 'तुरंत 112 या 108 डायल करके आपातकालीन सरकारी एम्बुलेंस बुलाएं।' : 'Call 112 or 108 immediately for an emergency ambulance.',
          isHindi ? `सीधे नज़दीकी आपातकालीन अस्पताल (${em.recommendedFacilityTier}) के ट्रॉमा वार्ड जाएं।` : `Proceed immediately to the nearest 24x7 emergency trauma facility: ${em.recommendedFacilityTier}.`
        ],
        what_to_prepare: [
          isHindi ? 'मरीज का कोई भी सरकारी पहचान पत्र (यदि तुरंत उपलब्ध हो, अन्यथा इसके लिए समय न गंवाएं)' : 'Any available identification or medical card (do not delay departure to locate them)'
        ],
        sources: [
          { title: 'National Emergency Helpline 112', url: 'https://112.gov.in', authority: 'Government of India' },
          { title: 'Uttar Pradesh 108 Emergency Ambulance Service', url: 'https://upnrhm.gov.in', authority: 'National Health Mission' }
        ],
        important_limitations: isHindi
          ? 'यह एक स्वचालित सुरक्षा नियम है जिसे बदला नहीं जा सकता। तुरंत आपातकालीन चिकित्सा सहायता प्राप्त करें।'
          : 'This is a deterministic safety alert that cannot be downgraded. Seek immediate emergency medical care.',
        follow_up_questions: [],
        latency_ms: Date.now() - startTime
      };

      return res.status(200).json(emergencyResponse);
    }

    // Step 2: Selective External Information Retrieval via TinyFish (Only when needed)
    let evidence = [];
    let tinyFishStatus = 'not_needed';

    if (analysis.requiresExternalSearch) {
      try {
        const tfResult = await searchHealthcareResources({
          query: cleanMessage,
          category: analysis.category || 'all',
          district: analysis.extractedLocation || userLocation || 'Lucknow',
          state: 'Uttar Pradesh'
        });

        if (tfResult && tfResult.results && tfResult.results.length > 0) {
          evidence = tfResult.results.slice(0, 3);
          tinyFishStatus = tfResult.status;
        } else {
          tinyFishStatus = 'no_results';
        }
      } catch {
        tinyFishStatus = 'search_failed';
      }
    }

    // Step 3: Conversation History Context Retrieval
    const conversationHistory = getSessionHistory(sessionId);

    // Step 4: Grounded LLM Response / Simplified Answer Synthesis
    const llmResult = await generateHealthcareChatResponse({
      message: cleanMessage,
      intent: analysis.intent,
      evidence,
      conversationHistory,
      language: analysis.language,
      location: analysis.extractedLocation || userLocation || 'Lucknow'
    });

    // Step 5: Update Session Memory
    updateSessionHistory(sessionId, cleanMessage, llmResult.simple_answer);

    const latency = Date.now() - startTime;
    console.log(`[API /api/chat] id=${reqId} session=${sessionId} intent=${analysis.intent} latency=${latency}ms tinyfish=${tinyFishStatus}`);

    return res.status(200).json({
      request_id: reqId,
      session_id: sessionId,
      intent: analysis.intent,
      detected_language: analysis.language,
      tinyfish_status: tinyFishStatus,
      latency_ms: latency,
      ...llmResult
    });
  } catch (error) {
    const latency = Date.now() - startTime;
    console.error(`[API /api/chat] id=${reqId} error=${error.message} latency=${latency}ms`);

    return res.status(500).json({
      request_id: reqId,
      status: 'internal_error',
      message: 'An unexpected error occurred while processing your healthcare inquiry. Please try again.'
    });
  }
};
