/**
 * SwasthyaSetu AI - Village Health Profile & AI Action Plan Component (Requirement #22)
 */

import { state } from '../state.js';
import { REGIONAL_HIERARCHY } from '../data/mockData.js';

export function renderVillageProfileView() {
  const isHindi = state.currentLanguage === 'hi';
  const upState = REGIONAL_HIERARCHY.states[0];
  const lkoDistrict = upState.districts[0];
  const bktBlock = lkoDistrict.blocks[0];
  const currentVillage = bktBlock.villages.find(v => v.id === state.selectedVillage) || bktBlock.villages[0];

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span class="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            Village Profile Digest
          </span>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2 mt-1">
            <i data-lucide="home" class="w-6 h-6 text-teal-300"></i>
            ${isHindi ? `ग्राम ${currentVillage.nameHindi} स्वास्थ्य प्रोफाइल` : `Village ${currentVillage.name} Health Profile`}
          </h1>
          <p class="text-xs text-teal-100">
            Demographic breakdown, active health workers, equity index & draft AI Action Plan.
          </p>
        </div>

        <div class="text-right">
          <span class="text-[10px] text-teal-200">Equity Score</span>
          <p class="text-3xl font-black text-amber-300 font-mono">${currentVillage.equityScore} / 100</p>
        </div>
      </div>

      <!-- Demographics & Stats Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="glass-card p-4 space-y-1 border-slate-200 dark:border-slate-800">
          <span class="text-xs font-semibold text-slate-500">Population</span>
          <p class="text-xl font-extrabold text-slate-900 dark:text-white">${currentVillage.population.toLocaleString()}</p>
        </div>
        <div class="glass-card p-4 space-y-1 border-slate-200 dark:border-slate-800">
          <span class="text-xs font-semibold text-slate-500">Households</span>
          <p class="text-xl font-extrabold text-slate-900 dark:text-white">${currentVillage.households}</p>
        </div>
        <div class="glass-card p-4 space-y-1 border-slate-200 dark:border-slate-800">
          <span class="text-xs font-semibold text-slate-500">Active ASHA / ANM</span>
          <p class="text-xl font-extrabold text-emerald-600">3 Field Workers</p>
        </div>
        <div class="glass-card p-4 space-y-1 border-slate-200 dark:border-slate-800">
          <span class="text-xs font-semibold text-slate-500">Nearest Facility</span>
          <p class="text-xl font-extrabold text-teal-600">PHC Bargadi (1.8km)</p>
        </div>
      </div>

      <!-- AI-Generated Village Health Action Plan Draft (Requirement #22) -->
      <div class="glass-card p-6 space-y-4 border-emerald-500/40 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40">
        <div class="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-800 pb-3">
          <h2 class="text-sm font-extrabold text-emerald-950 dark:text-emerald-100 flex items-center gap-2">
            <i data-lucide="sparkles" class="w-4 h-4 text-emerald-600"></i>
            Village Health Action Plan (AI Generated Draft)
          </h2>
          <span class="badge-amber text-[10px] uppercase font-bold">Draft — Human Review Required</span>
        </div>

        <div class="space-y-3 text-xs text-slate-800 dark:text-slate-200">
          <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
            <p class="font-bold text-emerald-800 dark:text-emerald-300">Priority Intervention #1: High Risk ANC Monitoring</p>
            <p class="text-slate-600 dark:text-slate-300">
              Conduct targeted home visits for 3 pregnant mothers with Hb &lt; 9.5 g/dL. Supply IFA red tablets & schedule CHC ultrasound.
            </p>
          </div>

          <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
            <p class="font-bold text-emerald-800 dark:text-emerald-300">Priority Intervention #2: Water & Vector Sanitation</p>
            <p class="text-slate-600 dark:text-slate-300">
              Disinfect open water drains in North Tola, Bargadi following 48mm rainfall to prevent mosquito breeding.
            </p>
          </div>
        </div>

        <div class="pt-2 flex items-center justify-between">
          <span class="text-[10px] text-slate-500">Drafted by SwasthyaSetu AI Engine v2.4</span>
          <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow" onclick="alert('✅ Village Action Plan Approved & Assigned to ASHA Smt. Anita Devi!')">
            Approve Village Action Plan
          </button>
        </div>
      </div>
    </div>
  `;
}

export function attachVillageProfileEvents() {}
