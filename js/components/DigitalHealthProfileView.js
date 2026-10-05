/**
 * SwasthyaSetu AI - Patient Digital Health Profile & ABHA Identity (Requirement #23)
 */

import { state } from '../state.js';

export function renderDigitalHealthProfileView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="user" class="w-6 h-6 text-teal-300"></i>
            ${isHindi ? 'मेरा स्वास्थ्य डिजिटल प्रोफाइल (ABHA ID)' : 'My Health Digital Profile & ABHA Card'}
          </h1>
          <p class="text-xs text-teal-100">
            Privacy-first digital health record repository linked to ABDM National Health Network.
          </p>
        </div>

        <span class="badge-emerald text-xs font-bold">ABDM Verified</span>
      </div>

      <!-- ABHA ID Digital Card Mockup -->
      <div class="bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4 border border-emerald-500/30 relative overflow-hidden">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center font-black text-xl text-emerald-300">
              AB
            </div>
            <div>
              <span class="text-[10px] uppercase font-bold text-emerald-200 tracking-wider">Ayushman Bharat Digital Health ID</span>
              <h2 class="text-lg font-black tracking-tight">Sunita Kumar</h2>
            </div>
          </div>
          <span class="bg-white/20 text-white text-[10px] font-mono px-2.5 py-1 rounded-full font-bold">Active</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div>
            <span class="text-[10px] text-emerald-200 block">ABHA Number</span>
            <p class="font-bold text-white tracking-widest">91-4029-1029-4810</p>
          </div>
          <div>
            <span class="text-[10px] text-emerald-200 block">Gender / Age</span>
            <p class="font-bold text-white">Female / 24 Yrs</p>
          </div>
          <div>
            <span class="text-[10px] text-emerald-200 block">Linked Mobile</span>
            <p class="font-bold text-white">+91 9839******</p>
          </div>
          <div>
            <span class="text-[10px] text-emerald-200 block">Village Address</span>
            <p class="font-bold text-white">Bargadi, BKT, UP</p>
          </div>
        </div>
      </div>

      <!-- Digital Health Records Timeline -->
      <div class="glass-card p-6 space-y-4 border-slate-200 dark:border-slate-800">
        <h2 class="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="file-text" class="w-4 h-4 text-emerald-600"></i>
          Digital Health Records Timeline
        </h2>

        <div class="space-y-3 text-xs">
          <div class="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-emerald-600">Oct 04, 2026 • PHC Bargadi</span>
              <p class="font-bold text-slate-900 dark:text-white">ANC Checkup Report & Hemoglobin Vital (9.1 g/dL)</p>
              <p class="text-[11px] text-slate-500">Signed by MO Dr. Rajesh Gupta</p>
            </div>
            <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-[11px]" onclick="alert('📥 Downloading Encrypted Record PDF...')">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachDigitalHealthProfileEvents() {}
