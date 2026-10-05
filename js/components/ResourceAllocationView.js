/**
 * SwasthyaSetu AI - AI Resource Allocation Engine Component (Requirement #20)
 */

import { state } from '../state.js';

export function renderResourceAllocationView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="brain-circuit" class="w-6 h-6 text-teal-400"></i>
            ${isHindi ? 'एआई जिला संसाधन आवंटन एवं सिफारिश इंजन' : 'AI District Resource Allocation & Optimization Engine'}
          </h1>
          <p class="text-xs text-teal-100">
            ${isHindi 
              ? 'दवाओं का पुनर्वितरण, अतिभारित CHC से मरीज डायवर्जन एवं प्राथमिकता स्वास्थ्य कैंप योजना' 
              : 'Prescriptive analytics recommending medicine transfer, doctor deployment & high-vulnerability village outreach.'}
          </p>
        </div>

        <span class="bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/30">
          District CMO Command Console
        </span>
      </div>

      <!-- Recommendation Cards List -->
      <div class="space-y-4">
        <!-- AI Recommendation 1 -->
        <div class="glass-card p-6 space-y-3 border-emerald-500/40">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">
                Recommendation #1: ORS Medicine Stock Transfer
              </h3>
            </div>
            <span class="badge-amber text-[10px] uppercase font-bold">AI Recommendation — Requires CMO Approval</span>
          </div>

          <p class="text-xs text-slate-600 dark:text-slate-300">
            <strong>Trigger:</strong> PHC Bargadi reports critical ORS stock (18 sachets), while CHC Bakshi Ka Talab holds surplus (350 sachets).
          </p>

          <div class="bg-emerald-50 dark:bg-emerald-950/60 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs space-y-1">
            <p class="font-bold text-emerald-900 dark:text-emerald-300">Suggested Action Plan:</p>
            <p class="text-emerald-800 dark:text-emerald-400">
              Transfer 150 ORS sachets + 100 Paracetamol strips from CHC BKT Central Store to PHC Bargadi via ASHA supply dispatch route.
            </p>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
            <span class="text-[10px] text-slate-400">Impact: Prevents dehydration shortage for 2,400 villagers</span>
            <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow" onclick="alert('✅ CMO Authorization Issued!\n\nMedicine transfer manifest #TR-2026-901 generated for CHC BKT → PHC Bargadi.')">
              Approve & Issue Dispatch Order
            </button>
          </div>
        </div>

        <!-- AI Recommendation 2 -->
        <div class="glass-card p-6 space-y-3 border-slate-200 dark:border-slate-800">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">
                Recommendation #2: Mobile Health Van Outreach Deployment
              </h3>
            </div>
            <span class="badge-amber text-[10px] uppercase font-bold">AI Recommendation — Requires CMO Approval</span>
          </div>

          <p class="text-xs text-slate-600 dark:text-slate-300">
            <strong>Trigger:</strong> Umaria Village has the lowest Bharat Health Equity Score (59/100) and missed 14 ANC checkups due to distance (7.8 km from PHC).
          </p>

          <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <p class="font-bold text-slate-900 dark:text-white">Suggested Action Plan:</p>
            <p class="text-slate-700 dark:text-slate-300">
              Deploy Mobile Tele-Diagnostic Health Van to Umaria Village on Thursday 10 AM for ANC screening and Hypertension camp.
            </p>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
            <span class="text-[10px] text-slate-400">Impact: Improves Umaria Health Equity Score from 59 to 71</span>
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow" onclick="alert('✅ Mobile Health Van Scheduled for Umaria Village on Thursday!')">
              Schedule Mobile Camp
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachResourceAllocationEvents() {}
