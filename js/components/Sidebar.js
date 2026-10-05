/**
 * SwasthyaSetu AI - Sidebar Component (Role-Aware Navigation Menu)
 */

import { state, TABS, ROLES } from '../state.js';

export function renderSidebar() {
  const currentRole = state.currentRole;
  const availableTabs = TABS.filter(tab => tab.roles.includes(currentRole));
  const roleObj = ROLES[currentRole.toUpperCase()];

  return `
    <aside id="app-sidebar" class="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between hidden lg:flex border-r border-slate-800 min-h-[calc(100vh-4rem)]">
      <!-- Role Badge Header -->
      <div class="p-4 border-b border-slate-800/80 bg-slate-950/60">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Current Role View</span>
          <span class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
            ${roleObj.badge}
          </span>
        </div>
        <h3 class="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
          <i data-lucide="user-check" class="w-4 h-4 text-emerald-400"></i>
          ${state.currentLanguage === 'hi' ? roleObj.nameHindi : roleObj.name}
        </h3>
      </div>

      <!-- Scrollable Tab Links -->
      <div class="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        <div class="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 mb-1">
          ${state.currentLanguage === 'hi' ? 'मॉड्यूल एवं सेवाएं' : 'Modules & Services'}
        </div>

        ${availableTabs.map(tab => {
          const isActive = state.activeTab === tab.id;
          const label = state.currentLanguage === 'hi' ? tab.labelHindi : tab.label;

          return `
            <button 
              data-tab-id="${tab.id}"
              class="tab-nav-btn w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/40 font-bold' 
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }"
            >
              <div class="flex items-center gap-2.5">
                <i data-lucide="${tab.icon}" class="w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}"></i>
                <span class="truncate">${label}</span>
              </div>
              ${tab.id === 'emergency' ? `
                <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              ` : ''}
              ${tab.id === 'data-sources' ? `
                <span class="text-[9px] bg-slate-800 text-slate-300 border border-slate-700 px-1.5 py-0.2 rounded font-bold">Govt</span>
              ` : ''}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Quick Action / Offline Status Footer -->
      <div class="p-3 border-t border-slate-800 bg-slate-950/40 space-y-2">
        ${currentRole === 'asha' ? `
          <div class="bg-slate-800/90 rounded-xl p-2.5 border border-slate-700">
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="text-slate-300 font-semibold flex items-center gap-1">
                <i data-lucide="${state.isOffline ? 'wifi-off' : 'wifi'}" class="w-3.5 h-3.5 ${state.isOffline ? 'text-amber-400' : 'text-emerald-400'}"></i>
                ${state.isOffline ? 'Offline Mode' : 'Online Connected'}
              </span>
              <button id="btn-toggle-offline" class="text-[10px] text-emerald-400 underline hover:text-emerald-300 font-bold">
                ${state.isOffline ? 'Sync Now' : 'Simulate Offline'}
              </button>
            </div>
            ${state.isOffline ? `
              <p class="text-[10px] text-amber-300">Queued entries: ${state.offlineQueueCount} visits saved locally.</p>
            ` : ''}
          </div>
        ` : ''}

        <!-- AI Disclaimer -->
        <div class="text-[10px] text-slate-400 px-2 py-1 leading-tight flex items-start gap-1.5 border-t border-slate-800/60 pt-2">
          <i data-lucide="shield-alert" class="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5"></i>
          <span>
            ${state.currentLanguage === 'hi' 
              ? 'एआई सहायता केवल जानकारी के लिए है, यह डॉक्टर का विकल्प नहीं है।' 
              : 'AI guidance is informational and does not replace registered medical doctors.'}
          </span>
        </div>
      </div>
    </aside>
  `;
}

export function attachSidebarEvents() {
  document.querySelectorAll('.tab-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tabId = e.currentTarget.getAttribute('data-tab-id');
      if (tabId) {
        state.setActiveTab(tabId);
      }
    });
  });

  document.getElementById('btn-toggle-offline')?.addEventListener('click', () => {
    if (state.isOffline) {
      state.syncOfflineQueue();
      alert('✅ Offline queue synced successfully with District Central Health Server!');
    } else {
      state.toggleOfflineMode();
    }
  });
}
