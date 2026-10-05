/**
 * SwasthyaSetu AI - Interactive Modals (Judge Tour, 5 Pillars, Notification Center, SMS Simulator)
 */

import { state } from '../state.js';

export function renderModals() {
  const isHindi = state.currentLanguage === 'hi';
  const unreadNotifs = state.notifications.filter(n => !n.read);

  return `
    <!-- 1. Hackathon Judge 5-Min Tour Modal (Requirement #37) -->
    <div id="modal-judge-tour" class="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4 hidden animate-fadeIn">
      <div class="glass-card bg-slate-900 text-white border-emerald-500/50 max-w-3xl w-full p-6 sm:p-8 rounded-3xl space-y-5 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <button id="btn-close-judge-modal" class="absolute top-5 right-5 text-slate-400 hover:text-white p-2">
          <i data-lucide="x" class="w-6 h-6"></i>
        </button>

        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
            <i data-lucide="award" class="w-7 h-7"></i>
          </div>
          <div>
            <span class="text-[10px] uppercase font-bold text-amber-300 tracking-wider">WhyCode_4U Hackathon 2026 Pitch</span>
            <h2 class="text-xl sm:text-2xl font-black">How SwasthyaSetu Solves Rural Healthcare</h2>
          </div>
        </div>

        <p class="text-xs text-slate-300 leading-relaxed">
          From Patient → Community Health Worker (ASHA) → Healthcare Facility (PHC/CHC) → District Administration.
        </p>

        <!-- 5 Pillars Showcase (Requirement #37) -->
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
          <div class="bg-emerald-950 p-3 rounded-2xl border border-emerald-500/40 space-y-1">
            <span class="text-xs font-black text-emerald-400 block">PILLAR 1</span>
            <p class="font-extrabold text-white">ACCESS</p>
            <p class="text-[10px] text-emerald-200">Jan Aushadhi & Map</p>
          </div>
          <div class="bg-teal-950 p-3 rounded-2xl border border-teal-500/40 space-y-1">
            <span class="text-xs font-black text-teal-400 block">PILLAR 2</span>
            <p class="font-extrabold text-white">AI TRIAGE</p>
            <p class="text-[10px] text-teal-200">Risk Stratification</p>
          </div>
          <div class="bg-blue-950 p-3 rounded-2xl border border-blue-500/40 space-y-1">
            <span class="text-xs font-black text-blue-400 block">PILLAR 3</span>
            <p class="font-extrabold text-white">TELEMEDICINE</p>
            <p class="text-[10px] text-blue-200">eSanjeevani Suite</p>
          </div>
          <div class="bg-purple-950 p-3 rounded-2xl border border-purple-500/40 space-y-1">
            <span class="text-xs font-black text-purple-400 block">PILLAR 4</span>
            <p class="font-extrabold text-white">COMMUNITY</p>
            <p class="text-[10px] text-purple-200">ASHA Field App</p>
          </div>
          <div class="bg-rose-950 p-3 rounded-2xl border border-rose-500/40 space-y-1">
            <span class="text-xs font-black text-rose-400 block">PILLAR 5</span>
            <p class="font-extrabold text-white">GOVERNANCE</p>
            <p class="text-[10px] text-rose-200">AI Resource Alloc</p>
          </div>
        </div>

        <!-- 5-Min Tour Stepper Links -->
        <div class="bg-slate-800 p-4 rounded-2xl space-y-2 text-xs">
          <p class="font-bold text-amber-300 text-[11px] uppercase">Quick 5-Minute Tour Links for Judges:</p>
          <div class="flex flex-wrap gap-2">
            <button class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl" onclick="window.appState.setActiveTab('triage'); document.getElementById('modal-judge-tour').classList.add('hidden');">
              1. Try AI Triage Form →
            </button>
            <button class="bg-teal-600 hover:bg-teal-500 text-white font-bold px-3 py-1.5 rounded-xl" onclick="window.appState.setActiveTab('map'); document.getElementById('modal-judge-tour').classList.add('hidden');">
              2. Explore Healthcare Map →
            </button>
            <button class="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-xl" onclick="window.appState.setRole('asha'); window.appState.setActiveTab('asha-app'); document.getElementById('modal-judge-tour').classList.add('hidden');">
              3. Switch to ASHA Worker View →
            </button>
            <button class="bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1.5 rounded-xl" onclick="window.appState.setRole('officer'); window.appState.setActiveTab('resource-allocation'); document.getElementById('modal-judge-tour').classList.add('hidden');">
              4. View District CMO AI Engine →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Notification Center Drawer -->
    <div id="drawer-notifications" class="fixed top-16 right-4 z-50 w-80 sm:w-96 glass-card bg-slate-900 text-white border-slate-700 p-4 rounded-3xl shadow-2xl space-y-3 hidden animate-fadeIn">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 class="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-emerald-400">
          <i data-lucide="bell" class="w-4 h-4"></i> Notification Center
        </h3>
        <button id="btn-close-notif-drawer" class="text-slate-400 hover:text-white text-xs">Close</button>
      </div>

      <div class="space-y-2 max-h-80 overflow-y-auto text-xs">
        ${state.notifications.map(n => `
          <div class="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold ${n.type === 'EMERGENCY' ? 'text-rose-400' : 'text-amber-400'}">${n.title}</span>
              <span class="text-[9px] text-slate-400">${n.timestamp}</span>
            </div>
            <p class="text-[11px] text-slate-300">${n.message}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function attachModalsEvents() {
  document.getElementById('btn-close-judge-modal')?.addEventListener('click', () => {
    document.getElementById('modal-judge-tour')?.classList.add('hidden');
  });

  document.getElementById('btn-close-notif-drawer')?.addEventListener('click', () => {
    document.getElementById('drawer-notifications')?.classList.add('hidden');
  });
}
