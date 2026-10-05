/**
 * SwasthyaSetu AI - Header Component with Navigation, Role Switcher, Region Cascade, Language & Notifications
 */

import { state, ROLES } from '../state.js';
import { REGIONAL_HIERARCHY } from '../data/mockData.js';

export function renderHeader() {
  const currentRole = ROLES[state.currentRole.toUpperCase()] || ROLES.PATIENT;
  const unreadNotifs = state.notifications.filter(n => !n.read).length;
  
  const upState = REGIONAL_HIERARCHY.states[0];
  const lkoDistrict = upState.districts[0];
  const blocks = lkoDistrict.blocks;

  return `
    <header class="glass-header sticky top-0 z-40 transition-colors">
      <!-- Hackathon Top Demo Mode Notification Banner -->
      <div class="bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-800 text-white text-xs py-1.5 px-4 flex items-center justify-between shadow-inner">
        <div class="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span class="bg-white/20 text-white px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
            <i data-lucide="sparkles" class="w-3 h-3"></i> Hackathon Demo Mode
          </span>
          <span class="font-medium text-emerald-100">
            ${state.currentLanguage === 'hi' 
              ? 'स्वास्थसेतु AI — भारत का ग्रामीण एवं टियर 3/4 स्वास्थ्य प्लेटफॉर्म (उत्तर प्रदेश / लखनऊ लाइव)' 
              : 'SwasthyaSetu AI — Bharat’s Rural & Tier-3/4 Healthcare Intelligence Platform'}
          </span>
        </div>
        <div class="flex items-center gap-3">
          <button id="btn-judge-tour" class="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-2.5 py-0.5 rounded text-[11px] transition shadow flex items-center gap-1">
            <i data-lucide="award" class="w-3.5 h-3.5"></i> Judge 5-Min Tour
          </button>
          <span class="hidden md:inline-block text-[11px] text-emerald-200 border-l border-white/20 pl-3">
            Theme: "Healthcare for Every Individual"
          </span>
        </div>
      </div>

      <!-- Main Header Navigation -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <!-- Logo and Title -->
        <div class="flex items-center gap-3">
          <button id="btn-toggle-mobile-menu" class="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <i data-lucide="menu" class="w-6 h-6"></i>
          </button>

          <div class="flex items-center gap-2.5 cursor-pointer" id="btn-logo-home">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <i data-lucide="cross" class="w-6 h-6 stroke-[2.5]"></i>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">Swasthya<span class="text-emerald-600 dark:text-emerald-400">Setu</span></span>
                <span class="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded">AI</span>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-none">
                ${state.currentLanguage === 'hi' ? 'हर गांव, परिवार और नागरिक तक स्वास्थ्य सुरक्षा' : 'Healthcare access for every village & individual'}
              </p>
            </div>
          </div>
        </div>

        <!-- Geographic Cascade Region Selector (State -> District -> Block -> Village) -->
        <div class="hidden xl:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs">
          <i data-lucide="map-pin" class="w-4 h-4 text-emerald-600 dark:text-emerald-400 ml-1"></i>
          
          <select id="select-state" class="bg-transparent font-medium text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer">
            <option value="UP">Uttar Pradesh</option>
          </select>
          <span class="text-slate-400">/</span>

          <select id="select-district" class="bg-transparent font-semibold text-slate-800 dark:text-slate-100 focus:outline-none cursor-pointer">
            <option value="LKO">Lucknow</option>
            <option value="SIT">Sitapur</option>
          </select>
          <span class="text-slate-400">/</span>

          <select id="select-block" class="bg-transparent font-medium text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer">
            ${blocks.map(b => `<option value="${b.id}" ${state.selectedBlock === b.id ? 'selected' : ''}>${b.name}</option>`).join('')}
          </select>
          <span class="text-slate-400">/</span>

          <select id="select-village" class="bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/60 focus:outline-none cursor-pointer">
            <option value="VIL_01" ${state.selectedVillage === 'VIL_01' ? 'selected' : ''}>Bargadi (Pop: 3.8k)</option>
            <option value="VIL_02" ${state.selectedVillage === 'VIL_02' ? 'selected' : ''}>Kathvara (Pop: 4.2k)</option>
            <option value="VIL_03" ${state.selectedVillage === 'VIL_03' ? 'selected' : ''}>Mahona (Pop: 5.1k)</option>
            <option value="VIL_04" ${state.selectedVillage === 'VIL_04' ? 'selected' : ''}>Umaria (Pop: 2.9k)</option>
          </select>
        </div>

        <!-- Role Selector & Tools -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Role Switcher Dropdown -->
          <div class="relative">
            <select id="select-user-role" class="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs px-3 py-2 rounded-xl shadow-sm hover:shadow-md cursor-pointer border border-emerald-500 focus:outline-none">
              ${Object.values(ROLES).map(r => `
                <option value="${r.id}" ${state.currentRole === r.id ? 'selected' : ''} class="bg-slate-900 text-white py-1">
                  👤 ${state.currentLanguage === 'hi' ? r.nameHindi : r.name}
                </option>
              `).join('')}
            </select>
          </div>

          <!-- Language Selector Switcher (English / Hindi) -->
          <button id="btn-toggle-lang" class="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 transition flex items-center gap-1.5">
            <i data-lucide="languages" class="w-4 h-4 text-emerald-600"></i>
            <span>${state.currentLanguage === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          <!-- Notifications Bell -->
          <button id="btn-notifications-drawer" class="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition">
            <i data-lucide="bell" class="w-5 h-5"></i>
            ${unreadNotifs > 0 ? `
              <span class="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 animate-pulse">
                ${unreadNotifs}
              </span>
            ` : ''}
          </button>

          <!-- Dark Mode Toggle -->
          <button id="btn-toggle-theme" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition">
            <i data-lucide="sun-moon" class="w-5 h-5 text-amber-500"></i>
          </button>
        </div>
      </div>
    </header>
  `;
}

export function attachHeaderEvents() {
  document.getElementById('select-user-role')?.addEventListener('change', (e) => {
    state.setRole(e.target.value);
  });

  document.getElementById('btn-toggle-lang')?.addEventListener('click', () => {
    state.setLanguage(state.currentLanguage === 'en' ? 'hi' : 'en');
  });

  document.getElementById('select-village')?.addEventListener('change', (e) => {
    state.setRegion('UP', 'LKO', 'BKT', e.target.value);
  });

  document.getElementById('select-block')?.addEventListener('change', (e) => {
    state.setRegion('UP', 'LKO', e.target.value, 'VIL_01');
  });

  document.getElementById('btn-toggle-theme')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });

  document.getElementById('btn-logo-home')?.addEventListener('click', () => {
    state.setActiveTab('dashboard');
  });

  document.getElementById('btn-judge-tour')?.addEventListener('click', () => {
    const modal = document.getElementById('modal-judge-tour');
    if (modal) modal.classList.remove('hidden');
  });

  document.getElementById('btn-notifications-drawer')?.addEventListener('click', () => {
    const drawer = document.getElementById('drawer-notifications');
    if (drawer) drawer.classList.toggle('hidden');
  });

  document.getElementById('btn-toggle-mobile-menu')?.addEventListener('click', () => {
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar) sidebar.classList.toggle('hidden');
  });
}
