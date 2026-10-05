/**
 * SwasthyaSetu AI - AI Health Assistant Chatbot Component (Requirement #6)
 */

import { state } from '../state.js';

export function renderAIAssistantView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      <!-- Title & Disclaimer Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <i data-lucide="bot" class="w-7 h-7"></i>
            </div>
            <div>
              <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
                ${isHindi ? 'एआई स्वास्थ्य सहायक (SwasthyaSetu Assistant)' : 'SwasthyaSetu AI Health Assistant'}
                <span class="bg-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Multilingual
                </span>
              </h1>
              <p class="text-xs text-emerald-100/90">
                ${isHindi 
                  ? 'अंग्रेजी, हिंदी और हिंग्लिश में स्वास्थ्य सलाह, लक्षण मूल्यांकन और नजदीकी केंद्र सुझाव' 
                  : 'Supports English, Hindi & Hinglish symptom understanding, risk triage & emergency guidance.'}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button id="chat-btn-lang-en" class="bg-white/10 hover:bg-white/20 text-white text-xs px-2.5 py-1 rounded-lg border border-white/20">English</button>
            <button id="chat-btn-lang-hi" class="bg-emerald-600 text-white font-bold text-xs px-2.5 py-1 rounded-lg">हिन्दी</button>
            <button id="chat-btn-lang-hinglish" class="bg-white/10 hover:bg-white/20 text-white text-xs px-2.5 py-1 rounded-lg border border-white/20">Hinglish</button>
          </div>
        </div>

        <!-- Mandatory Disclaimer Bar -->
        <div class="mt-4 p-2.5 bg-amber-500/20 border border-amber-400/40 rounded-xl text-xs text-amber-200 flex items-start gap-2">
          <i data-lucide="info" class="w-4 h-4 flex-shrink-0 mt-0.5"></i>
          <span>
            "This AI assistant provides informational guidance and does not replace a qualified healthcare professional."
          </span>
        </div>
      </div>

      <!-- Chat Container -->
      <div class="glass-card flex flex-col h-[520px] rounded-3xl overflow-hidden border-slate-200 dark:border-slate-800">
        <!-- Messages Area -->
        <div id="chat-messages-box" class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
          <!-- Bot Initial Message -->
          <div class="flex items-start gap-3 max-w-2xl">
            <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
              AI
            </div>
            <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 space-y-2 shadow-sm">
              <p class="font-bold text-emerald-700 dark:text-emerald-400">
                ${isHindi ? 'नमस्ते! मैं आपका SwasthyaSetu AI सहायक हूँ।' : 'Namaste! I am your SwasthyaSetu AI Health Assistant.'}
              </p>
              <p>
                ${isHindi 
                  ? 'कृपया मुझे अपने लक्षण बताएं (उदा. "मुझे 2 दिन से बुखार और सिरदर्द है" या "पेट में दर्द और उल्टी")।' 
                  : 'Please describe your symptoms in English, Hindi, or Hinglish (e.g. "Mujhe 2 din se bukhar aur headache hai" or "Pregnant mother having high blood pressure").'}
              </p>
              <div class="flex flex-wrap gap-1.5 pt-1">
                <button class="chat-chip text-[11px] bg-slate-100 dark:bg-slate-700 hover:bg-emerald-100 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-600 transition">
                  🤒 Severe Fever & Body Pain
                </button>
                <button class="chat-chip text-[11px] bg-slate-100 dark:bg-slate-700 hover:bg-emerald-100 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-600 transition">
                  🤰 Pregnancy ANC Checkup Query
                </button>
                <button class="chat-chip text-[11px] bg-slate-100 dark:bg-slate-700 hover:bg-emerald-100 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-600 transition">
                  💊 Jan Aushadhi Paracetamol Stock
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Input Bar -->
        <div class="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <!-- Voice Simulator Button -->
          <button id="btn-chat-mic" title="Simulate Voice Input (Hindi/English)" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition">
            <i data-lucide="mic" class="w-5 h-5 text-emerald-600"></i>
          </button>

          <input type="text" id="chat-input-text" class="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Type your symptoms or health question in English/Hindi/Hinglish...">

          <button id="btn-chat-send" class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 shadow">
            <span>Send</span>
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

  const addMessage = (sender, text, riskLevel = null) => {
    if (!messagesBox) return;

    const isBot = sender === 'AI';
    const msgDiv = document.createElement('div');
    msgDiv.className = `flex items-start gap-3 max-w-2xl ${isBot ? '' : 'ml-auto flex-row-reverse'}`;

    let riskBadge = '';
    if (riskLevel) {
      if (riskLevel === 'EMERGENCY') riskBadge = `<span class="badge-rose text-[10px] uppercase font-bold">Risk Level: EMERGENCY</span>`;
      else if (riskLevel === 'HIGH') riskBadge = `<span class="badge-rose text-[10px] uppercase font-bold">Risk Level: HIGH</span>`;
      else if (riskLevel === 'MODERATE') riskBadge = `<span class="badge-amber text-[10px] uppercase font-bold">Risk Level: MODERATE</span>`;
      else riskBadge = `<span class="badge-emerald text-[10px] uppercase font-bold">Risk Level: LOW</span>`;
    }

    msgDiv.innerHTML = `
      <div class="w-8 h-8 rounded-full ${isBot ? 'bg-emerald-600' : 'bg-blue-600'} text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
        ${isBot ? 'AI' : 'You'}
      </div>
      <div class="${isBot ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700' : 'bg-emerald-600 text-white'} p-4 rounded-2xl border text-xs space-y-2 shadow-sm">
        ${riskBadge}
        <p class="${isBot ? 'text-slate-800 dark:text-slate-200' : 'text-white'} leading-relaxed">${text}</p>
        ${isBot ? `
          <div class="pt-1 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Recommended facility: PHC Bargadi / CHC BKT</span>
            <button class="text-emerald-600 dark:text-emerald-400 font-bold hover:underline" onclick="window.appState.setActiveTab('map')">View Map →</button>
          </div>
        ` : ''}
      </div>
    `;

    messagesBox.appendChild(msgDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  };

  const handleSend = () => {
    if (!inputEl) return;
    const text = inputEl.value.trim();
    if (!text) return;

    addMessage('User', text);
    inputEl.value = '';

    // Bot Response Logic
    setTimeout(() => {
      const lower = text.toLowerCase();
      if (lower.includes('fever') || lower.includes('bukhar') || lower.includes('headache')) {
        addMessage('AI', `Based on your reported fever and body pain, this matches symptoms of a viral infection or vector-borne illness (Dengue/Malaria).<br><br>
        <strong>Recommended Action:</strong><br>
        1. Keep hydrated with ORS solution.<br>
        2. Visit PHC Bargadi (1.8 km) or CHC BKT for a blood antigen check.<br>
        3. <strong>Warning Signs:</strong> If fever exceeds 103°F or if severe vomiting occurs, visit the emergency ward.`, 'MODERATE');
      } else if (lower.includes('pregnant') || lower.includes('anc') || lower.includes('garbhavastha')) {
        addMessage('AI', `For maternal health inquiries in Lucknow district:<br>
        1. Ensure your 4 mandatory ANC visits are tracked in the MCP card.<br>
        2. Free Iron Folic Acid (IFA) tablets are available at PHC Bargadi.<br>
        3. If you experience swelling in feet or high BP (>140/90), contact ASHA worker Smt. Anita Devi immediately.`, 'LOW');
      } else {
        addMessage('AI', `Thank you for sharing your symptoms. Based on our clinical guidance system:<br>
        - Preliminary assessment suggests a routine consultation.<br>
        - Please visit your nearest PHC Bargadi or schedule a telemedicine video consult.<br>
        - <em>Remember: This guidance is informational and does not replace a doctor.</em>`, 'LOW');
      }
    }, 600);
  };

  sendBtn?.addEventListener('click', handleSend);
  inputEl?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  micBtn?.addEventListener('click', () => {
    if (inputEl) {
      inputEl.value = "Mujhe 2 din se tez bukhar aur sar dard hai, kya karna chahiye?";
      handleSend();
    }
  });

  document.querySelectorAll('.chat-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      if (inputEl) {
        inputEl.value = e.target.innerText.replace(/^[^\w]+/, '').trim();
        handleSend();
      }
    });
  });
}
