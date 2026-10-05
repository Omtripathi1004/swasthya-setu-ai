/**
 * SwasthyaSetu AI - Maternal & Child Health Management Component (Requirements #12 & #13)
 */

import { state } from '../state.js';

export function renderMaternalChildView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-purple-900 via-rose-900 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="heart-pulse" class="w-6 h-6 text-rose-400"></i>
            ${isHindi ? 'मातृ एवं शिशु स्वास्थ्य प्रबंधन (ANC एवं टीकाकरण)' : 'Maternal & Child Health Care (ANC & Immunization)'}
          </h1>
          <p class="text-xs text-rose-100">
            ${isHindi 
              ? 'गर्भावस्था चरण, 4 एएनसी जांच ट्रैकर, उच्च-जोखिम अलर्ट एवं राष्ट्रीय टीकाकरण सारणी' 
              : 'Track 4 ANC visits, high-risk maternal indicators, EDD calculator & child immunization schedule.'}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="bg-rose-500/30 text-rose-200 text-xs font-bold px-3 py-1 rounded-full border border-rose-400/30">
            12 High Risk Mothers Flagged
          </span>
        </div>
      </div>

      <!-- Two Tabs: Maternal ANC vs Child Immunization -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Section 1: Maternal Care & EDD Tracker -->
        <div class="glass-card p-6 space-y-4 border-slate-200 dark:border-slate-800">
          <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="baby" class="w-4 h-4 text-purple-600"></i>
              Maternal Health & ANC Visit Tracker
            </h2>
            <span class="badge-amber text-[10px]">Trimester 3 Monitoring</span>
          </div>

          <!-- Sample Mother Card -->
          <div class="bg-purple-50 dark:bg-purple-950/50 p-4 rounded-2xl border border-purple-200 dark:border-purple-800 space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xs font-extrabold text-purple-950 dark:text-purple-100">Sunita Kumar (Age 24)</h3>
                <p class="text-[11px] text-purple-700 dark:text-purple-300">Household HH_BKT_102 • Bargadi Village</p>
              </div>
              <span class="badge-rose text-[10px] font-bold">HIGH RISK MATERNAL</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-center font-mono">
              <div class="bg-white dark:bg-slate-900 p-2 rounded-lg border border-purple-100 dark:border-purple-900">
                <span class="text-slate-400">Week / EDD</span>
                <p class="font-bold text-purple-700 dark:text-purple-300">Wk 28 / Dec 14</p>
              </div>
              <div class="bg-white dark:bg-slate-900 p-2 rounded-lg border border-purple-100 dark:border-purple-900">
                <span class="text-slate-400">Hemoglobin</span>
                <p class="font-bold text-rose-600">9.1 g/dL (Anemic)</p>
              </div>
              <div class="bg-white dark:bg-slate-900 p-2 rounded-lg border border-purple-100 dark:border-purple-900">
                <span class="text-slate-400">BP Check</span>
                <p class="font-bold text-amber-600">134/86 mmHg</p>
              </div>
              <div class="bg-white dark:bg-slate-900 p-2 rounded-lg border border-purple-100 dark:border-purple-900">
                <span class="text-slate-400">ANC Completed</span>
                <p class="font-bold text-emerald-600">3 of 4 Visits</p>
              </div>
            </div>

            <!-- ANC Stepper -->
            <div class="space-y-1 text-xs">
              <p class="font-bold text-slate-700 dark:text-slate-300 text-[11px]">ANC Checkup Schedule:</p>
              <div class="grid grid-cols-4 gap-1 text-[10px] text-center font-semibold">
                <div class="bg-emerald-600 text-white p-1.5 rounded-md">1st ANC (Wk 12) ✓</div>
                <div class="bg-emerald-600 text-white p-1.5 rounded-md">2nd ANC (Wk 20) ✓</div>
                <div class="bg-amber-500 text-slate-950 p-1.5 rounded-md font-bold">3rd ANC (Due Now)</div>
                <div class="bg-slate-200 dark:bg-slate-800 text-slate-500 p-1.5 rounded-md">4th ANC (Wk 36)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Child Health & Immunization Timeline -->
        <div class="glass-card p-6 space-y-4 border-slate-200 dark:border-slate-800">
          <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="syringe" class="w-4 h-4 text-cyan-600"></i>
              Child Immunization & Growth Schedule
            </h2>
            <span class="badge-emerald text-[10px]">Mission Indradhanush</span>
          </div>

          <!-- Sample Child Card -->
          <div class="bg-cyan-50 dark:bg-cyan-950/50 p-4 rounded-2xl border border-cyan-200 dark:border-cyan-800 space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xs font-extrabold text-cyan-950 dark:text-cyan-100">Aarav Verma (Age 9 Months)</h3>
                <p class="text-[11px] text-cyan-700 dark:text-cyan-300">Household HH_BKT_108 • Bargadi Village</p>
              </div>
              <span class="badge-amber text-[10px] font-bold">Vaccine Due Today</span>
            </div>

            <!-- Vaccines Due List -->
            <div class="space-y-2 text-xs">
              <div class="bg-white dark:bg-slate-900 p-3 rounded-xl border border-cyan-200 dark:border-cyan-800 flex items-center justify-between">
                <div>
                  <p class="font-bold text-slate-900 dark:text-white">MR 1st Dose + Vitamin A Drops</p>
                  <p class="text-[10px] text-slate-500">Measles-Rubella 9-Month Window</p>
                </div>
                <button class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg">
                  Log Administered
                </button>
              </div>

              <!-- Past Completed Vaccines -->
              <div class="text-[10px] text-slate-500 space-y-1 pt-1">
                <p class="font-bold text-slate-700 dark:text-slate-300">Completed Vaccines:</p>
                <div class="flex flex-wrap gap-1">
                  <span class="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded">BCG (At Birth) ✓</span>
                  <span class="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded">OPV 1,2,3 ✓</span>
                  <span class="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded">Pentavalent 1,2,3 ✓</span>
                  <span class="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded">Rotavirus ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachMaternalChildEvents() {
  // Event listeners if needed
}
