/**
 * SwasthyaSetu AI - Government Health Schemes Component (Requirement #11)
 */

import { state } from '../state.js';
import { GOVT_SCHEMES } from '../data/mockData.js';

export function renderSchemesView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-amber-900 via-emerald-900 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="shield-check" class="w-6 h-6 text-amber-400"></i>
            ${isHindi ? 'सरकारी स्वास्थ्य योजनाएं एवं पात्रता जांच' : 'Government Healthcare Schemes & Eligibility Engine'}
          </h1>
          <p class="text-xs text-amber-100">
            ${isHindi 
              ? 'आयुष्मान भारत PM-JAY, ABHA ID, जननी सुरक्षा योजना, मातृ वंदना एवं राष्ट्रीय स्वास्थ्य मिशन गाइड' 
              : 'PM-JAY ₹5 Lakh cover, ABDM Digital Health Card, Janani Suraksha Yojana & Mission Indradhanush.'}
          </p>
        </div>

        <button id="btn-open-eligibility-wizard" class="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-4 py-2 rounded-xl text-xs shadow transition flex items-center gap-1.5">
          <i data-lucide="sparkles" class="w-4 h-4"></i>
          Check My Eligibility Wizard
        </button>
      </div>

      <!-- Schemes Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${GOVT_SCHEMES.map(s => `
          <div class="glass-card p-6 space-y-4 border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
                  <i data-lucide="${s.icon}" class="w-5 h-5"></i>
                </div>
                <div>
                  <span class="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">${s.category}</span>
                  <h3 class="text-base font-extrabold text-slate-900 dark:text-white">${isHindi ? s.nameHindi : s.name}</h3>
                </div>
              </div>
              <span class="badge-emerald text-[10px] font-bold">${s.dataStatus}</span>
            </div>

            <p class="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
              🎁 Key Benefit: ${s.benefit}
            </p>

            <div class="space-y-2 text-xs">
              <p class="font-bold text-slate-800 dark:text-slate-200">Eligibility Criteria:</p>
              <ul class="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-0.5 text-[11px]">
                ${s.eligibilityCriteria.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>

            <div class="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
              <span class="text-[10px] text-slate-400">Official Portal Link</span>
              <a href="${s.officialUrl}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1">
                Visit Official Portal <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Eligibility Disclaimer -->
      <div class="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-xs text-amber-800 dark:text-amber-300">
        ⚠️ <strong>Notice:</strong> Eligibility outputs are indicative based on open government rules. Official sanction is granted solely by empaneled hospitals or District Health Authorities.
      </div>
    </div>
  `;
}

export function attachSchemesEvents() {
  document.getElementById('btn-open-eligibility-wizard')?.addEventListener('click', () => {
    alert('✨ Scheme Eligibility Wizard:\n\nBased on BPL Ration Card in Rural Lucknow, you are eligible for:\n1. Ayushman Bharat PM-JAY (₹5 Lakh Cover)\n2. Janani Suraksha Yojana (₹1,400 Cash Benefit for Delivery at CHC BKT)\n3. Free Iron & Folic Acid Supply at PHC Bargadi');
  });
}
