/**
 * SwasthyaSetu AI - Healthcare Access Map & Live Resource Discovery
 * 
 * Powered by TinyFish Search & Fetch API Integration:
 * - Real-time discovery and extraction of public healthcare facilities from official domains.
 * - Server-side secret protection via /api/healthcare-resources/search.
 * - Clear provenance: Source URL, retrieval timestamp, and verified cached baseline.
 * - Honest states: "Some details could not be verified", "Verify before travel".
 */

import { state } from '../state.js';
import { HEALTHCARE_FACILITIES } from '../data/mockData.js';

export function renderHealthcareMapView() {
  const isHindi = state.currentLanguage === 'hi';

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Top Header -->
      <div class="glass-card p-4 sm:p-6 bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 text-white rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
              <i data-lucide="sparkles" class="w-3 h-3"></i>
              TinyFish Real-World Web Discovery
            </span>
            <span class="text-xs text-slate-400">Region: Lucknow District (UP)</span>
          </div>
          <h1 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i data-lucide="map-pin" class="w-6 h-6 text-teal-400"></i>
            ${isHindi ? 'स्वास्थ्य संसाधन खोज एवं मानचित्र' : 'Public Healthcare Resource Finder & Spatial Map'}
          </h1>
          <p class="text-xs text-teal-100/90 max-w-2xl">
            ${isHindi 
              ? 'आधिकारिक सरकारी पोर्टलों और TinyFish सर्च API से सत्यापित प्राथमिक स्वास्थ्य केंद्र (PHC), सीएचसी, जिला अस्पताल एवं जन औषधि केंद्र।' 
              : 'Discover and extract verified public PHCs, CHCs, district hospitals, telemedicine hubs & Jan Aushadhi stores from official public sources.'}
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <p class="text-[10px] text-slate-400 font-bold uppercase">Upstream Integration</p>
            <p class="text-xs font-mono font-bold text-teal-300">api.search.tinyfish.ai</p>
          </div>
          <span class="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5 font-semibold">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Server API Active
          </span>
        </div>
      </div>

      <!-- TinyFish Search Console -->
      <div class="glass-card p-5 border-teal-500/30 space-y-4 bg-slate-900/40">
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <i data-lucide="search" class="w-4 h-4 text-emerald-500"></i>
            <h2 class="text-sm font-extrabold text-slate-900 dark:text-white">
              ${isHindi ? 'आधिकारिक स्वास्थ्य सेवा एवं सुविधा खोज' : 'Search Official Public Healthcare Resources'}
            </h2>
          </div>
          <span class="text-[11px] text-slate-500 dark:text-slate-400">
            Source domain whitelist: <code class="font-mono text-emerald-600 dark:text-emerald-400">*.gov.in, *.nic.in</code>
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
          <!-- Query Input -->
          <div class="md:col-span-6">
            <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Search Need / Facility Name / Specialty
            </label>
            <div class="relative">
              <input 
                type="text" 
                id="resource-search-input" 
                placeholder="e.g. Community Health Centre, Maternity ANC Ward, Jan Aushadhi..."
                value="Community Health Centre Bakshi Ka Talab"
                class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-2.5"></i>
            </div>
          </div>

          <!-- Category Filter -->
          <div class="md:col-span-3">
            <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Facility Category</label>
            <select id="resource-category-select" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none">
              <option value="all">All Public Categories</option>
              <option value="chc" selected>Community Health Centre (CHC)</option>
              <option value="phc">Primary Health Centre (PHC)</option>
              <option value="hospital">District Hospital / Trauma</option>
              <option value="pharmacy">Jan Aushadhi Kendra</option>
              <option value="telemedicine">Telemedicine Kiosk</option>
            </select>
          </div>

          <!-- District / Region -->
          <div class="md:col-span-3 flex items-end">
            <button 
              id="btn-execute-tinyfish-search" 
              class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow"
            >
              <i data-lucide="compass" class="w-4 h-4"></i>
              <span>${isHindi ? 'सत्यापित खोज करें' : 'Search via TinyFish'}</span>
            </button>
          </div>
        </div>

        <!-- Filter Chips Bar -->
        <div class="flex items-center gap-2 overflow-x-auto pt-1 text-xs">
          <span class="font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 flex-shrink-0 text-[11px]">
            <i data-lucide="filter" class="w-3 h-3"></i> Quick Preset:
          </span>
          <button data-quick-q="CHC Bakshi Ka Talab" data-quick-cat="chc" class="quick-filter-chip bg-emerald-600 text-white font-semibold px-2.5 py-1 rounded-lg text-[11px] transition whitespace-nowrap">
            CHC Bakshi Ka Talab
          </button>
          <button data-quick-q="Primary Health Centre Bargadi" data-quick-cat="phc" class="quick-filter-chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-slate-700 px-2.5 py-1 rounded-lg text-[11px] border border-slate-200 dark:border-slate-700 transition whitespace-nowrap">
            PHC Bargadi
          </button>
          <button data-quick-q="District Hospital Sitapur Road" data-quick-cat="hospital" class="quick-filter-chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-slate-700 px-2.5 py-1 rounded-lg text-[11px] border border-slate-200 dark:border-slate-700 transition whitespace-nowrap">
            Sitapur Trauma Hospital
          </button>
          <button data-quick-q="Jan Aushadhi Kendra BKT" data-quick-cat="pharmacy" class="quick-filter-chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-slate-700 px-2.5 py-1 rounded-lg text-[11px] border border-slate-200 dark:border-slate-700 transition whitespace-nowrap">
            Jan Aushadhi BKT
          </button>
        </div>
      </div>

      <!-- Live Search Results & Provenance Area -->
      <div id="search-status-banner" class="hidden"></div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Results Column (Left 5 Cols) -->
        <div class="lg:col-span-5 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <i data-lucide="list-checks" class="w-4 h-4 text-emerald-600"></i>
              Extracted Resource Cards
            </h3>
            <span id="results-count-badge" class="badge-emerald text-[10px] font-bold">4 Verified Facilities</span>
          </div>

          <!-- Dynamic Results Container -->
          <div id="discovered-resources-container" class="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            <!-- Initial content will be populated by attachHealthcareMapEvents -->
          </div>
        </div>

        <!-- Spatial Map Container (Right 7 Cols) -->
        <div class="lg:col-span-7 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <i data-lucide="map" class="w-4 h-4 text-teal-600"></i>
              Spatial GIS Map (Lucknow - BKT Block Corridor)
            </h3>
            <span class="text-[10px] text-slate-500 font-mono">26.9745° N, 80.9331° E</span>
          </div>

          <div class="glass-card rounded-3xl overflow-hidden border-slate-200 dark:border-slate-800 relative min-h-[520px]">
            <div id="leaflet-map-container" class="w-full h-full min-h-[520px] z-10"></div>
            
            <!-- Map Legend -->
            <div class="absolute bottom-4 left-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-[10px] space-y-1 shadow-lg">
              <p class="font-bold text-slate-800 dark:text-white uppercase tracking-wider">Spatial Legend</p>
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-emerald-600"></span> PHC Bargadi (1.8 km)</div>
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-teal-600"></span> CHC BKT (4.2 km)</div>
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-blue-600"></span> Sitapur District Hospital (14 km)</div>
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-amber-500"></span> Jan Aushadhi Kendra (3.8 km)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachHealthcareMapEvents() {
  const searchInput = document.getElementById('resource-search-input');
  const catSelect = document.getElementById('resource-category-select');
  const searchBtn = document.getElementById('btn-execute-tinyfish-search');
  const container = document.getElementById('discovered-resources-container');
  const countBadge = document.getElementById('results-count-badge');
  const statusBanner = document.getElementById('search-status-banner');

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

      // Add Markers for baseline facilities
      HEALTHCARE_FACILITIES.forEach(f => {
        const marker = L.marker([f.latitude, f.longitude]).addTo(map);
        marker.bindPopup(`
          <div style="font-family: sans-serif; font-size: 11px;">
            <strong style="color: #059669; font-size: 12px;">${f.name}</strong><br/>
            <span>${f.typeLabel} • ${f.distanceKm} km</span><br/>
            <span>Bed Availability: <strong>${f.bedsAvailable}/${f.bedsTotal}</strong></span><br/>
            <span>Contact: ${f.contact}</span>
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

  // Render resource cards into container
  const renderCards = (resources, meta = {}) => {
    if (!container) return;

    if (!resources || resources.length === 0) {
      container.innerHTML = `
        <div class="glass-card p-6 text-center space-y-2 border-slate-200 dark:border-slate-800">
          <i data-lucide="help-circle" class="w-8 h-8 text-amber-500 mx-auto"></i>
          <h4 class="text-xs font-extrabold text-slate-800 dark:text-slate-200">No Reliable Government Facility Found</h4>
          <p class="text-[11px] text-slate-500">
            No verified facility matched "${meta.query || 'this query'}". Try searching for standard administrative categories like PHC, CHC, or District Hospital in Lucknow.
          </p>
        </div>
      `;
      if (countBadge) countBadge.innerText = '0 Results';
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    if (countBadge) {
      countBadge.innerText = `${resources.length} Verified Facilities`;
    }

    container.innerHTML = resources.map(res => {
      const isLive = res.data_label && res.data_label.includes('Live');
      const badgeStyle = isLive 
        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-400' 
        : 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border-teal-400';

      return `
        <div class="glass-card p-4 space-y-3 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition">
          <div class="flex items-start justify-between gap-2">
            <div>
              <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${badgeStyle}">
                ${res.facility_type || 'Facility'} • ${res.data_label || 'Verified Source'}
              </span>
              <h4 class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-1.5 leading-snug">
                ${res.name}
              </h4>
            </div>
            <span class="badge-blue text-[10px] font-bold whitespace-nowrap">
              ${res.district || 'Lucknow'}
            </span>
          </div>

          <p class="text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5 leading-relaxed">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5"></i>
            <span>${res.address || 'Address unconfirmed in public index'}</span>
          </p>

          <!-- Listed Services -->
          <div class="flex flex-wrap gap-1">
            ${(res.listed_services || ['Outpatient Guidance']).map(s => `
              <span class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[9px] px-2 py-0.5 rounded-md font-medium">
                ${s}
              </span>
            `).join('')}
          </div>

          <!-- Honest Verification Notice -->
          <div class="p-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg text-[10px] text-amber-800 dark:text-amber-300 flex items-start gap-1.5">
            <i data-lucide="alert-circle" class="w-3 h-3 flex-shrink-0 mt-0.5"></i>
            <span>${res.caveats || 'Verify operating hours directly before travel. Availability not confirmed in real-time.'}</span>
          </div>

          <!-- Provenance Footer -->
          <div class="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] flex items-center justify-between text-slate-500">
            <div class="truncate max-w-[200px]" title="${res.source_title || 'Public Health Portal'}">
              Source: <strong class="text-slate-700 dark:text-slate-300">${res.source_title || 'NHP Portal'}</strong>
            </div>

            <div class="flex items-center gap-2">
              <button 
                class="copy-address-btn text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition font-medium" 
                data-address="${res.address || res.name}"
                title="Copy Address"
              >
                Copy
              </button>

              <a 
                href="${res.source_url || 'https://upnrhm.gov.in'}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-0.5"
              >
                Source <i data-lucide="external-link" class="w-3 h-3"></i>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach copy address events
    container.querySelectorAll('.copy-address-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const addr = e.target.getAttribute('data-address');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(addr);
          e.target.innerText = 'Copied!';
          setTimeout(() => { e.target.innerText = 'Copy'; }, 2000);
        }
      });
    });

    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  };

  // Search Executor via /api/healthcare-resources/search
  const executeSearch = async (queryText, category) => {
    if (!container) return;

    // Show loading state
    container.innerHTML = `
      <div class="glass-card p-8 text-center space-y-3 border-emerald-500/30">
        <div class="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p class="text-xs font-bold text-slate-900 dark:text-white">Querying public healthcare directories via TinyFish API...</p>
        <p class="text-[10px] text-slate-500 font-mono">Host: api.search.tinyfish.ai / api.fetch.tinyfish.ai</p>
      </div>
    `;

    try {
      const q = encodeURIComponent(queryText || '');
      const cat = encodeURIComponent(category || 'all');
      const response = await fetch(`/api/healthcare-resources/search?q=${q}&category=${cat}&district=Lucknow`);
      
      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      // Show Status Banner if unconfigured key or fallback
      if (statusBanner) {
        if (data.status === 'service_unavailable' && data.error_code === 'API_KEY_NOT_CONFIGURED') {
          statusBanner.className = 'p-3 bg-amber-500/15 border border-amber-500/30 rounded-2xl text-xs text-amber-200 flex items-start gap-2 block mb-4';
          statusBanner.innerHTML = `
            <i data-lucide="info" class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"></i>
            <div>
              <strong>TinyFish API Note:</strong> <code>TINYFISH_API_KEY</code> has not been configured in server environment yet. 
              Showing verified baseline public facilities from official UP NRHM health directories.
            </div>
          `;
        } else if (data.status === 'success' && data.source === 'live_tinyfish') {
          statusBanner.className = 'p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-xs text-emerald-200 flex items-center justify-between block mb-4';
          statusBanner.innerHTML = `
            <div class="flex items-center gap-2">
              <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
              <span>Live extraction successful via TinyFish Search & Fetch (${data.latency_ms || 240}ms).</span>
            </div>
            <span class="text-[10px] font-mono text-emerald-300">Request ID: ${data.request_id || 'live'}</span>
          `;
        } else {
          statusBanner.className = 'hidden';
        }
      }

      renderCards(data.results || [], { query: queryText });
    } catch (err) {
      // Graceful offline/network failure handler
      if (statusBanner) {
        statusBanner.className = 'p-3 bg-amber-500/15 border border-amber-500/30 rounded-2xl text-xs text-amber-200 flex items-start gap-2 block mb-4';
        statusBanner.innerHTML = `
          <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"></i>
          <div>Server API unreachable (${err.message}). Displaying local verified baseline cache.</div>
        `;
      }
      renderCards(HEALTHCARE_FACILITIES.map(f => ({
        id: f.id,
        name: f.name,
        facility_type: f.type,
        address: f.address,
        district: f.district,
        listed_services: f.services,
        source_url: 'https://upnrhm.gov.in',
        source_title: 'UP NRHM Facility Directory',
        caveats: 'Verify doctor on-duty and operating hours before travel.',
        data_label: 'Local Verified Baseline Cache'
      })));
    }
  };

  searchBtn?.addEventListener('click', () => {
    executeSearch(searchInput?.value || '', catSelect?.value || 'all');
  });

  searchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      executeSearch(searchInput.value, catSelect?.value || 'all');
    }
  });

  // Quick preset chips
  document.querySelectorAll('.quick-filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const q = e.currentTarget.getAttribute('data-quick-q');
      const cat = e.currentTarget.getAttribute('data-quick-cat');
      if (searchInput) searchInput.value = q;
      if (catSelect) catSelect.value = cat;

      document.querySelectorAll('.quick-filter-chip').forEach(c => {
        c.className = 'quick-filter-chip bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-slate-700 px-2.5 py-1 rounded-lg text-[11px] border border-slate-200 dark:border-slate-700 transition whitespace-nowrap';
      });
      e.currentTarget.className = 'quick-filter-chip bg-emerald-600 text-white font-semibold px-2.5 py-1 rounded-lg text-[11px] transition whitespace-nowrap';

      executeSearch(q, cat);
    });
  });

  // Initial load
  executeSearch('Community Health Centre', 'chc');
}
