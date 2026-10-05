/**
 * SwasthyaSetu AI - Healthcare Facility Intelligence Component (Requirement #19)
 */

import { state } from '../state.js';
import { HEALTHCARE_FACILITIES } from '../data/mockData.js';

export function renderFacilityIntelligenceView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="building-2" class="w-6 h-6 text-teal-400"></i>
            ${isHindi ? 'स्वास्थ्य केंद्र प्रदर्शन एवं संसाधन इंटेलिजेंस' : 'Healthcare Facility Operations & Asset Intelligence'}
          </h1>
          <p class="text-xs text-slate-300">
            ${isHindi 
              ? 'PHC, CHC और जिला अस्पतालों के बेड, डॉक्टर उपस्थिति, ऑक्सीजन, एक्स-रे मशीन स्थिति एवं प्रतीक्षा समय' 
              : 'Real-time monitoring of bed availability, doctor shifts, oxygen reserves & waiting times across facilities.'}
          </p>
        </div>

        <span class="badge-emerald text-xs font-bold">Live Ops Dashboard</span>
      </div>

      <!-- Facility Operational Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${HEALTHCARE_FACILITIES.map(f => `
          <div class="glass-card p-6 space-y-4 border-slate-200 dark:border-slate-800">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-[10px] font-extrabold uppercase bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 px-2 py-0.5 rounded">
                  ${f.typeLabel}
                </span>
                <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">${f.name}</h3>
                <p class="text-[11px] text-slate-500">${f.address}</p>
              </div>

              <span class="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                ${f.status}
              </span>
            </div>

            <!-- Key Ops Metrics -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div class="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <span class="text-slate-400 text-[10px]">Patient Load</span>
                <p class="font-bold text-slate-900 dark:text-white mt-0.5">${f.patientLoad}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <span class="text-slate-400 text-[10px]">Doctors Duty</span>
                <p class="font-bold text-emerald-600 mt-0.5">${f.doctorsOnDuty} / ${f.doctorsTotal}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <span class="text-slate-400 text-[10px]">Beds Avail</span>
                <p class="font-bold text-teal-600 mt-0.5">${f.bedsAvailable} / ${f.bedsTotal}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <span class="text-slate-400 text-[10px]">Avg Wait</span>
                <p class="font-bold text-amber-600 mt-0.5">${f.avgWaitMins} Mins</p>
              </div>
            </div>

            <div class="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-3">
              <span>Oxygen Cylinders: <strong class="text-slate-900 dark:text-white">${f.oxygenCylinders} units</strong></span>
              <span class="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">Demo Telemetry Mirror</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function attachFacilityIntelligenceEvents() {}
