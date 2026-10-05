/**
 * SwasthyaSetu AI - Emergency 108 Command Center Component (Requirement #17)
 */

import { state } from '../state.js';

export function renderEmergencyResponseView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-rose-900 via-red-900 to-slate-950 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4 border-rose-800">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="siren" class="w-7 h-7 text-rose-400 animate-pulse"></i>
            ${isHindi ? '108 आपातकालीन एम्बुलेंस रिस्पॉन्स कमांड केंद्र' : '108 Emergency Response & Ambulance Command Center'}
          </h1>
          <p class="text-xs text-rose-100">
            ${isHindi 
              ? 'तत्काल एम्बुलेंस प्रेषण, निकटतम आईसीयू / ट्रॉमा बेड उपलब्धता एवं आपातकालीन रेफरल' 
              : 'Instant emergency dispatch, nearest ICU bed reservation & trauma center coordination.'}
          </p>
        </div>

        <button id="btn-trigger-instant-sos" class="bg-white hover:bg-rose-50 text-rose-950 font-black px-5 py-3 rounded-2xl shadow-xl transition flex items-center gap-2 text-xs sm:text-sm pulse-emergency">
          <i data-lucide="alert-octagon" class="w-5 h-5 text-rose-600"></i>
          TRIGGER 108 AMBULANCE SOS NOW
        </button>
      </div>

      <!-- Visual Workflow Stepper (Requirement #17) -->
      <div class="glass-card p-6 space-y-4 border-slate-200 dark:border-slate-800">
        <h2 class="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
          Visual Emergency Response Workflow
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          <div class="bg-rose-900 text-white p-3 rounded-xl space-y-1">
            <span class="w-6 h-6 rounded-full bg-white text-rose-950 font-extrabold mx-auto flex items-center justify-center text-xs">1</span>
            <p class="font-bold">Patient Emergency</p>
            <p class="text-[10px] text-rose-200">SOS Triggered</p>
          </div>
          <div class="bg-rose-800 text-white p-3 rounded-xl space-y-1">
            <span class="w-6 h-6 rounded-full bg-white text-rose-950 font-extrabold mx-auto flex items-center justify-center text-xs">2</span>
            <p class="font-bold">Emergency Detection</p>
            <p class="text-[10px] text-rose-200">GPS Triangulated</p>
          </div>
          <div class="bg-rose-700 text-white p-3 rounded-xl space-y-1">
            <span class="w-6 h-6 rounded-full bg-white text-rose-950 font-extrabold mx-auto flex items-center justify-center text-xs">3</span>
            <p class="font-bold">Nearest Facility</p>
            <p class="text-[10px] text-rose-200">CHC BKT / District</p>
          </div>
          <div class="bg-rose-600 text-white p-3 rounded-xl space-y-1">
            <span class="w-6 h-6 rounded-full bg-white text-rose-950 font-extrabold mx-auto flex items-center justify-center text-xs">4</span>
            <p class="font-bold">108 Transport</p>
            <p class="text-[10px] text-rose-200">Dispatched (ETA 8m)</p>
          </div>
          <div class="bg-emerald-700 text-white p-3 rounded-xl space-y-1 col-span-2 sm:col-span-1">
            <span class="w-6 h-6 rounded-full bg-white text-emerald-950 font-extrabold mx-auto flex items-center justify-center text-xs">5</span>
            <p class="font-bold">Hospital Admission</p>
            <p class="text-[10px] text-emerald-200">Follow-up Logged</p>
          </div>
        </div>
      </div>

      <!-- Emergency Contacts Hotline Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div class="glass-card p-4 space-y-1 border-rose-200 dark:border-rose-900">
          <i data-lucide="phone-call" class="w-6 h-6 text-rose-600 mx-auto"></i>
          <p class="text-lg font-black text-rose-600">108</p>
          <p class="text-xs font-bold text-slate-800 dark:text-white">Emergency Ambulance</p>
        </div>
        <div class="glass-card p-4 space-y-1">
          <i data-lucide="phone" class="w-6 h-6 text-emerald-600 mx-auto"></i>
          <p class="text-lg font-black text-emerald-600">102</p>
          <p class="text-xs font-bold text-slate-800 dark:text-white">Pregnancy & Infant Helpline</p>
        </div>
        <div class="glass-card p-4 space-y-1">
          <i data-lucide="help-circle" class="w-6 h-6 text-blue-600 mx-auto"></i>
          <p class="text-lg font-black text-blue-600">104</p>
          <p class="text-xs font-bold text-slate-800 dark:text-white">National Health Helpline</p>
        </div>
        <div class="glass-card p-4 space-y-1">
          <i data-lucide="shield" class="w-6 h-6 text-purple-600 mx-auto"></i>
          <p class="text-lg font-black text-purple-600">1091</p>
          <p class="text-xs font-bold text-slate-800 dark:text-white">Women Helpline</p>
        </div>
      </div>
    </div>
  `;
}

export function attachEmergencyResponseEvents() {
  document.getElementById('btn-trigger-instant-sos')?.addEventListener('click', () => {
    alert('🚨 108 EMERGENCY SOS ACTIVATED!\n\nLocation: Bargadi Village (BKT Block)\nDispatched Ambulance: UP-32-EG-4091\nETA: 8 Minutes\nNearest ICU: District Hospital Sitapur Road (5 ICU Beds Open)');
  });
}
