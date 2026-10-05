/**
 * SwasthyaSetu AI - Telemedicine & Virtual Consultation Component (Requirement #9)
 */

import { state } from '../state.js';
import { TELEMEDICINE_QUEUE } from '../data/mockData.js';

export function renderTelemedicineView() {
  const isHindi = state.currentLanguage === 'hi';
  const isDoctor = state.currentRole === 'doctor';

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Title Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="video" class="w-6 h-6 text-blue-400"></i>
            ${isHindi ? 'ई-संजीवनी टेलीमेडिसिन एवं वर्जुअल कंसल्टेशन' : 'eSanjeevani Telemedicine Suite & Virtual Clinic'}
          </h1>
          <p class="text-xs text-blue-100">
            ${isHindi 
              ? 'ग्रामीण नागरिकों के लिए दूरस्थ विशेषज्ञ डॉक्टर परामर्श, डिजिटल टोकन एवं सुरक्षित इलेक्ट्रॉनिक प्रिस्क्रिप्शन' 
              : 'Direct virtual consultation connecting rural patients with specialist doctors at CHC/District Hospitals.'}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-400/30 font-bold">
            ${isDoctor ? 'Doctor Virtual Suite Active' : 'Patient Virtual Queue'}
          </span>
        </div>
      </div>

      <!-- Main Layout: Booking / Active Room / Doctor Queue -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left Column: Patient Booking / Token Form (Left 5 Cols) -->
        <div class="lg:col-span-5 glass-card p-6 space-y-4">
          <h2 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <i data-lucide="calendar-plus" class="w-4 h-4 text-blue-600"></i>
            ${isHindi ? '1. टेलीकंसल्टेशन अपॉइंटमेंट अनुरोध' : '1. Request Teleconsultation Token'}
          </h2>

          <form id="form-telemedicine-request" class="space-y-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Select Specialty (विशेषज्ञता चुनें)</label>
              <select id="tele-specialty" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="General Physician">General Physician (सामान्य चिकित्सक)</option>
                <option value="Obstetrics & Gynaecology">Obstetrics & Gynaecology (स्त्री एवं प्रसूति रोग)</option>
                <option value="Paediatrics">Paediatrics (बाल रोग विशेषज्ञ)</option>
                <option value="Cardiology">Cardiology (हृदय रोग)</option>
                <option value="Dermatology">Dermatology (त्वचा रोग)</option>
                <option value="AYUSH">AYUSH / Wellness</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Describe Health Problem / Symptoms</label>
              <textarea id="tele-problem" rows="3" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Dizziness, persistent cough for 4 days, chest tightness..."></textarea>
            </div>

            <!-- Upload Documents Placeholder -->
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Upload Medical Documents / Photos (Optional)</label>
              <div class="border-2 border-dashed border-slate-300 dark:border-slate-700 p-3 rounded-xl text-center cursor-pointer hover:border-blue-500 transition">
                <i data-lucide="upload-cloud" class="w-6 h-6 text-slate-400 mx-auto mb-1"></i>
                <span class="text-[11px] text-slate-500">Click to upload lab report or prescription photo</span>
              </div>
            </div>

            <button type="button" id="btn-request-token" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm">
              <i data-lucide="ticket" class="w-4 h-4"></i>
              ${isHindi ? 'डिजिटल टोकन प्राप्त करें' : 'Generate Consultation Token & Queue'}
            </button>
          </form>

          <!-- Emergency Alert Box -->
          <div class="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-xl text-[11px] text-rose-800 dark:text-rose-300 leading-tight">
            🚨 <strong>Emergency Notice:</strong> Telemedicine is not for acute life-threatening trauma or unconsciousness. For severe emergency, click 108 Emergency Command immediately.
          </div>
        </div>

        <!-- Right Column: Live Simulated Video Consultation Call Room (Right 7 Cols) -->
        <div class="lg:col-span-7 space-y-4">
          <div class="glass-card p-6 border-blue-500/40 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-slate-500">2. Active Consultation Room</span>
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Token #TK-2026-084 • Pooja Devi (Age 29)</h3>
              </div>
              <span class="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Consultation
              </span>
            </div>

            <!-- Video Call Container Mockup -->
            <div class="relative bg-slate-950 rounded-2xl overflow-hidden aspect-video border border-slate-800 flex items-center justify-center shadow-inner">
              <!-- Simulated Doctor Feed -->
              <div class="text-center space-y-2 p-6">
                <div class="w-20 h-20 rounded-full bg-blue-600/30 border-2 border-blue-400 mx-auto flex items-center justify-center text-white">
                  <i data-lucide="user-check" class="w-10 h-10 text-blue-300"></i>
                </div>
                <div>
                  <h4 class="font-extrabold text-white text-sm">Dr. Meenakshi Sharma (MD Gynaecology)</h4>
                  <p class="text-xs text-blue-300">CHC Bakshi Ka Talab Tele-Kiosk</p>
                </div>
                <div class="inline-flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full text-[10px] text-emerald-300 border border-emerald-500/40 font-mono">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Audio/Video Encrypted (WebRTC)
                </div>
              </div>

              <!-- Self Patient Overlay Camera View -->
              <div class="absolute bottom-3 right-3 w-28 h-20 rounded-xl bg-slate-800 border border-slate-700 p-2 flex flex-col justify-between shadow-lg">
                <span class="text-[9px] text-slate-300 font-bold">You (Bargadi)</span>
                <div class="w-6 h-6 rounded-full bg-slate-700 mx-auto flex items-center justify-center text-slate-300">
                  <i data-lucide="user" class="w-3.5 h-3.5"></i>
                </div>
                <span class="text-[8px] text-emerald-400 text-right">HD 720p</span>
              </div>
            </div>

            <!-- Doctor Electronic Prescription Builder (Doctor Console View) -->
            <div class="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <i data-lucide="file-signature" class="w-4 h-4 text-blue-600"></i>
                  Doctor e-Prescription & Follow-up Generator
                </h4>
                <span class="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded font-bold">Safe Clinical Workflow</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Prescribed Generic Medicines</label>
                  <input type="text" id="tele-prescribe-meds" value="Iron & Folic Acid Tabs 100mg (1 OD) + Paracetamol 500mg (SOS)" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5">
                </div>
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Follow-up / Referral Advice</label>
                  <input type="text" id="tele-prescribe-advice" value="ANC 3rd Checkup at CHC BKT in 14 days" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5">
                </div>
              </div>

              <button type="button" id="btn-generate-rx" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow">
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                Generate Signed e-Prescription PDF & SMS Alert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachTelemedicineEvents() {
  document.getElementById('btn-request-token')?.addEventListener('click', () => {
    const specialty = document.getElementById('tele-specialty')?.value;
    alert(`✅ Teleconsultation Token Generated!\n\nToken Number: TK-2026-089\nSpecialty: ${specialty}\nQueue Position: #2 (Est wait: 4 Mins)\n\nConnecting to duty medical officer...`);
  });

  document.getElementById('btn-generate-rx')?.addEventListener('click', () => {
    alert('📄 e-Prescription successfully generated and synced with Patient ABHA Digital Profile & Jan Aushadhi Kendra BKT!');
  });
}
