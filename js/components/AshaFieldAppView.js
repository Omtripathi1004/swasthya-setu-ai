/**
 * SwasthyaSetu AI - ASHA / ANM Frontline Worker Field Console
 * 
 * Mobile-First Field Encounter & Referral Workflow:
 * - Start encounter using a synthetic/non-identifying ID (e.g. ASHA-ENC-2026-XXXX).
 * - Capture structured screening vitals & maternal ANC assessment.
 * - Generate verifiable referral slip with transparent healthcare facility tier.
 * - Consent-based local in-app follow-up reminders.
 * - Offline queue drafts with reconnection sync.
 */

import { state } from '../state.js';

export function renderAshaFieldAppView() {
  const isHindi = state.currentLanguage === 'hi';
  const visits = state.ashaVisits;

  return `
    <div class="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="bg-emerald-500/30 text-emerald-200 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              ASHA / ANM Field Operations
            </span>
            <span class="text-xs text-emerald-200">Worker: Smt. Anita Devi (Bargadi Sector)</span>
          </div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2 mt-1">
            <i data-lucide="smartphone" class="w-6 h-6 text-emerald-400"></i>
            ${isHindi ? 'आशा एवं एएनएम फ़ील्ड कंसोल' : 'ASHA & Frontline Health Worker Field Console'}
          </h1>
          <p class="text-xs text-emerald-100 max-w-2xl">
            ${isHindi 
              ? 'सिंथेटिक आईडी के साथ सुरक्षित एनकाउंटर, मातृ देखभाल, टीकाकरण ट्रैकिंग, और स्थानीय ऑफ़लाइन सिंक।' 
              : 'Privacy-first field encounters with synthetic IDs, structured screening summaries & low-bandwidth offline sync.'}
          </p>
        </div>

        <button id="btn-start-field-encounter" class="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-lg transition flex items-center gap-2">
          <i data-lucide="user-plus" class="w-4 h-4"></i>
          Start New Field Encounter
        </button>
      </div>

      <!-- Offline Sync Status Banner -->
      <div class="p-4 ${state.isOffline ? 'bg-amber-950/80 border-amber-500 text-amber-100' : 'bg-slate-900 border-slate-800 text-white'} border rounded-2xl flex items-center justify-between shadow">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl ${state.isOffline ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-400'} flex items-center justify-center font-bold">
            <i data-lucide="${state.isOffline ? 'wifi-off' : 'wifi'}" class="w-5 h-5"></i>
          </div>
          <div>
            <p class="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>${state.isOffline ? 'Offline Mode Active (Local Device Queue)' : 'Online Sync Active (Connected to CHC Server)'}</span>
              ${state.isOffline ? '<span class="text-[9px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-black">LOCAL ONLY</span>' : ''}
            </p>
            <p class="text-[11px] text-slate-300">
              ${state.isOffline 
                ? `${state.offlineQueueCount} drafts stored locally on this device. Emergency alerts require phone network (108).` 
                : 'All encounter records synced with CHC Bakshi Ka Talab database.'}
            </p>
          </div>
        </div>

        <button id="btn-asha-sync-action" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition flex items-center gap-1.5">
          <i data-lucide="${state.isOffline ? 'refresh-cw' : 'toggle-left'}" class="w-3.5 h-3.5"></i>
          ${state.isOffline ? 'Sync Queue Now' : 'Simulate Low-Connectivity'}
        </button>
      </div>

      <!-- Active Encounter Creator Form (Modal / Collapsible) -->
      <div id="encounter-form-section" class="hidden glass-card p-6 border-emerald-500/50 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Privacy-First Synthetic Identification
            </span>
            <h3 class="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
              <i data-lucide="clipboard-pen" class="w-4 h-4 text-emerald-500"></i>
              Structured Beneficiary Encounter Form
            </h3>
          </div>
          <span id="synthetic-id-display" class="font-mono text-xs font-bold bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/30">
            ASHA-ENC-2026-XXXX
          </span>
        </div>

        <form id="form-asha-encounter" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Synthetic Beneficiary Initials / ID</label>
              <input type="text" id="enc-beneficiary-id" value="Patient S.D. (HH-0412)" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500">
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Encounter Category</label>
              <select id="enc-category" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white">
                <option value="Maternal ANC Checkup">Maternal ANC Follow-up</option>
                <option value="Child Immunization">Child Immunization Due</option>
                <option value="Fever / Vector Surveillance">Fever / Vector Surveillance</option>
                <option value="NCD Screening (BP/Sugar)">NCD Screening (Hypertension/Diabetes)</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Village & Hamlet</label>
              <select id="enc-village" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white">
                <option value="Bargadi (Purwa Tola)">Bargadi (Purwa Tola)</option>
                <option value="Kathvara (Main Gram)">Kathvara (Main Gram)</option>
                <option value="Mahona (West Block)">Mahona (West Block)</option>
              </select>
            </div>
          </div>

          <!-- Clinical Vitals -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">Blood Pressure</label>
              <input type="text" id="enc-bp" value="132/86" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 font-mono text-center">
            </div>
            <div>
              <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">SpO2 (%)</label>
              <input type="number" id="enc-spo2" value="97" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 font-mono text-center">
            </div>
            <div>
              <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">Hemoglobin (g/dL)</label>
              <input type="text" id="enc-hb" value="10.2" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 font-mono text-center">
            </div>
            <div>
              <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">Temp (°F)</label>
              <input type="text" id="enc-temp" value="98.6" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 font-mono text-center">
            </div>
          </div>

          <!-- Structured Screening Findings -->
          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Field Screening Summary & Clinical Notes</label>
            <textarea id="enc-notes" rows="2" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white" placeholder="Record screening observations, symptoms, nutrition status, compliance..."></textarea>
          </div>

          <!-- Referral Tier & Facility Selection -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Recommended Referral Destination</label>
              <select id="enc-referral-facility" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white">
                <option value="CHC Bakshi Ka Talab (Specialist ANC / Diagnostic OPD)">CHC Bakshi Ka Talab (Specialist ANC / Diagnostic OPD)</option>
                <option value="PHC Bargadi (Routine Consultation & IFA Refill)">PHC Bargadi (Routine Consultation & IFA Refill)</option>
                <option value="Sitapur Road District Hospital (Trauma & Critical Unit)">Sitapur Road District Hospital (Trauma & Critical Unit)</option>
                <option value="Jan Aushadhi Kendra BKT (Generic Medicines)">Jan Aushadhi Kendra BKT (Generic Medicines)</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Priority Classification</label>
              <select id="enc-priority" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white">
                <option value="MODERATE">Moderate Risk (Visit within 48h)</option>
                <option value="HIGH_RISK">High Risk (Urgent Transfer 24h)</option>
                <option value="ROUTINE">Routine Monitoring (Local Village)</option>
              </select>
            </div>
          </div>

          <!-- Consent-Based Local Follow-up Opt-in -->
          <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
              <input type="checkbox" id="enc-consent-followup" checked class="accent-emerald-600 w-4 h-4">
              <span>Patient provided consent for in-app follow-up reminder</span>
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
              <div>
                <span>Follow-up Date:</span>
                <input type="date" id="enc-followup-date" class="mt-0.5 w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-900 dark:text-white">
              </div>
              <div class="flex items-center">
                <span class="text-[10px] text-slate-500 italic">
                  Note: Stored as local in-app reminder. No external SMS notification without patient opt-in.
                </span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button type="button" id="btn-cancel-encounter" class="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold transition">
              Cancel
            </button>
            <button type="button" id="btn-save-encounter" class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold px-5 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2">
              <i data-lucide="check" class="w-4 h-4"></i>
              Save Encounter & Generate Referral Slip
            </button>
          </div>
        </form>
      </div>

      <!-- Generated Referral Slip Preview Container -->
      <div id="referral-slip-container" class="hidden"></div>

      <!-- Household Visit Queue -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="calendar-check" class="w-4 h-4 text-emerald-600"></i>
            Assigned Household Encounters & Queue (${visits.length})
          </h2>
          <span class="text-xs text-slate-500">Bargadi & Kathvara Sectors</span>
        </div>

        <div class="space-y-3" id="visits-list-container">
          ${visits.map(v => `
            <div class="glass-card p-4 space-y-3 border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                    v.priority === 'HIGH_RISK' ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300' : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                  }">
                    ${v.priority}
                  </span>
                  <h3 class="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
                    ${v.patientName} (${v.headName})
                  </h3>
                  <p class="text-[11px] text-slate-500">
                    Synthetic Household ID: <span class="font-mono text-emerald-600">${v.householdId}</span> • Village: ${v.village}
                  </p>
                </div>

                <span class="badge-blue text-[10px] font-bold">${v.status}</span>
              </div>

              <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <p class="font-bold text-emerald-800 dark:text-emerald-300">Visit Type: ${v.visitType}</p>
                <p class="text-slate-600 dark:text-slate-300 text-[11px]">${v.riskReason}</p>
              </div>

              <div class="flex items-center justify-between pt-1">
                <span class="text-[10px] text-slate-400">Assigned: ${v.assignedAsha}</span>
                <button class="btn-log-visit bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition" data-id="${v.id}" data-name="${v.patientName}">
                  Log Completed & Save Vitals
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
  const startEncounterBtn = document.getElementById('btn-start-field-encounter');
  const formSection = document.getElementById('encounter-form-section');
  const cancelBtn = document.getElementById('btn-cancel-encounter');
  const saveBtn = document.getElementById('btn-save-encounter');
  const syncBtn = document.getElementById('btn-asha-sync-action');
  const slipContainer = document.getElementById('referral-slip-container');
  const idDisplay = document.getElementById('synthetic-id-display');

  // Set default follow-up date to 7 days from now
  const dateInput = document.getElementById('enc-followup-date');
  if (dateInput) {
    const future = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    dateInput.value = future.toISOString().split('T')[0];
  }

  let currentSyntheticId = '';

  const generateSyntheticId = () => {
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `ASHA-ENC-2026-${rand}`;
  };

  startEncounterBtn?.addEventListener('click', () => {
    currentSyntheticId = generateSyntheticId();
    if (idDisplay) idDisplay.innerText = currentSyntheticId;
    if (formSection) {
      formSection.classList.remove('hidden');
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  cancelBtn?.addEventListener('click', () => {
    if (formSection) formSection.classList.add('hidden');
  });

  saveBtn?.addEventListener('click', () => {
    const benId = document.getElementById('enc-beneficiary-id')?.value || 'Beneficiary S.D.';
    const category = document.getElementById('enc-category')?.value || 'Maternal ANC';
    const village = document.getElementById('enc-village')?.value || 'Bargadi';
    const facility = document.getElementById('enc-referral-facility')?.value || 'CHC Bakshi Ka Talab';
    const priority = document.getElementById('enc-priority')?.value || 'MODERATE';
    const bp = document.getElementById('enc-bp')?.value || '120/80';
    const hb = document.getElementById('enc-hb')?.value || '10.2';
    const notes = document.getElementById('enc-notes')?.value || 'Routine maternal checkup.';
    const consent = document.getElementById('enc-consent-followup')?.checked;
    const fDate = document.getElementById('enc-followup-date')?.value || '2026-10-22';

    // Add to global state
    state.addAshaVisit({
      patientName: benId,
      headName: 'Synthetic HH Member',
      village: village,
      householdId: `HH-${Math.floor(100 + Math.random() * 900)}`,
      visitType: category,
      priority: priority,
      riskReason: `BP: ${bp}, Hb: ${hb} g/dL. Referral: ${facility}. Notes: ${notes}`,
      assignedAsha: 'Anita Devi',
      status: state.isOffline ? 'Local Draft (Pending Sync)' : 'Completed & Synced'
    });

    // Generate Printable Referral Slip
    if (slipContainer) {
      slipContainer.className = 'glass-card p-6 border-2 border-emerald-500 rounded-3xl space-y-4 bg-white dark:bg-slate-900 shadow-xl';
      slipContainer.innerHTML = `
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              SS
            </div>
            <div>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">SwasthyaSetu AI — Frontline Referral Slip</h3>
              <p class="text-[10px] text-slate-500">Government Health Mission • Primary Care Navigation</p>
            </div>
          </div>
          <span class="font-mono text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded border border-emerald-300">
            ${currentSyntheticId || 'ASHA-ENC-2026'}
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-xs">
          <div>
            <span class="text-slate-400 text-[10px]">Beneficiary ID:</span>
            <p class="font-bold text-slate-800 dark:text-slate-200">${benId}</p>
          </div>
          <div>
            <span class="text-slate-400 text-[10px]">Village & Sector:</span>
            <p class="font-bold text-slate-800 dark:text-slate-200">${village}</p>
          </div>
          <div>
            <span class="text-slate-400 text-[10px]">Vitals Recorded:</span>
            <p class="font-bold text-slate-800 dark:text-slate-200">BP: ${bp} • Hb: ${hb}g/dL</p>
          </div>
          <div>
            <span class="text-slate-400 text-[10px]">Priority Tier:</span>
            <p class="font-extrabold ${priority === 'HIGH_RISK' ? 'text-rose-600' : 'text-amber-500'}">${priority}</p>
          </div>
        </div>

        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-1 text-xs">
          <p class="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-300">Referred Facility</p>
          <p class="font-extrabold text-slate-900 dark:text-white text-sm">${facility}</p>
          <p class="text-[11px] text-slate-600 dark:text-slate-300">Reason: ${notes}</p>
        </div>

        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <span>${consent ? `Consent-based follow-up scheduled: <strong>${fDate}</strong> (Local in-app reminder)` : 'No external follow-up scheduled.'}</span>
          <span class="text-[10px] font-mono">Sync Status: ${state.isOffline ? 'Stored Locally' : 'Synced'}</span>
        </div>

        <div class="p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg text-[10px] text-amber-800 dark:text-amber-300">
          ⚠️ <strong>Field Slip Notice:</strong> This referral slip is generated by ASHA field worker decision support for administrative care navigation. It does not replace a doctor's prescription.
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-3 py-1.5 rounded-lg text-xs" onclick="window.print()">
            Print Slip
          </button>
          <button class="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs" onclick="document.getElementById('referral-slip-container').classList.add('hidden')">
            Close Slip
          </button>
        </div>
      `;
      slipContainer.classList.remove('hidden');
      slipContainer.scrollIntoView({ behavior: 'smooth' });
    }

    if (formSection) formSection.classList.add('hidden');
    if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
  });

  syncBtn?.addEventListener('click', () => {
    if (state.isOffline) {
      state.syncOfflineQueue();
      alert('✅ Reconnection Sync Successful: Local offline queue synced with CHC Bakshi Ka Talab database.');
    } else {
      state.toggleOfflineMode();
    }
  });

  document.querySelectorAll('.btn-log-visit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = e.target.getAttribute('data-name');
      alert(`✅ Encounter logged for ${name}. Vitals and screening notes saved.`);
    });
  });
}
