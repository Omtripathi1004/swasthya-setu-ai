/**
 * SwasthyaSetu AI - Global Application State & Event Bus
 */

import { REGIONAL_HIERARCHY, DASHBOARD_METRICS, HEALTHCARE_FACILITIES, MEDICINES_CATALOG, GOVT_SCHEMES, ASHA_HOUSEHOLD_VISITS, GOVERNMENT_DATA_SOURCES, TELEMEDICINE_QUEUE, NOTIFICATIONS_LIST } from './data/mockData.js';

export const ROLES = {
  PATIENT: { id: 'patient', name: 'Patient / Citizen', nameHindi: 'मरीज़ / नागरिक', badge: 'Patient View' },
  ASHA: { id: 'asha', name: 'ASHA / ANM Worker', nameHindi: 'आशा / एएनएम कार्यकर्ता', badge: 'Field Worker App' },
  DOCTOR: { id: 'doctor', name: 'Tele-Doctor / MO', nameHindi: 'डॉक्टर / मेडिकल अफसर', badge: 'Doctor Console' },
  STAFF: { id: 'staff', name: 'PHC / CHC Staff', nameHindi: 'स्वास्थ्य केंद्र कर्मचारी', badge: 'Facility Operations' },
  OFFICER: { id: 'officer', name: 'District Health Officer', nameHindi: 'जिला मुख्य चिकित्सा अधिकारी (CMO)', badge: 'District Command' },
  ADMIN: { id: 'admin', name: 'System Admin', nameHindi: 'सिस्टम एडमिन', badge: 'Admin Portal' }
};

export const TABS = [
  { id: 'dashboard', label: 'Main Dashboard', labelHindi: 'मुख्य डैशबोर्ड', icon: 'layout-dashboard', roles: ['patient', 'asha', 'doctor', 'staff', 'officer', 'admin'] },
  { id: 'triage', label: 'AI Smart Triage', labelHindi: 'एआई स्मार्ट ट्रियाज', icon: 'activity', roles: ['patient', 'asha', 'doctor', 'staff'] },
  { id: 'assistant', label: 'AI Health Assistant', labelHindi: 'एआई स्वास्थ्य सहायक', icon: 'bot', roles: ['patient', 'asha', 'doctor'] },
  { id: 'map', label: 'Healthcare Map', labelHindi: 'स्वास्थ्य केंद्र मानचित्र', icon: 'map-pin', roles: ['patient', 'asha', 'doctor', 'staff', 'officer', 'admin'] },
  { id: 'telemedicine', label: 'Telemedicine', labelHindi: 'टेलीमेडिसिन', icon: 'video', roles: ['patient', 'doctor', 'staff'] },
  { id: 'medicines', label: 'Jan Aushadhi Medicines', labelHindi: 'जन औषधि दवाएं', icon: 'pill', roles: ['patient', 'asha', 'doctor', 'staff', 'officer'] },
  { id: 'schemes', label: 'Government Schemes', labelHindi: 'सरकारी योजनाएं', icon: 'shield-check', roles: ['patient', 'asha'] },
  { id: 'maternal-child', label: 'Maternal & Child Health', labelHindi: 'मातृ एवं शिशु स्वास्थ्य', icon: 'heart-pulse', roles: ['patient', 'asha', 'doctor', 'officer'] },
  { id: 'chronic', label: 'Chronic Care', labelHindi: 'गंभीर बीमारी प्रबंधन', icon: 'stethoscope', roles: ['patient', 'asha', 'doctor'] },
  { id: 'outbreak', label: 'Disease & Outbreak Intelligence', labelHindi: 'बीमारी निगरानी एवं आउटब्रेक', icon: 'flame', roles: ['officer', 'doctor', 'admin'] },
  { id: 'emergency', label: 'Emergency 108 Command', labelHindi: 'आपातकालीन 108 कमांड', icon: 'siren', roles: ['patient', 'asha', 'staff', 'officer'] },
  { id: 'asha-app', label: 'ASHA Field App', labelHindi: 'आशा फ़ील्ड ऐप', icon: 'smartphone', roles: ['asha', 'officer'] },
  { id: 'facility-intel', label: 'Facility Intelligence', labelHindi: 'अस्पताल प्रदर्शन', icon: 'building-2', roles: ['staff', 'officer', 'admin'] },
  { id: 'resource-allocation', label: 'AI Resource Allocation', labelHindi: 'एआई संसाधन आवंटन', icon: 'brain-circuit', roles: ['officer', 'admin'] },
  { id: 'equity', label: 'Health Equity Score', labelHindi: 'हेल्थ इक्विटी स्कोर', icon: 'award', roles: ['officer', 'admin', 'patient'] },
  { id: 'village-profile', label: 'Village Health Profile', labelHindi: 'ग्राम स्वास्थ्य प्रोफाइल', icon: 'home', roles: ['officer', 'asha'] },
  { id: 'my-health', label: 'My Health (ABHA)', labelHindi: 'मेरा स्वास्थ्य (ABHA)', icon: 'user', roles: ['patient'] },
  { id: 'data-sources', label: 'Data Source Center', labelHindi: 'सरकारी डेटा स्त्रोत', icon: 'database', roles: ['patient', 'asha', 'doctor', 'staff', 'officer', 'admin'] },
  { id: 'admin-analytics', label: 'Admin Analytics & System', labelHindi: 'सिस्टम एनालिटिक्स', icon: 'bar-chart-3', roles: ['admin', 'officer'] },
  { id: 'trust-safety', label: 'Trust & Safety', labelHindi: 'सुरक्षा एवं पारदर्शिता', icon: 'lock', roles: ['patient', 'asha', 'doctor', 'staff', 'officer', 'admin'] }
];

class StateManager {
  constructor() {
    this.currentRole = 'patient';
    this.currentLanguage = 'en'; // 'en' | 'hi'
    this.activeTab = 'dashboard';
    
    // Geographic selection
    this.selectedState = 'UP';
    this.selectedDistrict = 'LKO';
    this.selectedBlock = 'BKT';
    this.selectedVillage = 'VIL_01'; // Bargadi
    
    // Offline mode simulation for ASHA app
    this.isOffline = false;
    this.offlineQueueCount = 2;
    
    // Data collections (mutable in session)
    this.metrics = { ...DASHBOARD_METRICS };
    this.facilities = [...HEALTHCARE_FACILITIES];
    this.medicines = [...MEDICINES_CATALOG];
    this.schemes = [...GOVT_SCHEMES];
    this.ashaVisits = [...ASHA_HOUSEHOLD_VISITS];
    this.dataSources = [...GOVERNMENT_DATA_SOURCES];
    this.teleQueue = [...TELEMEDICINE_QUEUE];
    this.notifications = [...NOTIFICATIONS_LIST];

    // Listeners
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this));
  }

  setRole(roleId) {
    if (ROLES[roleId.toUpperCase()]) {
      this.currentRole = roleId;
      // Auto-switch tab if current tab is not available for new role
      const availableTabs = TABS.filter(t => t.roles.includes(roleId));
      if (!availableTabs.some(t => t.id === this.activeTab)) {
        this.activeTab = availableTabs[0]?.id || 'dashboard';
      }
      this.notify();
    }
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    this.notify();
  }

  setActiveTab(tabId) {
    this.activeTab = tabId;
    this.notify();
  }

  setRegion(stateId, districtId, blockId, villageId) {
    this.selectedState = stateId || this.selectedState;
    this.selectedDistrict = districtId || this.selectedDistrict;
    this.selectedBlock = blockId || this.selectedBlock;
    this.selectedVillage = villageId || this.selectedVillage;
    
    // Slightly adjust metric multipliers to simulate dynamic regional updates!
    if (villageId === 'VIL_02') { // Kathvara
      this.metrics.peopleServed = 124800;
      this.metrics.activeHealthAlerts = 18;
      this.metrics.highRiskPatientsCount = 92;
    } else if (villageId === 'VIL_03') { // Mahona
      this.metrics.peopleServed = 158900;
      this.metrics.activeHealthAlerts = 22;
      this.metrics.highRiskPatientsCount = 104;
    } else {
      this.metrics = { ...DASHBOARD_METRICS };
    }
    
    this.notify();
  }

  toggleOfflineMode() {
    this.isOffline = !this.isOffline;
    this.notify();
  }

  markNotificationRead(id) {
    this.notifications = this.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    this.notify();
  }

  addAshaVisit(visit) {
    this.ashaVisits.unshift({
      id: `VIS_${Date.now().toString().slice(-4)}`,
      ...visit
    });
    if (this.isOffline) {
      this.offlineQueueCount++;
    }
    this.notify();
  }

  syncOfflineQueue() {
    this.isOffline = false;
    this.offlineQueueCount = 0;
    this.notify();
  }
}

export const state = new StateManager();
