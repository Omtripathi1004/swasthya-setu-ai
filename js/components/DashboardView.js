/**
 * SwasthyaSetu AI - Main Dashboard View
 */

import { state } from '../state.js';
import { REGIONAL_HIERARCHY } from '../data/mockData.js';

export function renderDashboardView() {
  const m = state.metrics;
  const isHindi = state.currentLanguage === 'hi';
  
  // Find current village name
  const upState = REGIONAL_HIERARCHY.states[0];
  const lkoDistrict = upState.districts[0];
  const currentBlockObj = lkoDistrict.blocks.find(b => b.id === state.selectedBlock) || lkoDistrict.blocks[0];
  const currentVillageObj = currentBlockObj.villages.find(v => v.id === state.selectedVillage) || currentBlockObj.villages[0];

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Dashboard Hero Welcome & Geographic Indicator Banner -->
      <div class="hero-gradient rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <i data-lucide="cross" class="w-80 h-80 stroke-[1]"></i>
        </div>

        <div class="relative z-10 max-w-3xl space-y-3">
          <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-100 border border-white/20">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ${isHindi ? 'लाइव सरकारी डेटा और एआई निगरानी सक्रिय' : 'Live Government Data & AI Surveillance Active'}
          </div>

          <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight">
            ${isHindi 
              ? `ग्राम ${currentVillageObj.nameHindi}, ${currentBlockObj.nameHindi} स्वास्थ्य इंटेलिजेंस` 
              : `Village ${currentVillageObj.name}, ${currentBlockObj.name} Health Intelligence`}
          </h1>

          <p class="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            ${isHindi 
              ? 'एआई-संचालित ग्रामीण स्वास्थ्य सेवा: प्राथमिक स्वास्थ्य केंद्र (PHC), सीएचसी, आशा कार्यकर्ता, टेलीमेडिसिन और आपातकालीन कमांड।' 
              : 'AI-powered healthcare access for every village, family and individual. Empowering ASHA workers, PHC doctors, and district health officers with real-time decision support.'}
          </p>

          <!-- Quick Action Buttons -->
          <div class="pt-3 flex flex-wrap gap-3">
            <button id="dash-btn-start-triage" class="bg-white hover:bg-emerald-50 text-emerald-950 font-bold px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition flex items-center gap-2 text-xs sm:text-sm">
              <i data-lucide="activity" class="w-4 h-4 text-emerald-600"></i>
              ${isHindi ? 'एआई स्मार्ट ट्रियाज जांच करें' : 'Start AI Smart Triage'}
            </button>

            <button id="dash-btn-emergency-sos" class="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-4 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2 text-xs sm:text-sm pulse-emergency">
              <i data-lucide="siren" class="w-4 h-4"></i>
              ${isHindi ? '108 आपातकालीन एम्बुलेंस SOS' : '108 Emergency SOS'}
            </button>

            <button id="dash-btn-open-map" class="bg-emerald-900/60 hover:bg-emerald-900/80 text-white font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition flex items-center gap-2 text-xs sm:text-sm">
              <i data-lucide="map-pin" class="w-4 h-4 text-teal-300"></i>
              ${isHindi ? 'निकटतम स्वास्थ्य केंद्र खोजें' : 'Find Nearby Healthcare Map'}
            </button>
          </div>
        </div>
      </div>

      <!-- 8 Key Metrics Grid (Requirement #5) -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="bar-chart-2" class="w-5 h-5 text-emerald-600 dark:text-emerald-400"></i>
            ${isHindi ? 'मुख्य स्वास्थ्य संकेतक (लाइव)' : 'Key Healthcare Indicators (Live Update)'}
          </h2>
          <span class="text-xs text-slate-500 dark:text-slate-400">
            ${isHindi ? `क्षेत्र: ${currentVillageObj.name}` : `Region: ${currentVillageObj.name} Village`}
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Card 1: People Served -->
          <div class="glass-card p-4 hover:border-emerald-500/50 transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                ${isHindi ? 'कुल लाभांवित नागरिक' : 'People Served'}
              </span>
              <div class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <i data-lucide="users" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline justify-between">
              <span class="text-2xl font-extrabold text-slate-900 dark:text-white">${m.peopleServed.toLocaleString('en-IN')}</span>
              <span class="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">+4.2% mo</span>
            </div>
            <p class="text-[10px] text-slate-400 mt-1">Covering BKT & surrounding blocks</p>
          </div>

          <!-- Card 2: Active Health Alerts -->
          <div class="glass-card p-4 hover:border-amber-500/50 transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                ${isHindi ? 'सक्रिय स्वास्थ्य अलर्ट' : 'Active Health Alerts'}
              </span>
              <div class="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <i data-lucide="bell-ring" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline justify-between">
              <span class="text-2xl font-extrabold text-amber-600 dark:text-amber-400">${m.activeHealthAlerts}</span>
              <span class="text-[11px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-1.5 py-0.5 rounded">Require Action</span>
            </div>
            <p class="text-[10px] text-slate-400 mt-1">4 Critical, 10 Moderate alerts</p>
          </div>

          <!-- Card 3: Available Healthcare Facilities -->
          <div class="glass-card p-4 hover:border-teal-500/50 transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                ${isHindi ? 'उपलब्ध स्वास्थ्य केंद्र' : 'Available Facilities'}
              </span>
              <div class="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <i data-lucide="building-2" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline justify-between">
              <span class="text-2xl font-extrabold text-slate-900 dark:text-white">${m.availableFacilities}</span>
              <span class="text-[11px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-950 px-1.5 py-0.5 rounded">PHC / CHC / Hosp</span>
            </div>
            <p class="text-[10px] text-slate-400 mt-1">Nearest PHC Bargadi (1.8 km)</p>
          </div>

          <!-- Card 4: Teleconsultations -->
          <div class="glass-card p-4 hover:border-blue-500/50 transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                ${isHindi ? 'टेलीकंसल्टेशन परामर्श' : 'Teleconsultations'}
              </span>
              <div class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <i data-lucide="video" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline justify-between">
              <span class="text-2xl font-extrabold text-slate-900 dark:text-white">${m.teleconsultationsCount.toLocaleString('en-IN')}</span>
              <span class="text-[11px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded">eSanjeevani API</span>
            </div>
            <p class="text-[10px] text-slate-400 mt-1">Avg response time: 6 mins</p>
          </div>

          <!-- Card 5: Medicine Availability -->
          <div class="glass-card p-4 hover:border-emerald-500/50 transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                ${isHindi ? 'दवा उपलब्धता दर' : 'Medicine Availability'}
              </span>
              <div class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <i data-lucide="pill" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline justify-between">
              <span class="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">${m.medicineAvailabilityPct}%</span>
              <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">Jan Aushadhi</span>
            </div>
            <p class="text-[10px] text-slate-400 mt-1">Essential generic meds in stock</p>
          </div>

          <!-- Card 6: High-Risk Patients -->
          <div class="glass-card p-4 hover:border-rose-500/50 transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                ${isHindi ? 'उच्च जोखिम वाले मरीज' : 'High-Risk Patients'}
              </span>
              <div class="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <i data-lucide="user-minus" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline justify-between">
              <span class="text-2xl font-extrabold text-rose-600 dark:text-rose-400">${m.highRiskPatientsCount}</span>
              <span class="text-[11px] font-bold text-rose-700 bg-rose-50 dark:bg-rose-950 px-1.5 py-0.5 rounded">ASHA Tracked</span>
            </div>
            <p class="text-[10px] text-slate-400 mt-1">ANC High Risk & Chronic BP/Diabetes</p>
          </div>

          <!-- Card 7: Vaccination Coverage -->
          <div class="glass-card p-4 hover:border-cyan-500/50 transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                ${isHindi ? 'टीकाकरण कवरेज' : 'Vaccination Coverage'}
              </span>
              <div class="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <i data-lucide="syringe" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline justify-between">
              <span class="text-2xl font-extrabold text-slate-900 dark:text-white">${m.vaccinationCoveragePct}%</span>
              <span class="text-[11px] font-bold text-cyan-600 bg-cyan-50 dark:bg-cyan-950 px-1.5 py-0.5 rounded">Mission Indradhanush</span>
            </div>
            <p class="text-[10px] text-slate-400 mt-1">Infants 0-2 yrs immunization</p>
          </div>

          <!-- Card 8: Maternal Health Alerts -->
          <div class="glass-card p-4 hover:border-purple-500/50 transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                ${isHindi ? 'मातृ स्वास्थ्य अलर्ट' : 'Maternal Alerts'}
              </span>
              <div class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <i data-lucide="baby" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline justify-between">
              <span class="text-2xl font-extrabold text-purple-600 dark:text-purple-400">${m.maternalAlertsCount}</span>
              <span class="text-[11px] font-bold text-purple-700 bg-purple-50 dark:bg-purple-950 px-1.5 py-0.5 rounded">ANC Visits Due</span>
            </div>
            <p class="text-[10px] text-slate-400 mt-1">Trimester 3 high monitoring</p>
          </div>
        </div>
      </div>

      <!-- Secondary Dashboard Sections: Village Health Summary & AI Referral Stepper -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Visual Referral Workflow Stepper Preview (Requirement #7) -->
        <div class="glass-card p-5 lg:col-span-2 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="workflow" class="w-4 h-4 text-emerald-600"></i>
                ${isHindi ? 'कनेक्टेड स्वास्थ्य सेवा प्रवाह (डिजिटल ट्रियाज से रेफरल)' : 'Connected Healthcare Referral Flow'}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                Patient → AI Triage → Sub-Centre/PHC → CHC → District Hospital → Emergency 108
              </p>
            </div>
            <span class="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">Integrated</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs py-2">
            <div class="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <div class="w-8 h-8 rounded-full bg-emerald-500 text-white font-extrabold mx-auto flex items-center justify-center">1</div>
              <p class="font-bold text-slate-900 dark:text-white">Patient</p>
              <p class="text-[10px] text-slate-500">Village Bargadi</p>
            </div>
            <div class="bg-emerald-50 dark:bg-emerald-950/60 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div class="w-8 h-8 rounded-full bg-teal-600 text-white font-extrabold mx-auto flex items-center justify-center">2</div>
              <p class="font-bold text-emerald-900 dark:text-emerald-300">AI Triage</p>
              <p class="text-[10px] text-emerald-700 dark:text-emerald-400">Risk Assessment</p>
            </div>
            <div class="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <div class="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold mx-auto flex items-center justify-center">3</div>
              <p class="font-bold text-slate-900 dark:text-white">PHC Bargadi</p>
              <p class="text-[10px] text-slate-500">1.8 km (6 mins)</p>
            </div>
            <div class="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <div class="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold mx-auto flex items-center justify-center">4</div>
              <p class="font-bold text-slate-900 dark:text-white">CHC BKT</p>
              <p class="text-[10px] text-slate-500">4.2 km (12 mins)</p>
            </div>
            <div class="bg-rose-50 dark:bg-rose-950/60 p-3 rounded-xl border border-rose-200 dark:border-rose-800 space-y-1 col-span-2 sm:col-span-1">
              <div class="w-8 h-8 rounded-full bg-rose-600 text-white font-extrabold mx-auto flex items-center justify-center">5</div>
              <p class="font-bold text-rose-900 dark:text-rose-300">108 Emergency</p>
              <p class="text-[10px] text-rose-700 dark:text-rose-400">District Hosp ICU</p>
            </div>
          </div>
        </div>

        <!-- Health Equity Score Preview Card (Requirement #21) -->
        <div class="glass-card p-5 space-y-3 bg-gradient-to-br from-emerald-900 to-teal-950 text-white border-emerald-800">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-300">Bharat Health Equity Score</span>
            <span class="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded text-emerald-200 font-mono">Index 0-100</span>
          </div>

          <div class="flex items-center gap-4">
            <div class="w-20 h-20 rounded-2xl bg-emerald-800/60 border-2 border-emerald-500/50 flex flex-col items-center justify-center">
              <span class="text-3xl font-black text-emerald-300">${currentVillageObj.equityScore}</span>
              <span class="text-[9px] text-emerald-200 uppercase font-bold">/ 100</span>
            </div>
            <div class="space-y-1 text-xs">
              <p class="font-bold text-white">${currentVillageObj.name} Village Assessment</p>
              <p class="text-[11px] text-emerald-200">
                Category: <span class="text-amber-300 font-bold">Moderate High Equity</span>
              </p>
              <p class="text-[10px] text-emerald-300/80 leading-tight">
                Calculated using facility accessibility, medicine availability, maternal ANC coverage & telemedicine penetration.
              </p>
            </div>
          </div>

          <button id="dash-btn-view-equity" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-xl transition shadow text-center">
            ${isHindi ? 'इक्विटी स्कोर का संपूर्ण विवरण देखें' : 'View Full Equity Breakdown & Formula'}
          </button>
        </div>
      </div>
    </div>
  `;
}

export function attachDashboardEvents() {
  document.getElementById('dash-btn-start-triage')?.addEventListener('click', () => {
    state.setActiveTab('triage');
  });

  document.getElementById('dash-btn-emergency-sos')?.addEventListener('click', () => {
    state.setActiveTab('emergency');
  });

  document.getElementById('dash-btn-open-map')?.addEventListener('click', () => {
    state.setActiveTab('map');
  });

  document.getElementById('dash-btn-view-equity')?.addEventListener('click', () => {
    state.setActiveTab('equity');
  });
}
