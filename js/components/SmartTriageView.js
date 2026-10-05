/**
 * SwasthyaSetu AI - Smart Triage System Component (Requirement #7)
 */

import { state } from '../state.js';
import { HEALTHCARE_FACILITIES } from '../data/mockData.js';

export function renderSmartTriageView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-teal-900 to-emerald-900 text-white rounded-3xl">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-white/10 rounded-2xl">
            <i data-lucide="activity" class="w-8 h-8 text-teal-300"></i>
          </div>
          <div>
            <h1 class="text-xl sm:text-2xl font-extrabold">
              ${isHindi ? 'एआई स्मार्ट ट्रियाज एवं रिस्क असेसमेंट' : 'AI Smart Triage & Referral Calculator'}
            </h1>
            <p class="text-xs sm:text-sm text-teal-100">
              ${isHindi 
                ? 'मरीज़ के लक्षण दर्ज करें और AI द्वारा सटीक जोखिम स्तर, अनुशंसित स्वास्थ्य केंद्र व रेड-फ्लैग चेतावनी प्राप्त करें।' 
                : 'Input clinical vitals & symptoms to compute instantaneous risk score, recommended facility tier & referral pathway.'}
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Triage Input Form (Left 7 Cols) -->
        <div class="lg:col-span-7 glass-card p-6 space-y-4">
          <h2 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <i data-lucide="clipboard-list" class="w-4 h-4 text-emerald-600"></i>
            ${isHindi ? '1. मरीज विवरण और लक्षण प्रविष्टि' : '1. Clinical Inputs & Symptom Intake'}
          </h2>

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
                  <option value="Trimester 2 (Week 24)">Pregnant - 2nd Trimester</option>
                  <option value="Trimester 3 (Week 32)">Pregnant - 3rd Trimester</option>
                  <option value="Trimester 1">Pregnant - 1st Trimester</option>
                  <option value="No">Not Pregnant</option>
                </select>
              </div>
            </div>

            <!-- Symptoms Input -->
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Symptoms & Description</label>
              <textarea id="triage-symptoms" rows="3" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. High fever for 3 days, severe headache, mild breathlessness, abdominal cramps..."></textarea>
            </div>

            <!-- Vitals Intake -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <div>
                <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">Temp (°F)</label>
                <input type="text" id="triage-temp" value="101.4" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-mono text-center">
              </div>

              <div>
                <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">BP (mmHg)</label>
                <input type="text" id="triage-bp" value="138/88" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-mono text-center">
              </div>

              <div>
                <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">SpO2 (%)</label>
                <input type="text" id="triage-spo2" value="96" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-mono text-center">
              </div>

              <div>
                <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">Duration (Days)</label>
                <input type="number" id="triage-duration" value="3" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-mono text-center">
              </div>
            </div>

            <!-- Existing Conditions Checkbox grid -->
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
                  <input type="checkbox" id="cond-anemia" checked class="accent-emerald-600">
                  <span>Anemia (Hb &lt; 10g)</span>
                </label>
                <label class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg cursor-pointer">
                  <input type="checkbox" id="cond-cardiac" class="accent-emerald-600">
                  <span>Cardiac History</span>
                </label>
              </div>
            </div>

            <button type="button" id="btn-calculate-triage" class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm">
              <i data-lucide="cpu" class="w-4 h-4"></i>
              ${isHindi ? 'एआई रिस्क एवं ट्रियाज गणना करें' : 'Compute AI Risk Score & Referral'}
            </button>
          </form>
        </div>

        <!-- Triage Output Result Card (Right 5 Cols) -->
        <div class="lg:col-span-5 space-y-4">
          <div id="triage-output-container" class="glass-card p-6 border-emerald-500/40 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">2. AI Triage Diagnosis</span>
              <span id="triage-risk-badge" class="badge-amber text-xs font-bold uppercase">MODERATE RISK</span>
            </div>

            <!-- Risk Score Gauge Box -->
            <div class="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
              <div>
                <p class="text-[10px] text-slate-400 font-bold uppercase">Calculated AI Risk Score</p>
                <p id="triage-risk-score-display" class="text-4xl font-extrabold text-amber-400">68 <span class="text-xs text-slate-400 font-normal">/ 100</span></p>
                <p id="triage-urgency-display" class="text-xs font-bold text-amber-300 mt-0.5">Urgency: Urgent OPD / CHC Referral</p>
              </div>
              <div class="w-16 h-16 rounded-full border-4 border-amber-400 flex items-center justify-center bg-amber-950/60">
                <i data-lucide="alert-triangle" class="w-8 h-8 text-amber-400"></i>
              </div>
            </div>

            <!-- Recommended Facility -->
            <div class="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 p-3.5 rounded-xl space-y-1">
              <p class="text-[11px] font-bold uppercase text-emerald-800 dark:text-emerald-300">Recommended Facility Tier</p>
              <p id="triage-facility-display" class="text-sm font-extrabold text-emerald-950 dark:text-emerald-100">
                CHC Bakshi Ka Talab (Community Health Centre)
              </p>
              <p class="text-[11px] text-emerald-700 dark:text-emerald-400">
                Distance: 4.2 km (approx 12 mins via auto/ambulance). Specialist Gynecologist on duty.
              </p>
            </div>

            <!-- Red Flag Warning Signs -->
            <div class="space-y-1 text-xs">
              <p class="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i>
                Warning Signs to Monitor (Red Flags)
              </p>
              <ul id="triage-warning-signs" class="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-0.5 text-[11px]">
                <li>Fever exceeding 102°F or chills</li>
                <li>Sudden severe headache or visual blurriness</li>
                <li>Reduced fetal movement (for 2nd/3rd trimester)</li>
                <li>SpO2 dropping below 94%</li>
              </ul>
            </div>

            <!-- Next Action Buttons -->
            <div class="pt-2 space-y-2">
              <button id="btn-triage-book-telemed" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2">
                <i data-lucide="video" class="w-4 h-4"></i>
                Request Teleconsultation with Doctor
              </button>

              <button id="btn-triage-trigger-sos" class="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-2">
                <i data-lucide="siren" class="w-4 h-4"></i>
                Dispatch 108 Emergency Ambulance
              </button>
            </div>

            <!-- Mandatory Disclaimer -->
            <div class="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-[10px] text-amber-800 dark:text-amber-300 leading-tight">
              ⚠️ <strong>AI Clinical Notice:</strong> This AI smart triage provides preliminary risk stratification for guidance and does not replace registered doctors or official clinical diagnosis.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachSmartTriageEvents() {
  document.getElementById('btn-calculate-triage')?.addEventListener('click', () => {
    const age = parseInt(document.getElementById('triage-age')?.value || '28');
    const temp = parseFloat(document.getElementById('triage-temp')?.value || '98.6');
    const spo2 = parseInt(document.getElementById('triage-spo2')?.value || '98');
    const anemia = document.getElementById('cond-anemia')?.checked;
    
    let score = 35;
    if (temp > 100) score += 20;
    if (spo2 < 95) score += 25;
    if (anemia) score += 15;

    const scoreDisplay = document.getElementById('triage-risk-score-display');
    const badge = document.getElementById('triage-risk-badge');
    const urgency = document.getElementById('triage-urgency-display');
    const facility = document.getElementById('triage-facility-display');

    if (scoreDisplay) scoreDisplay.innerHTML = `${score} <span class="text-xs text-slate-400 font-normal">/ 100</span>`;
    
    if (score >= 75) {
      if (badge) { badge.className = 'badge-rose text-xs font-bold uppercase'; badge.innerText = 'HIGH / EMERGENCY RISK'; }
      if (urgency) urgency.innerText = 'Urgent: Immediate CHC or District Hospital Emergency Transfer';
      if (facility) facility.innerText = 'District Hospital Sitapur Road (Emergency Trauma Kiosk)';
    } else if (score >= 50) {
      if (badge) { badge.className = 'badge-amber text-xs font-bold uppercase'; badge.innerText = 'MODERATE RISK'; }
      if (urgency) urgency.innerText = 'Urgent: CHC Bakshi Ka Talab OPD Visit within 24h';
      if (facility) facility.innerText = 'CHC Bakshi Ka Talab (Community Health Centre)';
    } else {
      if (badge) { badge.className = 'badge-emerald text-xs font-bold uppercase'; badge.innerText = 'LOW RISK'; }
      if (urgency) urgency.innerText = 'Routine: Local PHC consultation or home care';
      if (facility) facility.innerText = 'PHC Bargadi (Primary Health Centre - 1.8 km)';
    }
  });

  document.getElementById('btn-triage-book-telemed')?.addEventListener('click', () => {
    state.setActiveTab('telemedicine');
  });

  document.getElementById('btn-triage-trigger-sos')?.addEventListener('click', () => {
    state.setActiveTab('emergency');
  });
}
