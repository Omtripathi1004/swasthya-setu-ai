/**
 * SwasthyaSetu AI - Government Data Source Center Component (/data-sources) (Requirements #3 & #27)
 */

import { state } from '../state.js';
import { GOVERNMENT_DATA_SOURCES } from '../data/mockData.js';

export function renderDataSourcesView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="database" class="w-6 h-6 text-teal-400"></i>
            ${isHindi ? 'सरकारी डेटा स्रोत केंद्र एवं डेटा पारदर्शिता' : 'Government Data Source Center & Transparency Hub (/data-sources)'}
          </h1>
          <p class="text-xs text-teal-100">
            ${isHindi 
              ? 'राष्ट्रीय स्वास्थ्य मिशन, NHA, data.gov.in, NFHS-5 और IMD के जुड़े हुए ओपन डेटा सेट' 
              : 'Verifiable open government health data streams, API metadata, update timestamps & official URLs.'}
          </p>
        </div>

        <span class="bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow">
          100% Data Transparency Policy
        </span>
      </div>

      <!-- Dataset Cards List -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${GOVERNMENT_DATA_SOURCES.map(ds => `
          <div class="glass-card p-6 space-y-4 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-[10px] font-extrabold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded">
                  ${ds.dataStatus}
                </span>
                <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">${ds.name}</h3>
                <p class="text-[11px] text-slate-500">${ds.publisher}</p>
              </div>

              <span class="badge-blue text-[10px] font-bold whitespace-nowrap">${ds.apiStatus}</span>
            </div>

            <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <p class="font-bold text-slate-800 dark:text-slate-200">Dataset: ${ds.datasetName}</p>
              <p class="text-[11px] text-slate-600 dark:text-slate-400">${ds.description}</p>
            </div>

            <div class="grid grid-cols-2 gap-2 text-[10px] text-slate-500">
              <div>Last Updated: <strong class="text-slate-900 dark:text-white">${ds.lastUpdated}</strong></div>
              <div>Coverage: <strong class="text-slate-900 dark:text-white">${ds.coverage}</strong></div>
            </div>

            <div class="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
              <span class="text-[10px] text-slate-400 font-mono">Dataset ID: ${ds.id}</span>
              <a href="${ds.accessUrl}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                View Official Source <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function attachDataSourcesEvents() {}
