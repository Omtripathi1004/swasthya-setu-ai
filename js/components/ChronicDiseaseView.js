/**
 * SwasthyaSetu AI - Chronic Disease Management Component (Requirement #14)
 */

import { state } from '../state.js';

export function renderChronicDiseaseView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="stethoscope" class="w-6 h-6 text-teal-300"></i>
            ${isHindi ? 'दीर्घकालिक बीमारी प्रबंधन (हाइपरटेंशन एवं डायबिटीज)' : 'Chronic Disease Monitoring & NCD Tracker'}
          </h1>
          <p class="text-xs text-teal-100">
            ${isHindi 
              ? 'ब्लड प्रेशर, ब्लड ग्लूकोज लॉगिंग, दवा सेवन अनुपालन एवं एएनएम/आशा फॉलो-अप अलर्ट' 
              : 'Monitor Hypertension, Diabetes, Asthma & Cardiac risk with daily adherence reminders & ASHA logs.'}
          </p>
        </div>

        <button id="btn-open-vitals-logger" class="bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow transition flex items-center gap-1.5">
          <i data-lucide="plus-circle" class="w-4 h-4"></i>
          Log BP & Blood Glucose Vitals
        </button>
      </div>

      <!-- Patients Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Patient Card 1 -->
        <div class="glass-card p-6 space-y-4 border-slate-200 dark:border-slate-800">
          <div class="flex items-start justify-between">
            <div>
              <span class="badge-blue text-[10px] uppercase font-bold">Hypertension + Diabetes</span>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white mt-1">Mahesh Chaurasia (Age 58)</h3>
              <p class="text-[11px] text-slate-500">Bargadi Village • Reg ID: NCD-LKO-9041</p>
            </div>
            <span class="badge-emerald text-[10px] font-bold">Adherence 94%</span>
          </div>

          <!-- Vitals Sparkline Preview -->
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <span class="text-slate-400 text-[10px]">Blood Pressure (Last Logged)</span>
              <p class="text-lg font-black text-emerald-600 dark:text-emerald-400">128/82 <span class="text-xs font-normal">mmHg</span></p>
              <p class="text-[9px] text-emerald-700">Target Range (Optimal)</p>
            </div>

            <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <span class="text-slate-400 text-[10px]">Fasting Blood Glucose</span>
              <p class="text-lg font-black text-amber-600 dark:text-amber-400">140 <span class="text-xs font-normal">mg/dL</span></p>
              <p class="text-[9px] text-amber-700">Mild Pre-prandial Elevation</p>
            </div>
          </div>

          <!-- Active Prescribed Regimen -->
          <div class="space-y-1 text-xs">
            <p class="font-bold text-slate-700 dark:text-slate-300 text-[11px]">Daily Prescribed Regimen:</p>
            <div class="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl space-y-1 text-[11px]">
              <div class="flex items-center justify-between">
                <span>💊 Metformin 500mg (1 Tab After Breakfast)</span>
                <span class="text-emerald-600 font-bold">Taken ✓</span>
              </div>
              <div class="flex items-center justify-between">
                <span>💊 Amlodipine 5mg (1 Tab Night)</span>
                <span class="text-emerald-600 font-bold">Taken ✓</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Patient Card 2 -->
        <div class="glass-card p-6 space-y-4 border-slate-200 dark:border-slate-800">
          <div class="flex items-start justify-between">
            <div>
              <span class="badge-amber text-[10px] uppercase font-bold">Asthma / COPD</span>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white mt-1">Suresh Ram (Age 64)</h3>
              <p class="text-[11px] text-slate-500">Kathvara Village • Reg ID: NCD-LKO-8812</p>
            </div>
            <span class="badge-amber text-[10px] font-bold">Requires Follow-up</span>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <span class="text-slate-400 text-[10px]">SpO2 Pulse Oximeter</span>
              <p class="text-lg font-black text-amber-600">95%</p>
              <p class="text-[9px] text-amber-700">Borderline SpO2</p>
            </div>

            <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <span class="text-slate-400 text-[10px]">Inhaler Usage Log</span>
              <p class="text-lg font-black text-blue-600">2 Puffs / Day</p>
              <p class="text-[9px] text-blue-700">Salbutamol Inhaler</p>
            </div>
          </div>

          <div class="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-[11px] text-amber-800 dark:text-amber-300">
            🔔 ASHA Visit Scheduled for Air Quality / Seasonal Asthma Check in Kathvara.
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachChronicDiseaseEvents() {
  document.getElementById('btn-open-vitals-logger')?.addEventListener('click', () => {
    alert('🩺 Log Vitals Kiosk:\n\nLogged BP 124/80 & Blood Sugar 118 mg/dL for Mahesh Chaurasia. Record synced to ABHA profile!');
  });
}
