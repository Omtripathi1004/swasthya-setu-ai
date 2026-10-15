/**
 * SwasthyaSetu AI - Intelligent Multilingual Healthcare Assistant
 * 
 * Powered by:
 * - Deterministic Safety Layer (Instant 112/108 Red-Flag Escapement)
 * - TinyFish Public Healthcare Web Discovery
 * - LLM Provider with Grounded Public Health Engine
 * - Simplified 6-Part Answer Architecture with Source Provenance
 */

import { state } from '../state.js';

// Generate or retrieve persistent session ID for isolated conversation memory
let currentChatSessionId = `ss_session_${Math.random().toString(36).substring(2, 9)}`;

export function renderAIAssistantView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      <!-- Title & Disclaimer Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <i data-lucide="bot" class="w-7 h-7"></i>
            </div>
            <div>
              <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
                ${isHindi ? 'स्वास्थसेतु एआई स्वास्थ्य सहायक' : 'SwasthyaSetu AI Healthcare Navigator'}
                <span class="bg-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Multilingual AI + TinyFish
                </span>
              </h1>
              <p class="text-xs text-emerald-100/90">
                ${isHindi 
                  ? 'प्रामाणिक सरकारी स्वास्थ्य जानकारी, योजनाएं, पीएचसी/सीएचसी खोज एवं सुरक्षा-प्रथम मार्गदर्शन।' 
                  : 'Grounded public health intelligence, government schemes, hospital discovery & safety-first triage.'}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button id="chat-btn-lang-en" class="chat-lang-btn ${state.currentLanguage === 'en' ? 'bg-emerald-600 font-bold' : 'bg-white/10 hover:bg-white/20'} text-white text-xs px-2.5 py-1 rounded-lg border border-white/20 transition">English</button>
            <button id="chat-btn-lang-hi" class="chat-lang-btn ${state.currentLanguage === 'hi' ? 'bg-emerald-600 font-bold' : 'bg-white/10 hover:bg-white/20'} text-white text-xs px-2.5 py-1 rounded-lg border border-white/20 transition">हिन्दी</button>
            <button id="chat-btn-lang-hinglish" class="chat-lang-btn ${state.currentLanguage === 'hinglish' ? 'bg-emerald-600 font-bold' : 'bg-white/10 hover:bg-white/20'} text-white text-xs px-2.5 py-1 rounded-lg border border-white/20 transition">Hinglish</button>
            
            <button id="btn-clear-chat-history" title="Clear conversation history" class="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/20 transition ml-2">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- Mandatory Disclaimer Notice -->
        <div class="mt-4 p-3 bg-amber-500/15 border border-amber-400/30 rounded-xl text-xs text-amber-200 flex items-start gap-2">
          <i data-lucide="shield-alert" class="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400"></i>
          <span>
            <strong>${isHindi ? 'सुरक्षा सूचना' : 'Clinical Safety Notice'}:</strong> 
            ${isHindi 
              ? 'यह सहायक केवल सामान्य स्वास्थ्य जानकारी और देखभाल मार्गदर्शन प्रदान करता है। यह डॉक्टर का विकल्प नहीं है और दवाइयां नहीं लिखता है। आपातकाल में तुरंत 112 या 108 डायल करें।' 
              : 'SwasthyaSetu AI provides verified information and navigation support. It does not diagnose, prescribe medications, or replace qualified medical practitioners. In emergencies, call 112 or 108 immediately.'}
          </span>
        </div>
      </div>

      <!-- Emergency Alert Banner (Appears on urgent red-flag triggers) -->
      <div id="chat-emergency-alert-card" class="hidden p-4 bg-rose-700 text-white rounded-2xl border-2 border-rose-400 shadow-xl space-y-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 font-extrabold uppercase text-sm">
            <i data-lucide="siren" class="w-5 h-5 animate-bounce"></i>
            <span>Life-Threatening Emergency Detected</span>
          </div>
          <button id="btn-emergency-call-112" class="bg-white text-rose-900 font-black px-3 py-1 rounded-lg text-xs hover:bg-rose-100 transition shadow">
            Call 112 / 108
          </button>
        </div>
        <p class="text-xs text-rose-100" id="chat-emergency-desc">
          Critical red-flag symptoms reported. Do not wait for routine OPD. Seek immediate emergency trauma care.
        </p>
      </div>

      <!-- Suggested Question Prompt Chips -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span class="font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 flex-shrink-0 text-[11px]">
          <i data-lucide="sparkles" class="w-3.5 h-3.5 text-emerald-500"></i>
          ${isHindi ? 'सुझाए गए प्रश्न:' : 'Suggested Questions:'}
        </span>
        <button class="chat-prompt-chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition whitespace-nowrap text-[11px]">
          🏥 ${isHindi ? 'नज़दीकी सरकारी स्वास्थ्य केंद्र खोजें' : 'Find a government health centre in Lucknow'}
        </button>
        <button class="chat-prompt-chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition whitespace-nowrap text-[11px]">
          🛡️ ${isHindi ? 'आयुष्मान भारत (PM-JAY) योजना समझाएं' : 'Explain Ayushman Bharat (PM-JAY) scheme'}
        </button>
        <button class="chat-prompt-chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition whitespace-nowrap text-[11px]">
          📋 ${isHindi ? 'अस्पताल जाने से पहले क्या तैयार रखें?' : 'What to prepare before visiting hospital?'}
        </button>
        <button class="chat-prompt-chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition whitespace-nowrap text-[11px]">
          💊 ${isHindi ? 'सस्ती जेनेरिक दवाएं (जन औषधि) कहां मिलेंगी?' : 'Where to find Jan Aushadhi generic medicines?'}
        </button>
      </div>

      <!-- Chat Container -->
      <div class="glass-card flex flex-col h-[560px] rounded-3xl overflow-hidden border-slate-200 dark:border-slate-800 shadow-xl">
        <!-- Messages Area -->
        <div id="chat-messages-box" class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
          <!-- Bot Welcome Message -->
          <div class="flex items-start gap-3 max-w-3xl">
            <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow">
              SS
            </div>
            <div class="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 space-y-3 shadow-sm">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                <span class="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">
                  ${isHindi ? 'नमस्ते! मैं स्वास्थसेतु एआई सहायक हूँ।' : 'Namaste! I am your SwasthyaSetu AI Healthcare Assistant.'}
                </span>
                <span class="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
                  Grounded Public Navigator
                </span>
              </div>

              <p class="leading-relaxed">
                ${isHindi 
                  ? 'मैं आपको सरकारी स्वास्थ्य केंद्रों (PHC/CHC), आयुष्मान भारत योजना, जेनेरिक दवाओं, मातृ स्वास्थ्य (ANC) और स्वास्थ्य मार्गदर्शन में मदद कर सकता हूँ। आप हिंदी, अंग्रेजी या हिंग्लिश में प्रश्न पूछ सकते हैं।' 
                  : 'I can assist you with discovering government health centres (PHC/CHC), understanding Ayushman Bharat (PM-JAY), finding affordable Jan Aushadhi medicines, and clinical care navigation. Feel free to ask in English, Hindi, or Hinglish.'}
              </p>

              <div class="p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                💡 <em>Example: "Meri maa ko 2 din se bukhar hai, kahan dikhana chahiye?" or "Ayushman card kaise banwaye?"</em>
              </div>
            </div>
          </div>
        </div>

        <!-- Dynamic Typing / Querying Indicator -->
        <div id="chat-loading-indicator" class="hidden px-6 py-2 bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-500 flex items-center gap-2 border-t border-slate-200 dark:border-slate-800">
          <div class="w-3.5 h-3.5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span id="loading-status-text">Consulting safety rules and verified public sources...</span>
        </div>

        <!-- Chat Input Bar -->
        <div class="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <!-- Voice Simulator -->
          <button id="btn-chat-mic" title="Voice query simulation" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition">
            <i data-lucide="mic" class="w-5 h-5 text-emerald-600"></i>
          </button>

          <input 
            type="text" 
            id="chat-input-text" 
            class="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" 
            placeholder="${isHindi ? 'अपना प्रश्न या लक्षण हिंदी, अंग्रेजी या हिंग्लिश में लिखें...' : 'Type your healthcare inquiry in English, Hindi, or Hinglish...'}"
          />

          <button id="btn-chat-send" class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 shadow">
            <span>${isHindi ? 'भेजें' : 'Send'}</span>
            <i data-lucide="send" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

export function attachAIAssistantEvents() {
  const messagesBox = document.getElementById('chat-messages-box');
  const inputEl = document.getElementById('chat-input-text');
  const sendBtn = document.getElementById('btn-chat-send');
  const micBtn = document.getElementById('btn-chat-mic');
  const clearBtn = document.getElementById('btn-clear-chat-history');
  const loadingIndicator = document.getElementById('chat-loading-indicator');
  const loadingStatusText = document.getElementById('loading-status-text');
  const emergencyAlertCard = document.getElementById('chat-emergency-alert-card');

  // Language switch buttons
  ['en', 'hi', 'hinglish'].forEach(lang => {
    document.getElementById(`chat-btn-lang-${lang}`)?.addEventListener('click', () => {
      state.setLanguage(lang === 'hinglish' ? 'hi' : lang);
      document.querySelectorAll('.chat-lang-btn').forEach(b => {
        b.className = 'chat-lang-btn bg-white/10 hover:bg-white/20 text-white text-xs px-2.5 py-1 rounded-lg border border-white/20 transition';
      });
      const activeBtn = document.getElementById(`chat-btn-lang-${lang}`);
      if (activeBtn) activeBtn.className = 'chat-lang-btn bg-emerald-600 font-bold text-white text-xs px-2.5 py-1 rounded-lg border border-white/20 transition';
    });
  });

  // Render a User message
  const addUserMessage = (text) => {
    if (!messagesBox) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = 'flex items-start gap-3 max-w-2xl ml-auto flex-row-reverse';
    msgDiv.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow">
        You
      </div>
      <div class="bg-emerald-600 text-white p-3.5 rounded-2xl text-xs shadow-sm leading-relaxed">
        ${escapeHtml(text)}
      </div>
    `;
    messagesBox.appendChild(msgDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  };

  // Render Bot Structured Response
  const addBotStructuredMessage = (data) => {
    if (!messagesBox) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = 'flex items-start gap-3 max-w-3xl';

    const isEmergency = data.is_emergency || data.intent === 'EMERGENCY';
    const borderColor = isEmergency ? 'border-rose-400' : 'border-slate-200 dark:border-slate-700';

    let html = `
      <div class="w-8 h-8 rounded-full ${isEmergency ? 'bg-rose-600' : 'bg-emerald-600'} text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow">
        ${isEmergency ? 'SOS' : 'SS'}
      </div>
      <div class="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border ${borderColor} text-xs text-slate-800 dark:text-slate-200 space-y-3.5 shadow-sm">
    `;

    // 1. Simple Answer (Header Box)
    html += `
      <div class="${isEmergency ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900' : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'} p-3.5 rounded-xl border space-y-1">
        <span class="text-[10px] font-extrabold uppercase ${isEmergency ? 'text-rose-700 dark:text-rose-300' : 'text-emerald-700 dark:text-emerald-300'}">
          ${isEmergency ? '🚨 Immediate Safety Recommendation' : 'Direct Answer'}
        </span>
        <p class="text-xs sm:text-sm font-bold ${isEmergency ? 'text-rose-950 dark:text-rose-100' : 'text-slate-900 dark:text-white'} leading-snug">
          ${data.simple_answer}
        </p>
      </div>
    `;

    // 2. What This Means
    if (data.what_this_means) {
      html += `
        <div class="space-y-1">
          <p class="font-extrabold text-slate-900 dark:text-white text-[11px] uppercase tracking-wide">
            What This Means:
          </p>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
            ${data.what_this_means}
          </p>
        </div>
      `;
    }

    // 3. What To Do Next (Numbered Steps)
    if (data.what_to_do_next && data.what_to_do_next.length > 0) {
      html += `
        <div class="space-y-1.5">
          <p class="font-extrabold text-slate-900 dark:text-white text-[11px] uppercase tracking-wide">
            Recommended Action Sequence:
          </p>
          <ol class="list-decimal list-inside space-y-1 text-slate-700 dark:text-slate-300 leading-relaxed">
            ${data.what_to_do_next.map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>
      `;
    }

    // 4. What To Prepare (Documents / Info)
    if (data.what_to_prepare && data.what_to_prepare.length > 0) {
      html += `
        <div class="space-y-1.5">
          <p class="font-extrabold text-slate-900 dark:text-white text-[11px] uppercase tracking-wide">
            What to Carry / Prepare:
          </p>
          <div class="flex flex-wrap gap-1.5">
            ${data.what_to_prepare.map(doc => `
              <span class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600 font-medium">
                📄 ${doc}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 5. Where To Verify (Official Sources)
    if (data.sources && data.sources.length > 0) {
      html += `
        <div class="pt-2 border-t border-slate-100 dark:border-slate-700/80 space-y-1.5">
          <p class="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
            Verified Public Sources:
          </p>
          <div class="flex flex-wrap gap-2">
            ${data.sources.map(src => `
              <a href="${src.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                <span>${src.title || src.authority}</span>
                <i data-lucide="external-link" class="w-3 h-3"></i>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 6. Important Limitations
    if (data.important_limitations) {
      html += `
        <div class="p-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl text-[10px] text-amber-800 dark:text-amber-300">
          ⚠️ <strong>Limitation:</strong> ${data.important_limitations}
        </div>
      `;
    }

    // 7. Interactive Follow-Up Questions (Chips)
    if (data.follow_up_questions && data.follow_up_questions.length > 0) {
      html += `
        <div class="pt-1 space-y-1.5">
          <p class="text-[10px] font-bold text-slate-400 uppercase">Suggested Follow-ups:</p>
          <div class="flex flex-wrap gap-1.5">
            ${data.follow_up_questions.map(q => `
              <button class="chat-followup-chip text-[11px] bg-slate-100 dark:bg-slate-700 hover:bg-emerald-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-600 transition text-left">
                💬 ${q}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    html += `</div>`;
    msgDiv.innerHTML = html;
    messagesBox.appendChild(msgDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Attach click events on follow-up chips
    msgDiv.querySelectorAll('.chat-followup-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const qText = e.currentTarget.innerText.replace(/^[^\w\u0900-\u097F]+/, '').trim();
        if (inputEl) {
          inputEl.value = qText;
          handleSend();
        }
      });
    });

    if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
  };

  const escapeHtml = (str) => {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  // Main Send Action calling /api/chat
  const handleSend = async () => {
    if (!inputEl) return;
    const text = inputEl.value.trim();
    if (!text) return;

    addUserMessage(text);
    inputEl.value = '';

    // Show loading
    if (loadingIndicator) {
      loadingIndicator.classList.remove('hidden');
      if (loadingStatusText) loadingStatusText.innerText = 'Evaluating safety rules & consulting public sources...';
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sessionId: currentChatSessionId,
          language: state.currentLanguage,
          userLocation: 'Bakshi Ka Talab, Lucknow'
        })
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.message || `Server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      // Check if emergency alert should be pinned
      if (data.is_emergency && emergencyAlertCard) {
        emergencyAlertCard.classList.remove('hidden');
        const descEl = document.getElementById('chat-emergency-desc');
        if (descEl) descEl.innerText = data.simple_answer;
      }

      addBotStructuredMessage(data);
    } catch (err) {
      addBotStructuredMessage({
        simple_answer: `We encountered an issue processing your request (${err.message}).`,
        what_this_means: 'The server could not reach the healthcare database at this moment.',
        what_to_do_next: ['Check your internet connection and try typing the question again.', 'For immediate medical attention, call 112 or visit PHC Bargadi.'],
        important_limitations: 'System operational error. Emergency protocols remain active.'
      });
    } finally {
      if (loadingIndicator) loadingIndicator.classList.add('hidden');
    }
  };

  sendBtn?.addEventListener('click', handleSend);
  inputEl?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // Prompt chips
  document.querySelectorAll('.chat-prompt-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      if (inputEl) {
        inputEl.value = e.currentTarget.innerText.replace(/^[^\w\u0900-\u097F]+/, '').trim();
        handleSend();
      }
    });
  });

  // Voice simulator
  micBtn?.addEventListener('click', () => {
    if (inputEl) {
      inputEl.value = "Meri maa ko 2 din se bukhar hai, sarkari aspataal mein check-up kaise hoga?";
      handleSend();
    }
  });

  // Emergency 112 call shortcut
  document.getElementById('btn-emergency-call-112')?.addEventListener('click', () => {
    state.setActiveTab('emergency');
  });

  // Clear conversation history
  clearBtn?.addEventListener('click', async () => {
    if (confirm('Clear the current chat conversation?')) {
      try {
        await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: currentChatSessionId,
            clear: true
          })
        });
      } catch {
        // Continue clearing client
      }
      currentChatSessionId = `ss_session_${Math.random().toString(36).substring(2, 9)}`;
      if (messagesBox) {
        messagesBox.innerHTML = `
          <div class="p-3 bg-slate-100 dark:bg-slate-800 text-center rounded-xl text-xs text-slate-500">
            🧹 Conversation cleared. A new isolated session has started.
          </div>
        `;
      }
      if (emergencyAlertCard) emergencyAlertCard.classList.add('hidden');
    }
  });
}
