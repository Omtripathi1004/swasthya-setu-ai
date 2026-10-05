/**
 * SwasthyaSetu AI - Bharat Health Equity Score Component (Requirement #21)
 */

import { state } from '../state.js';
import { REGIONAL_HIERARCHY } from '../data/mockData.js';

export function renderHealthEquityView() {
  const isHindi = state.currentLanguage === 'hi';
  const upState = REGIONAL_HIERARCHY.states[0];
  const lkoDistrict = upState.districts[0];
  const bktBlock = lkoDistrict.blocks[0];

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="award" class="w-6 h-6 text-amber-400"></i>
            ${isHindi ? 'भारत हेल्थ इक्विटी स्कोर (0–100)' : 'Bharat Health Equity Score Index (0–100)'}
          </h1>
          <p class="text-xs text-teal-100">
            ${isHindi 
              ? 'ग्रामवार स्वास्थ्य पहुंच, सुविधा उपलब्धता, मातृ-शिशु सुरक्षा एवं दवा पहुंच का पारदर्शी सूचकांक' 
              : 'Multi-dimensional healthcare vulnerability & equity scoring framework for rural communities.'}
          </p>
        </div>

        <span class="badge-amber text-xs font-extrabold">Formula Transparency Model</span>
      </div>

      <!-- Formula Breakdown Cards -->
      <div class="glass-card p-6 space-y-4 border-slate-200 dark:border-slate-800">
        <h2 class="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="calculator" class="w-4 h-4 text-emerald-600"></i>
          Weighted Calculation Formula Breakdown
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs">
          <div class="bg-emerald-50 dark:bg-emerald-950 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <span class="text-xs font-black text-emerald-700 dark:text-emerald-300">25%</span>
            <p class="font-bold text-slate-900 dark:text-white mt-1">Spatial Access</p>
            <p class="text-[10px] text-slate-500">Distance to PHC/CHC</p>
          </div>
          <div class="bg-teal-50 dark:bg-teal-950 p-3 rounded-2xl border border-teal-200 dark:border-teal-800">
            <span class="text-xs font-black text-teal-700 dark:text-teal-300">20%</span>
            <p class="font-bold text-slate-900 dark:text-white mt-1">Facility Density</p>
            <p class="text-[10px] text-slate-500">Beds per 10k pop</p>
          </div>
          <div class="bg-purple-50 dark:bg-purple-950 p-3 rounded-2xl border border-purple-200 dark:border-purple-800">
            <span class="text-xs font-black text-purple-700 dark:text-purple-300">20%</span>
            <p class="font-bold text-slate-900 dark:text-white mt-1">Maternal & Child</p>
            <p class="text-[10px] text-slate-500">ANC 4x & Vaccine %</p>
          </div>
          <div class="bg-amber-50 dark:bg-amber-950 p-3 rounded-2xl border border-amber-200 dark:border-amber-800">
            <span class="text-xs font-black text-amber-700 dark:text-amber-300">15%</span>
            <p class="font-bold text-slate-900 dark:text-white mt-1">Medicine Access</p>
            <p class="text-[10px] text-slate-500">Jan Aushadhi Fill Rate</p>
          </div>
          <div class="bg-blue-50 dark:bg-blue-950 p-3 rounded-2xl border border-blue-200 dark:border-blue-800">
            <span class="text-xs font-black text-blue-700 dark:text-blue-300">10%</span>
            <p class="font-bold text-slate-900 dark:text-white mt-1">Telemedicine</p>
            <p class="text-[10px] text-slate-500">Kiosk & App consults</p>
          </div>
          <div class="bg-rose-50 dark:bg-rose-950 p-3 rounded-2xl border border-rose-200 dark:border-rose-800">
            <span class="text-xs font-black text-rose-700 dark:text-rose-300">10%</span>
            <p class="font-bold text-slate-900 dark:text-white mt-1">Chronic Care</p>
            <p class="text-[10px] text-slate-500">NCD Adherence Rate</p>
          </div>
        </div>
      </div>

      <!-- Village Leaderboard Table -->
      <div class="glass-card p-6 space-y-4 border-slate-200 dark:border-slate-800">
        <h2 class="text-sm font-extrabold text-slate-900 dark:text-white">
          Bakshi Ka Talab Village Health Equity Leaderboard
        </h2>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold">
              <tr>
                <th class="p-3">Village Name</th>
                <th class="p-3">Population</th>
                <th class="p-3">Households</th>
                <th class="p-3">Equity Score</th>
                <th class="p-3">Status Tier</th>
                <th class="p-3">Action Plan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
              ${bktBlock.villages.map(v => `
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="p-3 font-bold text-slate-900 dark:text-white">${v.name} (${v.nameHindi})</td>
                  <td class="p-3 text-slate-600 dark:text-slate-300">${v.population.toLocaleString()}</td>
                  <td class="p-3 text-slate-600 dark:text-slate-300">${v.households}</td>
                  <td class="p-3 font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">${v.equityScore} / 100</td>
                  <td class="p-3">
                    <span class="badge-emerald text-[10px] font-bold">
                      ${v.equityScore > 70 ? 'High Equity' : v.equityScore > 60 ? 'Moderate Equity' : 'High Priority'}
                    </span>
                  </td>
                  <td class="p-3">
                    <button class="text-xs font-bold text-emerald-600 hover:underline" onclick="window.appState.setRegion('UP','LKO','BKT','${v.id}'); window.appState.setActiveTab('village-profile');">
                      View Action Plan →
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function attachHealthEquityEvents() {}
