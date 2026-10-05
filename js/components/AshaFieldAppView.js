/**
 * SwasthyaSetu AI - ASHA / ANM Mobile Field App Component (Requirement #18)
 */

import { state } from '../state.js';
import { ASHA_HOUSEHOLD_VISITS } from '../data/mockData.js';

export function renderAshaFieldAppView() {
  const isHindi = state.currentLanguage === 'hi';
  const visits = state.ashaVisits;

  return `
    <div class="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="bg-emerald-500/30 text-emerald-200 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              Mobile-First Field Console
            </span>
          </div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2 mt-1">
            <i data-lucide="smartphone" class="w-6 h-6 text-emerald-400"></i>
            ${isHindi ? 'आशा एवं एएनएम फ़ील्ड वर्कर ऐप' : 'ASHA / ANM Community Health Field App'}
          </h1>
          <p class="text-xs text-emerald-100">
            ${isHindi 
              ? 'आज के घरेलू दौरे, गर्भवती महिलाओं की देखभाल, शिशु टीकाकरण एवं ऑफलाइन डेटा एंट्री' 
              : 'Daily household visits, maternal ANC follow-ups, child immunization dues & offline sync queue.'}
          </p>
        </div>

        <button id="btn-open-log-visit-modal" class="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold px-4 py-2 rounded-xl text-xs shadow transition flex items-center gap-1.5">
          <i data-lucide="plus" class="w-4 h-4"></i>
          Log New Field Visit
        </button>
      </div>

      <!-- Offline Sync Status Banner (Requirement #18 Visual Workflow) -->
      <div class="p-4 ${state.isOffline ? 'bg-amber-900/90 border-amber-500 text-amber-100' : 'bg-slate-900 border-slate-800 text-white'} border rounded-2xl flex items-center justify-between shadow">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl ${state.isOffline ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-400'} flex items-center justify-center font-bold">
            <i data-lucide="${state.isOffline ? 'wifi-off' : 'wifi'}" class="w-5 h-5"></i>
          </div>
          <div>
            <p class="text-xs font-bold uppercase tracking-wider">
              ${state.isOffline ? 'Offline Mode Active → Local Queue' : 'Online Sync Active → Connected to Server'}
            </p>
            <p class="text-[11px] text-slate-300">
              ${state.isOffline ? `${state.offlineQueueCount} visits stored locally on device. Ready to sync.` : 'All field records synced with CHC Bakshi Ka Talab database.'}
            </p>
          </div>
        </div>

        <button id="btn-asha-sync-action" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition">
          ${state.isOffline ? 'Sync Queue Now' : 'Simulate Offline'}
        </button>
      </div>

      <!-- Today's Household Visit Queue -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="calendar-check" class="w-4 h-4 text-emerald-600"></i>
            Today's Assigned Household Visits (${visits.length})
          </h2>
          <span class="text-xs text-slate-500">Bargadi & Kathvara Villages</span>
        </div>

        <div class="space-y-3">
          ${visits.map(v => `
            <div class="glass-card p-4 space-y-3 border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                    v.priority === 'HIGH_RISK' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }">
                    ${v.priority}
                  </span>
                  <h3 class="text-sm font-extrabold text-slate-900 dark:text-white mt-1">${v.patientName} (${v.headName})</h3>
                  <p class="text-[11px] text-slate-500">Household: ${v.householdId} • Village: ${v.village}</p>
                </div>

                <span class="badge-blue text-[10px] font-bold">${v.status}</span>
              </div>

              <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <p class="font-bold text-emerald-800 dark:text-emerald-300">Visit Type: ${v.visitType}</p>
                <p class="text-slate-600 dark:text-slate-300 text-[11px]">${v.riskReason}</p>
              </div>

              <div class="flex items-center justify-between pt-1">
                <span class="text-[10px] text-slate-400">Assigned: ${v.assignedAsha}</span>
                <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition" onclick="alert('✅ Visit logged for ${v.patientName}. Vitals saved.')">
                  Log Complete & Save Vitals
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function attachAshaFieldAppEvents() {
  document.getElementById('btn-asha-sync-action')?.addEventListener('click', () => {
    if (state.isOffline) {
      state.syncOfflineQueue();
      alert('✅ Offline visit queue successfully synced with District Central Server!');
    } else {
      state.toggleOfflineMode();
    }
  });

  document.getElementById('btn-open-log-visit-modal')?.addEventListener('click', () => {
    alert('📋 ASHA New Visit Logger:\n\nEntered ANC check for Anita Devi at Bargadi Village. Hb 10.4 g/dL logged.');
  });
}
