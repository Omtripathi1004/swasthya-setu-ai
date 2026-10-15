/**
 * SwasthyaSetu AI - Safety-First Smart Triage & Referral Decision Support
 * 
 * Safety-First Design:
 * - Deterministic emergency red-flag checks precede any heuristic or AI output.
 * - Under no circumstances can AI downgrade a detected emergency red flag.
 * - This tool provides clinical decision support and guidance; it does NOT diagnose or prescribe.
 */

import { state } from '../state.js';
import { EMERGENCY_RED_FLAGS, evaluateDeterministicTriage } from '../triageRules.js';

export function renderSmartTriageView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header & Safety Disclaimer -->
      <div class="glass-card p-6 bg-gradient-to-r from-teal-950 via-emerald-900 to-slate-900 text-white rounded-3xl">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-3">
            <div class="p-3 bg-white/10 rounded-2xl">
              <i data-lucide="shield-alert" class="w-8 h-8 text-emerald-300"></i>
            </div>
            <div>
              <h1 class="text-xl sm:text-2xl font-extrabold">
                ${isHindi ? 'सुरक्षा-प्रथम क्लिनिकल ट्रियाज एवं रेफरल गाइड' : 'Safety-First Clinical Triage & Care Navigator'}
              </h1>
              <p class="text-xs sm:text-sm text-teal-100">
                ${isHindi 
                  ? 'आपातकालीन रेड-फ्लैग जांच, संरचित क्लिनिकल इनपुट एवं नजदीकी अधिकृत स्वास्थ्य केंद्र मार्गदर्शन।' 
                  : 'Deterministic emergency safety checks, structured clinical triage & verified healthcare navigation.'}
              </p>
            </div>
          </div>

          <span class="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <i data-lucide="siren" class="w-3.5 h-3.5"></i>
            108 Emergency Rule Guarded
          </span>
        </div>

        <!-- Mandatory Non-Diagnostic Clinical Notice -->
        <div class="mt-4 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-xs text-emerald-100 flex items-start gap-2">
          <i data-lucide="info" class="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-300"></i>
          <span>
            <strong>${isHindi ? 'क्लिनिकल सूचना' : 'Clinical Decision Support Notice'}:</strong> 
            ${isHindi 
              ? 'यह प्रणाली केवल निर्णय-सहायता और मार्गदर्शन प्रदान करती है। यह पंजीकृत चिकित्सक का विकल्प नहीं है और दवाएं नहीं लिखती है।' 
              : 'SwasthyaSetu AI provides informational decision support and care navigation. It does not provide medical diagnosis, prescribe treatments, or replace qualified medical practitioners.'}
          </span>
        </div>
      </div>

      <!-- Instant Emergency Alert Banner (Shown dynamically or if triggered) -->
      <div id="triage-emergency-banner" class="hidden p-5 bg-rose-700 text-white rounded-2xl border-2 border-rose-400 shadow-xl space-y-3 animate-pulse">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-white text-rose-700 flex items-center justify-center font-extrabold flex-shrink-0">
              <i data-lucide="siren" class="w-7 h-7 animate-bounce"></i>
            </div>
            <div>
              <h2 class="text-base sm:text-lg font-extrabold uppercase tracking-wide">
                ${isHindi ? '🚨 तत्काल आपातकाल चेतावनी (108 SOS)' : '🚨 CRITICAL EMERGENCY RED FLAG DETECTED'}
              </h2>
              <p class="text-xs text-rose-100 mt-0.5" id="emergency-banner-desc">
                Life-threatening red flag reported. Immediate transfer to District Hospital Trauma Unit or CHC Emergency required.
              </p>
            </div>
          </div>
          <button id="btn-banner-call-108" class="bg-white hover:bg-rose-100 text-rose-900 font-extrabold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-lg flex items-center gap-2">
            <i data-lucide="phone-call" class="w-4 h-4"></i> Call 108 Emergency
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Triage Input Form (Left 7 Cols) -->
        <div class="lg:col-span-7 glass-card p-6 space-y-5">
          <!-- Step 1: Red Flag Checks (Mandatory Pre-Check) -->
          <div class="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl space-y-2">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-rose-800 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <i data-lucide="alert-octagon" class="w-4 h-4"></i>
                ${isHindi ? 'चरण 1: आपातकालीन रेड-फ्लैग जांच (Deterministic)' : 'Step 1: Immediate Emergency Red-Flag Screen'}
              </h3>
              <span class="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">Immediate Escalation</span>
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-300">
              ${isHindi 
                ? 'यदि इनमें से कोई भी गंभीर लक्षण है, तो तुरंत 108 एम्बुलेंस पर संपर्क करें:' 
                : 'Check any life-threatening symptoms below for immediate emergency protocol:'}
            </p>

            <div class="space-y-1.5 pt-1 text-xs">
              ${EMERGENCY_RED_FLAGS.map(flag => `
                <label class="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-rose-200 dark:border-rose-900/60 cursor-pointer hover:bg-rose-100/50 dark:hover:bg-rose-950/80 transition">
                  <input type="checkbox" name="redFlagCheckbox" value="${flag.id}" class="accent-rose-600 w-4 h-4 rounded">
                  <span class="font-medium text-slate-800 dark:text-slate-200 text-[11px]">
                    ${isHindi ? flag.labelHindi : flag.label}
                  </span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Step 2: Structured Intake Form -->
          <div class="space-y-4">
            <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <i data-lucide="clipboard-list" class="w-4 h-4 text-emerald-600"></i>
              ${isHindi ? 'चरण 2: सामान्य विवरण एवं क्लिनिकल वाइटल्स' : 'Step 2: Structured Clinical Vitals & Symptom Description'}
            </h3>

            <form id="form-triage-intake" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Age (आयु)</label>
                  <input type="number" id="triage-age" value="28" min="0" max="110" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                </div>

                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Gender (लिंग)</label>
                  <select id="triage-gender" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none">
                    <option value="Female">Female (महिला)</option>
                    <option value="Male">Male (पुरुष)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Pregnancy Status</label>
                  <select id="triage-pregnancy" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none">
                    <option value="No">Not Pregnant</option>
                    <option value="Trimester 1">Pregnant - 1st Trimester</option>
                    <option value="Trimester 2 (Week 24)">Pregnant - 2nd Trimester</option>
                    <option value="Trimester 3 (Week 32)">Pregnant - 3rd Trimester</option>
                  </select>
                </div>
              </div>

              <!-- Symptoms Input -->
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Symptoms & Duration</label>
                <textarea id="triage-symptoms" rows="3" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Mild continuous fever for 2 days, body aches, slight headache, feeling fatigue..."></textarea>
              </div>

              <!-- Vitals Intake -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>
                  <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">Temp (°F)</label>
                  <input type="text" id="triage-temp" value="99.8" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-mono text-center">
                </div>

                <div>
                  <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">BP (mmHg)</label>
                  <input type="text" id="triage-bp" value="122/80" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-mono text-center">
                </div>

                <div>
                  <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">SpO2 (%)</label>
                  <input type="text" id="triage-spo2" value="98" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-mono text-center">
                </div>

                <div>
                  <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">Duration (Days)</label>
                  <input type="number" id="triage-duration" value="2" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-mono text-center">
                </div>
              </div>

              <!-- Conditions -->
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Pre-existing Health Conditions</label>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <label class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg cursor-pointer">
                    <input type="checkbox" id="cond-hypertension" class="accent-emerald-600">
                    <span>Hypertension</span>
                  </label>
                  <label class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg cursor-pointer">
                    <input type="checkbox" id="cond-diabetes" class="accent-emerald-600">
                    <span>Diabetes</span>
                  </label>
                  <label class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg cursor-pointer">
                    <input type="checkbox" id="cond-asthma" class="accent-emerald-600">
                    <span>Asthma / COPD</span>
                  </label>
                  <label class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg cursor-pointer">
                    <input type="checkbox" id="cond-anemia" class="accent-emerald-600">
                    <span>Anemia</span>
                  </label>
                  <label class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg cursor-pointer">
                    <input type="checkbox" id="cond-cardiac" class="accent-emerald-600">
                    <span>Cardiac History</span>
                  </label>
                </div>
              </div>

              <button type="button" id="btn-calculate-triage" class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm">
                <i data-lucide="shield-check" class="w-4 h-4"></i>
                ${isHindi ? 'सुरक्षित ट्रियाज मूल्यांकन चलाएं' : 'Run Safety-First Triage Assessment'}
              </button>
            </form>
          </div>
        </div>

        <!-- Triage Output Result Card (Right 5 Cols) -->
        <div class="lg:col-span-5 space-y-4">
          <div id="triage-output-container" class="glass-card p-6 border-slate-200 dark:border-slate-800 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Triage Assessment</span>
              <span id="triage-risk-badge" class="badge-emerald text-xs font-bold uppercase">ROUTINE CARE</span>
            </div>

            <!-- Risk Score Display -->
            <div id="triage-score-card" class="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
              <div>
                <p class="text-[10px] text-slate-400 font-bold uppercase">Triage Stratification Score</p>
                <p id="triage-risk-score-display" class="text-4xl font-extrabold text-emerald-400">
                  25 <span class="text-xs text-slate-400 font-normal">/ 100</span>
                </p>
                <p id="triage-urgency-display" class="text-xs font-bold text-emerald-300 mt-0.5">
                  Routine: Local PHC Care or Home Monitoring
                </p>
              </div>
              <div id="triage-icon-wrap" class="w-16 h-16 rounded-full border-4 border-emerald-400 flex items-center justify-center bg-emerald-950/60">
                <i data-lucide="check-circle" class="w-8 h-8 text-emerald-400"></i>
              </div>
            </div>

            <!-- Recommended Facility Tier -->
            <div class="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 p-3.5 rounded-xl space-y-1">
              <p class="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-300">Recommended Healthcare Tier</p>
              <p id="triage-facility-display" class="text-sm font-extrabold text-emerald-950 dark:text-emerald-100">
                PHC Bargadi (Primary Health Centre)
              </p>
              <p id="triage-action-text" class="text-[11px] text-emerald-700 dark:text-emerald-400">
                Routine OPD consultation or supervised home hydration.
              </p>
            </div>

            <!-- Verified Resource Lookup Button (TinyFish Powered) -->
            <div class="p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 rounded-xl space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-extrabold text-teal-900 dark:text-teal-200 flex items-center gap-1">
                  <i data-lucide="search" class="w-3.5 h-3.5 text-teal-600"></i>
                  Find Healthcare Facilities via TinyFish
                </span>
                <span class="text-[9px] bg-teal-600 text-white px-1.5 py-0.2 rounded font-bold">Public Web</span>
              </div>
              <p class="text-[10px] text-teal-800 dark:text-teal-300">
                Discover verified public healthcare resources from official directories.
              </p>
              <button id="btn-triage-search-resources" class="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow">
                <i data-lucide="compass" class="w-3.5 h-3.5"></i>
                Search Nearby Facilities for this Tier
              </button>
            </div>

            <!-- Escalation Action Buttons -->
            <div class="pt-1 space-y-2">
              <button id="btn-triage-book-telemed" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2">
                <i data-lucide="video" class="w-4 h-4"></i>
                Request Teleconsultation with Doctor
              </button>

              <button id="btn-triage-trigger-sos" class="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-2">
                <i data-lucide="siren" class="w-4 h-4"></i>
                Emergency 108 Ambulance Protocol
              </button>
            </div>

            <!-- Mandatory Legal & Non-Diagnostic Disclaimer -->
            <div class="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-[10px] text-amber-800 dark:text-amber-300 leading-tight">
              ⚠️ <strong>Clinical Notice:</strong> This platform does not provide diagnosis or medication prescriptions. Deterministic red flags automatically escalate to emergency care.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachSmartTriageEvents() {
  const form = document.getElementById('form-triage-intake');
  const calcBtn = document.getElementById('btn-calculate-triage');
  const emergencyBanner = document.getElementById('triage-emergency-banner');
  const bannerDesc = document.getElementById('emergency-banner-desc');
  const bannerCallBtn = document.getElementById('btn-banner-call-108');
  const redFlagCheckboxes = document.querySelectorAll('input[name="redFlagCheckbox"]');

  // Instant trigger if user checks ANY red-flag checkbox
  const checkInstantEmergency = () => {
    const checked = Array.from(redFlagCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    if (checked.length > 0) {
      const evaluation = evaluateDeterministicTriage({ reportedFlags: checked });
      showTriageResult(evaluation);
    }
  };

  redFlagCheckboxes.forEach(cb => {
    cb.addEventListener('change', checkInstantEmergency);
  });

  const runEvaluation = () => {
    const checkedFlags = Array.from(redFlagCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    const symptomsText = document.getElementById('triage-symptoms')?.value || '';
    const temp = parseFloat(document.getElementById('triage-temp')?.value || '98.6');
    const bpText = document.getElementById('triage-bp')?.value || '120/80';
    const [bpSys, bpDia] = bpText.split('/').map(v => parseInt(v.trim()) || 80);
    const spo2 = parseInt(document.getElementById('triage-spo2')?.value || '98');
    const pregnancyVal = document.getElementById('triage-pregnancy')?.value || 'No';
    const isPregnant = pregnancyVal !== 'No';
    const hasAnemia = document.getElementById('cond-anemia')?.checked;
    const hasCardiac = document.getElementById('cond-cardiac')?.checked;

    const evaluation = evaluateDeterministicTriage({
      symptomsText,
      reportedFlags: checkedFlags,
      vitals: {
        temp,
        bpSys,
        bpDia,
        spo2,
        isPregnant,
        hasAnemia,
        hasCardiacHistory: hasCardiac
      }
    });

    showTriageResult(evaluation);
  };

  const showTriageResult = (evaluation) => {
    const badge = document.getElementById('triage-risk-badge');
    const scoreDisplay = document.getElementById('triage-risk-score-display');
    const urgency = document.getElementById('triage-urgency-display');
    const facility = document.getElementById('triage-facility-display');
    const actionText = document.getElementById('triage-action-text');
    const scoreCard = document.getElementById('triage-score-card');
    const iconWrap = document.getElementById('triage-icon-wrap');

    if (evaluation.isEmergency) {
      if (emergencyBanner) {
        emergencyBanner.classList.remove('hidden');
        if (bannerDesc) bannerDesc.innerText = evaluation.immediateAction;
      }
      if (badge) {
        badge.className = 'badge-rose text-xs font-bold uppercase';
        badge.innerText = '🚨 EMERGENCY RED FLAG';
      }
      if (scoreDisplay) {
        scoreDisplay.innerHTML = `<span class="text-rose-400">${evaluation.riskScore}</span> <span class="text-xs text-slate-400 font-normal">/ 100</span>`;
      }
      if (urgency) {
        urgency.className = 'text-xs font-bold text-rose-300 mt-0.5';
        urgency.innerText = 'CRITICAL: Immediate 108 Emergency Transfer';
      }
      if (facility) facility.innerText = evaluation.recommendedFacilityTier;
      if (actionText) actionText.innerText = evaluation.immediateAction;

      if (scoreCard) scoreCard.className = 'bg-rose-950 border border-rose-600 text-white p-4 rounded-2xl flex items-center justify-between';
      if (iconWrap) {
        iconWrap.className = 'w-16 h-16 rounded-full border-4 border-rose-500 flex items-center justify-center bg-rose-900';
        iconWrap.innerHTML = '<i data-lucide="siren" class="w-8 h-8 text-rose-300"></i>';
      }
    } else if (evaluation.urgencyLevel === 'URGENT') {
      if (emergencyBanner) emergencyBanner.classList.add('hidden');
      if (badge) {
        badge.className = 'badge-amber text-xs font-bold uppercase';
        badge.innerText = 'URGENT (WITHIN 24H)';
      }
      if (scoreDisplay) {
        scoreDisplay.innerHTML = `<span class="text-amber-400">${evaluation.riskScore}</span> <span class="text-xs text-slate-400 font-normal">/ 100</span>`;
      }
      if (urgency) {
        urgency.className = 'text-xs font-bold text-amber-300 mt-0.5';
        urgency.innerText = 'Urgent: CHC Bakshi Ka Talab OPD Consultation';
      }
      if (facility) facility.innerText = evaluation.recommendedFacilityTier;
      if (actionText) actionText.innerText = evaluation.immediateAction;

      if (scoreCard) scoreCard.className = 'bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between';
      if (iconWrap) {
        iconWrap.className = 'w-16 h-16 rounded-full border-4 border-amber-400 flex items-center justify-center bg-amber-950/60';
        iconWrap.innerHTML = '<i data-lucide="alert-triangle" class="w-8 h-8 text-amber-400"></i>';
      }
    } else {
      if (emergencyBanner) emergencyBanner.classList.add('hidden');
      if (badge) {
        badge.className = 'badge-emerald text-xs font-bold uppercase';
        badge.innerText = 'ROUTINE CARE';
      }
      if (scoreDisplay) {
        scoreDisplay.innerHTML = `<span class="text-emerald-400">${evaluation.riskScore}</span> <span class="text-xs text-slate-400 font-normal">/ 100</span>`;
      }
      if (urgency) {
        urgency.className = 'text-xs font-bold text-emerald-300 mt-0.5';
        urgency.innerText = 'Routine: Local PHC Care or Supervised Home Care';
      }
      if (facility) facility.innerText = evaluation.recommendedFacilityTier;
      if (actionText) actionText.innerText = evaluation.immediateAction;

      if (scoreCard) scoreCard.className = 'bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between';
      if (iconWrap) {
        iconWrap.className = 'w-16 h-16 rounded-full border-4 border-emerald-400 flex items-center justify-center bg-emerald-950/60';
        iconWrap.innerHTML = '<i data-lucide="check-circle" class="w-8 h-8 text-emerald-400"></i>';
      }
    }

    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  };

  calcBtn?.addEventListener('click', runEvaluation);

  bannerCallBtn?.addEventListener('click', () => {
    state.setActiveTab('emergency');
  });

  document.getElementById('btn-triage-book-telemed')?.addEventListener('click', () => {
    state.setActiveTab('telemedicine');
  });

  document.getElementById('btn-triage-trigger-sos')?.addEventListener('click', () => {
    state.setActiveTab('emergency');
  });

  document.getElementById('btn-triage-search-resources')?.addEventListener('click', () => {
    state.setActiveTab('map');
  });
}
