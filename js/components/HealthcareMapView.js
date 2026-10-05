/**
 * SwasthyaSetu AI - Rural Healthcare Access Map Component (Requirement #8)
 */

import { state } from '../state.js';
import { HEALTHCARE_FACILITIES } from '../data/mockData.js';

export function renderHealthcareMapView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-4 animate-fadeIn">
      <!-- Top Map Header -->
      <div class="glass-card p-4 sm:p-6 bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="map-pin" class="w-6 h-6 text-teal-400"></i>
            ${isHindi ? 'ग्रामीण स्वास्थ्य केंद्र मानचित्र एवं सुविधा लोकेटर' : 'Rural Healthcare Access Map & Facility Intelligence'}
          </h1>
          <p class="text-xs text-teal-100">
            ${isHindi 
              ? 'बख्शी का तालाब एवं लखनऊ जिले के PHC, CHC, जिला अस्पताल, एम्बुलेंस बिंदु एवं जन औषधि केंद्र' 
              : 'Interactive spatial directory of PHCs, CHCs, District Hospitals, Telemedicine hubs & Jan Aushadhi stores.'}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 font-semibold">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            ${state.facilities.length} Verified Facilities
          </span>
        </div>
      </div>

      <!-- Filter Chips Bar -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span class="font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 flex-shrink-0">
          <i data-lucide="filter" class="w-3.5 h-3.5"></i> Filters:
        </span>

        <button data-map-filter="ALL" class="map-filter-chip bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-full shadow transition whitespace-nowrap">
          All Facilities (${state.facilities.length})
        </button>
        <button data-map-filter="PHC" class="map-filter-chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-full hover:bg-emerald-100 border border-slate-200 dark:border-slate-700 transition whitespace-nowrap">
          🏥 Primary Health Centres (PHC)
        </button>
        <button data-map-filter="CHC" class="map-filter-chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-full hover:bg-emerald-100 border border-slate-200 dark:border-slate-700 transition whitespace-nowrap">
          🏛️ Community Health Centres (CHC)
        </button>
        <button data-map-filter="Hospital" class="map-filter-chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-full hover:bg-emerald-100 border border-slate-200 dark:border-slate-700 transition whitespace-nowrap">
          🏥 District Hospitals
        </button>
        <button data-map-filter="Pharmacy" class="map-filter-chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-full hover:bg-emerald-100 border border-slate-200 dark:border-slate-700 transition whitespace-nowrap">
          💊 Jan Aushadhi Stores
        </button>
        <button data-map-filter="Telemedicine" class="map-filter-chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-full hover:bg-emerald-100 border border-slate-200 dark:border-slate-700 transition whitespace-nowrap">
          💻 Telemedicine Kiosks
        </button>
      </div>

      <!-- Map & List Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Leaflet Map Box (Left 8 Cols) -->
        <div class="lg:col-span-8 glass-card rounded-3xl overflow-hidden border-slate-200 dark:border-slate-800 relative min-h-[480px]">
          <div id="leaflet-map-container" class="w-full h-full min-h-[480px] z-10"></div>
          
          <!-- Floating Legend -->
          <div class="absolute bottom-4 left-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-[10px] space-y-1 shadow-lg">
            <p class="font-bold text-slate-800 dark:text-white uppercase tracking-wider">Map Legend</p>
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-emerald-600"></span> PHC Bargadi (Primary)</div>
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-teal-600"></span> CHC BKT (Community)</div>
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-blue-600"></span> District Hospital</div>
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-amber-500"></span> Jan Aushadhi Pharmacy</div>
          </div>
        </div>

        <!-- Facility Cards List (Right 4 Cols) -->
        <div id="facility-cards-list" class="lg:col-span-4 space-y-3 max-h-[520px] overflow-y-auto pr-1">
          ${HEALTHCARE_FACILITIES.map(f => `
            <div class="glass-card p-4 hover:border-emerald-500 transition cursor-pointer space-y-2 border-slate-200 dark:border-slate-800" onclick="window.focusMapFacility('${f.id}')">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                    f.type === 'CHC' ? 'bg-teal-100 text-teal-800' :
                    f.type === 'PHC' ? 'bg-emerald-100 text-emerald-800' :
                    f.type === 'Pharmacy' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }">
                    ${f.typeLabel}
                  </span>
                  <h3 class="text-xs font-extrabold text-slate-900 dark:text-white mt-1">${f.name}</h3>
                </div>
                <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">${f.distanceKm} km</span>
              </div>

              <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">${f.address}</p>

              <!-- Travel & Beds Info -->
              <div class="grid grid-cols-2 gap-2 text-[10px] bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                <div>
                  <span class="text-slate-400">Travel Time:</span>
                  <p class="font-bold text-slate-800 dark:text-slate-200">⏱️ ${f.travelTimeMins} Mins</p>
                </div>
                <div>
                  <span class="text-slate-400">Beds Available:</span>
                  <p class="font-bold text-emerald-600 dark:text-emerald-400">🛏️ ${f.bedsAvailable} / ${f.bedsTotal}</p>
                </div>
              </div>

              <!-- Services Tags -->
              <div class="flex flex-wrap gap-1 pt-1">
                ${f.services.slice(0, 3).map(s => `<span class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[9px] px-1.5 py-0.2 rounded font-medium">${s}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function attachHealthcareMapEvents() {
  // Initialize Leaflet Map
  if (typeof L !== 'undefined') {
    setTimeout(() => {
      const mapContainer = document.getElementById('leaflet-map-container');
      if (!mapContainer || mapContainer._leaflet_id) return;

      const map = L.map('leaflet-map-container').setView([26.9745, 80.9331], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      window.leafletMapInstance = map;

      // Add Markers for Facilities
      HEALTHCARE_FACILITIES.forEach(f => {
        const marker = L.marker([f.latitude, f.longitude]).addTo(map);
        marker.bindPopup(`
          <div style="font-family: sans-serif;">
            <strong style="color: #059669; font-size: 13px;">${f.name}</strong><br/>
            <span style="font-size: 11px; color: #475569;">${f.typeLabel} • ${f.distanceKm} km away</span><br/>
            <span style="font-size: 11px; color: #16a34a; font-weight: bold;">Status: ${f.status}</span><br/>
            <span style="font-size: 11px;">📞 ${f.contact}</span>
          </div>
        `);
      });

      window.focusMapFacility = (facilityId) => {
        const target = HEALTHCARE_FACILITIES.find(fac => fac.id === facilityId);
        if (target && window.leafletMapInstance) {
          window.leafletMapInstance.flyTo([target.latitude, target.longitude], 14, { duration: 1.5 });
        }
      };
    }, 100);
  }

  // Filter Chip Event Listeners
  document.querySelectorAll('.map-filter-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.map-filter-chip').forEach(b => {
        b.className = 'map-filter-chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-full hover:bg-emerald-100 border border-slate-200 dark:border-slate-700 transition whitespace-nowrap';
      });
      e.target.className = 'map-filter-chip bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-full shadow transition whitespace-nowrap';
    });
  });
}
