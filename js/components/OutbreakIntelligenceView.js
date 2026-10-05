/**
 * SwasthyaSetu AI - Disease & Outbreak Intelligence Component (Requirements #15 & #16)
 */

import { state } from '../state.js';

export function renderOutbreakIntelligenceView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-rose-900 via-amber-900 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="flame" class="w-6 h-6 text-rose-400"></i>
            ${isHindi ? 'रोग प्रकोप निगरानी एवं पर्यावरण स्वास्थ्य इंटेलिजेंस' : 'Disease & Outbreak Intelligence + Environmental Health'}
          </h1>
          <p class="text-xs text-rose-100">
            ${isHindi 
              ? 'बुखार क्लस्टर, डेंगू/मलेरिया प्रकोप अलर्ट, तापमान, वर्षा एवं वायु गुणवत्ता स्वास्थ्य सहसंबंध' 
              : 'Real-time fever cluster surveillance, Dengue/Malaria anomaly detection & weather-health correlations.'}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="bg-rose-500/30 text-rose-200 text-xs font-bold px-3 py-1 rounded-full border border-rose-400/30 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            1 Disease Anomaly Flagged
          </span>
        </div>
      </div>

      <!-- AI Anomaly Detection Banner (Requirement #15 Mandatory Label) -->
      <div class="p-4 bg-gradient-to-r from-rose-900/90 to-amber-900/90 text-white rounded-2xl border border-rose-500/50 space-y-2 shadow-lg">
        <div class="flex items-center justify-between">
          <span class="text-xs font-extrabold text-amber-300 uppercase flex items-center gap-1.5">
            <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400"></i>
            AI Surveillance Early Warning System
          </span>
          <span class="text-[10px] bg-rose-800 px-2.5 py-0.5 rounded-full font-mono">ID: SURV-LKO-2026-04</span>
        </div>

        <p class="text-sm font-bold text-white">
          Kathvara Village Fever Cluster Anomaly: 12 cases reported in 48 hours (Baseline: 2 cases/week)
        </p>

        <p class="text-xs text-rose-200">
          Integrated with IMD rainfall data (48mm precipitation last week) indicating elevated vector-borne breeding index.
        </p>

        <!-- Mandatory Disclaimer Label -->
        <div class="pt-2 border-t border-white/20 text-xs text-amber-200 font-semibold italic">
          "Potential anomaly detected — public-health verification required."
        </div>
      </div>

      <!-- Weather & Environmental Health Correlation Section (Requirement #16) -->
      <div>
        <h2 class="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <i data-lucide="cloud-sun" class="w-4 h-4 text-amber-500"></i>
          Observed IMD Government Weather Data vs. AI Health Risk Matrix
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Temp Card -->
          <div class="glass-card p-4 space-y-2 border-slate-200 dark:border-slate-800">
            <div class="flex items-center justify-between text-xs text-slate-500">
              <span>Ambient Temp (IMD)</span>
              <i data-lucide="thermometer" class="w-4 h-4 text-amber-500"></i>
            </div>
            <p class="text-2xl font-black text-slate-900 dark:text-white">31.4 °C</p>
            <span class="badge-amber text-[10px]">Moderate Heat Stress</span>
          </div>

          <!-- Humidity & Vector Index -->
          <div class="glass-card p-4 space-y-2 border-slate-200 dark:border-slate-800">
            <div class="flex items-center justify-between text-xs text-slate-500">
              <span>Relative Humidity</span>
              <i data-lucide="droplets" class="w-4 h-4 text-blue-500"></i>
            </div>
            <p class="text-2xl font-black text-slate-900 dark:text-white">68%</p>
            <span class="badge-rose text-[10px]">High Mosquito Breeding Index</span>
          </div>

          <!-- AQI Card -->
          <div class="glass-card p-4 space-y-2 border-slate-200 dark:border-slate-800">
            <div class="flex items-center justify-between text-xs text-slate-500">
              <span>Air Quality Index (CPCB)</span>
              <i data-lucide="wind" class="w-4 h-4 text-teal-500"></i>
            </div>
            <p class="text-2xl font-black text-emerald-600">112 AQI</p>
            <span class="badge-emerald text-[10px]">Moderate Air Quality</span>
          </div>

          <!-- Flood Vulnerability -->
          <div class="glass-card p-4 space-y-2 border-slate-200 dark:border-slate-800">
            <div class="flex items-center justify-between text-xs text-slate-500">
              <span>Flood Vulnerability</span>
              <i data-lucide="waves" class="w-4 h-4 text-blue-500"></i>
            </div>
            <p class="text-2xl font-black text-slate-900 dark:text-white">Low</p>
            <span class="badge-blue text-[10px]">Normal Drainage</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachOutbreakIntelligenceEvents() {
  // Event listeners
}
