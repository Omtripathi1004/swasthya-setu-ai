/**
 * SwasthyaSetu AI - Admin Analytics & District Governance Component (Requirement #28)
 */

import { state } from '../state.js';

export function renderAdminAnalyticsView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="bar-chart-3" class="w-6 h-6 text-emerald-400"></i>
            ${isHindi ? 'प्रशासनिक एनालिटिक्स एवं जिला स्वास्थ्य रिपोर्ट' : 'Executive Admin Analytics & Healthcare Impact Dashboard'}
          </h1>
          <p class="text-xs text-slate-300">
            Analytics tracking patients served, teleconsultation trends, referrals, facility utilization & medicine shortages.
          </p>
        </div>

        <span class="badge-emerald text-xs font-bold">Lucknow District CMO View</span>
      </div>

      <!-- Analytics Charts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Chart 1: Patients Served Trend -->
        <div class="glass-card p-6 space-y-3 border-slate-200 dark:border-slate-800">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Q1 Patients Served & Teleconsultation Volume
            </h3>
            <span class="text-[10px] text-slate-400">Answer: Patient Outreach Growth</span>
          </div>

          <!-- Chart Visual Box -->
          <div class="h-48 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 flex items-end justify-between gap-2 border border-slate-200 dark:border-slate-700">
            <div class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full bg-emerald-500 rounded-t-lg" style="height: 45%;"></div>
              <span class="text-[9px] text-slate-400 font-bold">Jul</span>
            </div>
            <div class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full bg-emerald-500 rounded-t-lg" style="height: 60%;"></div>
              <span class="text-[9px] text-slate-400 font-bold">Aug</span>
            </div>
            <div class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full bg-emerald-500 rounded-t-lg" style="height: 75%;"></div>
              <span class="text-[9px] text-slate-400 font-bold">Sep</span>
            </div>
            <div class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full bg-teal-400 rounded-t-lg" style="height: 90%;"></div>
              <span class="text-[9px] text-teal-600 font-bold">Oct (Now)</span>
            </div>
          </div>
        </div>

        <!-- Chart 2: Referral Distribution -->
        <div class="glass-card p-6 space-y-3 border-slate-200 dark:border-slate-800">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Referral Distribution (PHC → CHC → District Hospital)
            </h3>
            <span class="text-[10px] text-slate-400">Answer: Referral Efficiency</span>
          </div>

          <div class="h-48 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 flex items-center justify-around border border-slate-200 dark:border-slate-700">
            <div class="text-center space-y-1">
              <div class="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center font-black text-emerald-600">62%</div>
              <p class="text-[10px] font-bold text-slate-700 dark:text-slate-300">Resolved at PHC</p>
            </div>
            <div class="text-center space-y-1">
              <div class="w-16 h-16 rounded-full border-4 border-teal-500 flex items-center justify-center font-black text-teal-600">28%</div>
              <p class="text-[10px] font-bold text-slate-700 dark:text-slate-300">Referred to CHC</p>
            </div>
            <div class="text-center space-y-1">
              <div class="w-16 h-16 rounded-full border-4 border-rose-500 flex items-center justify-center font-black text-rose-600">10%</div>
              <p class="text-[10px] font-bold text-slate-700 dark:text-slate-300">District Trauma</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachAdminAnalyticsEvents() {}
