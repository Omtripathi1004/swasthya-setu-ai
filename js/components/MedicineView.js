/**
 * SwasthyaSetu AI - Jan Aushadhi Medicine Availability Hub Component (Requirement #10)
 */

import { state } from '../state.js';
import { MEDICINES_CATALOG } from '../data/mockData.js';

export function renderMedicineView() {
  const isHindi = state.currentLanguage === 'hi';
  const medicines = state.medicines;

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="pill" class="w-6 h-6 text-emerald-400"></i>
            ${isHindi ? 'प्रधानमंत्री जन औषधि दवा खोज एवं स्टॉक स्थिति' : 'Jan Aushadhi Generic Medicine Hub & Inventory Tracker'}
          </h1>
          <p class="text-xs text-emerald-100">
            ${isHindi 
              ? 'सस्ती जन औषधि दवाएं, ब्रांडेड एमआरपी की तुलना में 50%-90% बचत एवं PHC/जन औषधि केंद्र स्टॉक' 
              : 'Affordable generic medicines, stock availability at local PHC/Jan Aushadhi stores & price savings calculator.'}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
            <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> PMBJP Verified Pricing
          </span>
        </div>
      </div>

      <!-- Search & Filter Controls -->
      <div class="glass-card p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 border-slate-200 dark:border-slate-800">
        <div class="flex-1 min-w-[260px] relative">
          <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-3"></i>
          <input type="text" id="med-search-input" class="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Search paracetamol, amoxicillin, metformin, IFA tablets...">
        </div>

        <div class="flex items-center gap-2 text-xs">
          <button id="btn-med-filter-all" class="bg-emerald-600 text-white font-bold px-3 py-2 rounded-xl shadow">All Meds (${medicines.length})</button>
          <button id="btn-med-filter-low" class="bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-bold px-3 py-2 rounded-xl border border-amber-300">Low/Critical Stock</button>
          <button id="btn-update-stock-modal" class="bg-teal-700 hover:bg-teal-600 text-white font-bold px-3 py-2 rounded-xl shadow flex items-center gap-1">
            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Staff Stock Update
          </button>
        </div>
      </div>

      <!-- Medicine Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${medicines.map(med => {
          const savingsPct = med.marketMRP > 0 ? Math.round(((med.marketMRP - med.janAushadhiPrice) / med.marketMRP) * 100) : 100;

          return `
            <div class="glass-card p-5 space-y-3 hover:border-emerald-500 transition border-slate-200 dark:border-slate-800">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-[10px] font-extrabold uppercase text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    ${med.category}
                  </span>
                  <h3 class="text-sm font-extrabold text-slate-900 dark:text-white mt-1">${med.name}</h3>
                  <p class="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Generic: ${med.genericName}</p>
                </div>

                <span class="text-[10px] font-extrabold px-2 py-0.5 rounded ${
                  med.availabilityStatus === 'Normal Stock' ? 'bg-emerald-100 text-emerald-800' :
                  med.availabilityStatus === 'Low Stock' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800 pulse-emergency'
                }">
                  ${med.availabilityStatus}
                </span>
              </div>

              <!-- Price Savings Calculator Box -->
              <div class="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/60 dark:to-teal-950/60 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-slate-500 dark:text-slate-400">Jan Aushadhi Price:</span>
                  <p class="text-lg font-black text-emerald-700 dark:text-emerald-300">
                    ${med.janAushadhiPrice === 0 ? 'FREE (Govt Supply)' : `₹${med.janAushadhiPrice.toFixed(2)}`}
                    <span class="text-[10px] text-slate-400 font-normal">/ ${med.stripSize}</span>
                  </p>
                </div>

                <div class="text-right">
                  <span class="text-[10px] text-slate-400 line-through">MRP: ₹${med.marketMRP.toFixed(2)}</span>
                  <p class="text-xs font-extrabold text-emerald-600 bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 rounded mt-0.5">
                    Save ${savingsPct}%
                  </p>
                </div>
              </div>

              <!-- Store & Stock Info -->
              <div class="text-xs space-y-1">
                <p class="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1">
                  <i data-lucide="building-2" class="w-3.5 h-3.5 text-slate-400"></i>
                  Facility: ${med.facilityName}
                </p>
                <div class="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Stock Remaining: <strong class="text-slate-900 dark:text-white font-mono">${med.stockCount} units</strong></span>
                  <span class="text-[9px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.2 rounded">Demo Data</span>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function attachMedicineEvents() {
  document.getElementById('btn-update-stock-modal')?.addEventListener('click', () => {
    alert('📦 Healthcare Worker Stock Update Kiosk:\n\nParacetamol stock updated at PHC Bargadi +200 strips by Pharmacist Suresh.');
  });
}
