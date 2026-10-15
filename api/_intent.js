/**
 * SwasthyaSetu AI - Query Intent & Parameter Extraction Engine
 * 
 * Separates concerns:
 * - Identifies user intent (Emergency, Facility Search, Scheme Info, Clinical Inquiry, Preparation, Greeting)
 * - Detects language (English, Hindi, Hinglish)
 * - Extracts geographic parameters (district, block, PIN) without storing PHI
 * - Determines whether external TinyFish web retrieval is genuinely required
 */

const { evaluateDeterministicTriage } = require('./_triageRules.js');

const INTENT_TYPES = {
  EMERGENCY: 'EMERGENCY',
  FACILITY_SEARCH: 'FACILITY_SEARCH',
  SCHEME_INQUIRY: 'SCHEME_INQUIRY',
  HEALTH_INFO: 'HEALTH_INFO',
  PREPARATION_CHECKLIST: 'PREPARATION_CHECKLIST',
  GENERAL_CONVERSATION: 'GENERAL_CONVERSATION'
};

// Known Indian districts and towns in UP / Delhi NCR
const KNOWN_LOCATIONS = [
  'lucknow', 'bakshi ka talab', 'bkt', 'sitapur', 'mal', 'mohanlalganj',
  'kanpur', 'varanasi', 'prayagraj', 'gorakhpur', 'delhi', 'noida', 'ghaziabad'
];

/**
 * Detect language of the input query
 */
function detectLanguage(text) {
  if (!text) return 'en';
  // Check Devanagari Unicode block
  const devanagariPattern = /[\u0900-\u097F]/;
  if (devanagariPattern.test(text)) {
    return 'hi';
  }

  // Hinglish detection (common romanized Hindi words)
  const hinglishKeywords = [
    'kya', 'kaise', 'kaha', 'hai', 'mera', 'meri', 'mujhe', 'bukhar', 'dard',
    'aspataal', 'dawa', 'dawakhana', 'sarkari', 'batao', 'chahiye', 'karna',
    'garbh', 'bachha', 'ilaj', 'yojana', 'paisa'
  ];
  const words = text.toLowerCase().split(/\s+/);
  const isHinglish = words.some(w => hinglishKeywords.includes(w));
  if (isHinglish) {
    return 'hinglish';
  }

  return 'en';
}

/**
 * Extract location keywords from query
 */
function extractLocation(text) {
  const lower = text.toLowerCase();
  for (const loc of KNOWN_LOCATIONS) {
    if (lower.includes(loc)) {
      if (loc === 'bkt' || loc === 'bakshi ka talab') return 'Bakshi Ka Talab, Lucknow';
      return loc.charAt(0).toUpperCase() + loc.slice(1);
    }
  }

  // Check 6-digit Indian PIN code
  const pinMatch = text.match(/\b([1-9][0-9]{5})\b/);
  if (pinMatch) {
    return `PIN ${pinMatch[1]}`;
  }

  return null;
}

/**
 * Classify user intent and determine if TinyFish search is needed
 */
function analyzeUserQuery(message, context = {}) {
  const text = String(message || '').trim();
  const lang = context.preferredLanguage || detectLanguage(text);

  // 1. Mandatory First Step: Deterministic Emergency Red-Flag Screen
  const emergencyCheck = evaluateDeterministicTriage({ symptomsText: text });
  if (emergencyCheck.isEmergency) {
    return {
      intent: INTENT_TYPES.EMERGENCY,
      requiresExternalSearch: false,
      language: lang,
      emergencyCheck,
      extractedLocation: null,
      missingParams: []
    };
  }

  const lower = text.toLowerCase();

  // 2. Healthcare Facility / Public Resource Search Intent
  const facilityKeywords = [
    'hospital', 'phc', 'chc', 'clinic', 'centre', 'center', 'doctor', 'aspataal',
    'jan aushadhi', 'pharmacy', 'dawakhana', 'medical store', 'ambulance', 'kendra',
    'blood bank', 'find', 'nearby', 'paas', 'kaha hai', 'kidhar', 'address'
  ];
  const isFacility = facilityKeywords.some(kw => lower.includes(kw));

  // 3. Government Scheme Intent
  const schemeKeywords = [
    'scheme', 'yojana', 'ayushman', 'pmjay', 'pm-jay', 'card', 'bima',
    'janani', 'suraksha', 'matru', 'vandana', 'free treatment', 'eligibility',
    'paise', 'labh', 'subsidy'
  ];
  const isScheme = schemeKeywords.some(kw => lower.includes(kw));

  // 4. Preparation / Visit Checklist Intent
  const prepKeywords = [
    'prepare', 'documents', 'what to carry', 'kya le jana', 'kagaz', 'parchi',
    'before visit', 'timing', 'samay', 'check-up kaise'
  ];
  const isPrep = prepKeywords.some(kw => lower.includes(kw));

  // 5. General Greeting / Conversational Intent
  const greetingKeywords = [
    'hello', 'hi', 'namaste', 'pranam', 'hey', 'good morning', 'good afternoon', 'kaise ho'
  ];
  const isGreeting = greetingKeywords.some(kw => lower === kw || lower.startsWith(kw + ' '));

  const extractedLocation = extractLocation(text) || context.userLocation || null;

  if (isFacility) {
    return {
      intent: INTENT_TYPES.FACILITY_SEARCH,
      requiresExternalSearch: true,
      category: lower.includes('jan aushadhi') ? 'pharmacy' : (lower.includes('chc') ? 'chc' : (lower.includes('phc') ? 'phc' : 'hospital')),
      language: lang,
      extractedLocation,
      missingParams: extractedLocation ? [] : ['location'],
      searchQuery: `${text} ${extractedLocation || 'Lucknow'} public health site:gov.in`
    };
  }

  if (isScheme) {
    return {
      intent: INTENT_TYPES.SCHEME_INQUIRY,
      requiresExternalSearch: true,
      category: 'scheme',
      language: lang,
      extractedLocation,
      missingParams: [],
      searchQuery: `${text} official eligibility government scheme site:gov.in`
    };
  }

  if (isPrep) {
    return {
      intent: INTENT_TYPES.PREPARATION_CHECKLIST,
      requiresExternalSearch: false,
      language: lang,
      extractedLocation,
      missingParams: []
    };
  }

  if (isGreeting) {
    return {
      intent: INTENT_TYPES.GENERAL_CONVERSATION,
      requiresExternalSearch: false,
      language: lang,
      extractedLocation,
      missingParams: []
    };
  }

  // Default: Health / Symptom Information
  return {
    intent: INTENT_TYPES.HEALTH_INFO,
    requiresExternalSearch: false,
    language: lang,
    extractedLocation,
    missingParams: []
  };
}

module.exports = {
  INTENT_TYPES,
  detectLanguage,
  extractLocation,
  analyzeUserQuery
};
