/**
 * SwasthyaSetu AI - Main Application Entry Orchestrator
 */

import { state } from './state.js';
import { renderHeader, attachHeaderEvents } from './components/Header.js';
import { renderSidebar, attachSidebarEvents } from './components/Sidebar.js';
import { renderDashboardView, attachDashboardEvents } from './components/DashboardView.js';
import { renderSmartTriageView, attachSmartTriageEvents } from './components/SmartTriageView.js';
import { renderAIAssistantView, attachAIAssistantEvents } from './components/AIAssistantView.js';
import { renderHealthcareMapView, attachHealthcareMapEvents } from './components/HealthcareMapView.js';
import { renderTelemedicineView, attachTelemedicineEvents } from './components/TelemedicineView.js';
import { renderMedicineView, attachMedicineEvents } from './components/MedicineView.js';
import { renderSchemesView, attachSchemesEvents } from './components/SchemesView.js';
import { renderMaternalChildView, attachMaternalChildEvents } from './components/MaternalChildView.js';
import { renderChronicDiseaseView, attachChronicDiseaseEvents } from './components/ChronicDiseaseView.js';
import { renderOutbreakIntelligenceView, attachOutbreakIntelligenceEvents } from './components/OutbreakIntelligenceView.js';
import { renderEmergencyResponseView, attachEmergencyResponseEvents } from './components/EmergencyResponseView.js';
import { renderAshaFieldAppView, attachAshaFieldAppEvents } from './components/AshaFieldAppView.js';
import { renderFacilityIntelligenceView, attachFacilityIntelligenceEvents } from './components/FacilityIntelligenceView.js';
import { renderResourceAllocationView, attachResourceAllocationEvents } from './components/ResourceAllocationView.js';
import { renderHealthEquityView, attachHealthEquityEvents } from './components/HealthEquityView.js';
import { renderVillageProfileView, attachVillageProfileEvents } from './components/VillageProfileView.js';
import { renderDigitalHealthProfileView, attachDigitalHealthProfileEvents } from './components/DigitalHealthProfileView.js';
import { renderDataSourcesView, attachDataSourcesEvents } from './components/DataSourcesView.js';
import { renderAdminAnalyticsView, attachAdminAnalyticsEvents } from './components/AdminAnalyticsView.js';
import { renderTrustSafetyView, attachTrustSafetyEvents } from './components/TrustSafetyView.js';
import { renderModals, attachModalsEvents } from './components/Modals.js';

// Expose state globally for inline onclick helpers
window.appState = state;

function renderApp() {
  const headerContainer = document.getElementById('header-container');
  const sidebarContainer = document.getElementById('sidebar-container');
  const mainContent = document.getElementById('main-content');
  const modalsContainer = document.getElementById('modals-container');

  if (!headerContainer || !sidebarContainer || !mainContent || !modalsContainer) return;

  // 1. Render Header & Sidebar
  headerContainer.innerHTML = renderHeader();
  attachHeaderEvents();

  sidebarContainer.innerHTML = renderSidebar();
  attachSidebarEvents();

  modalsContainer.innerHTML = renderModals();
  attachModalsEvents();

  // 2. Render Active View based on state.activeTab
  switch (state.activeTab) {
    case 'dashboard':
      mainContent.innerHTML = renderDashboardView();
      attachDashboardEvents();
      break;
    case 'triage':
      mainContent.innerHTML = renderSmartTriageView();
      attachSmartTriageEvents();
      break;
    case 'assistant':
      mainContent.innerHTML = renderAIAssistantView();
      attachAIAssistantEvents();
      break;
    case 'map':
      mainContent.innerHTML = renderHealthcareMapView();
      attachHealthcareMapEvents();
      break;
    case 'telemedicine':
      mainContent.innerHTML = renderTelemedicineView();
      attachTelemedicineEvents();
      break;
    case 'medicines':
      mainContent.innerHTML = renderMedicineView();
      attachMedicineEvents();
      break;
    case 'schemes':
      mainContent.innerHTML = renderSchemesView();
      attachSchemesEvents();
      break;
    case 'maternal-child':
      mainContent.innerHTML = renderMaternalChildView();
      attachMaternalChildEvents();
      break;
    case 'chronic':
      mainContent.innerHTML = renderChronicDiseaseView();
      attachChronicDiseaseEvents();
      break;
    case 'outbreak':
      mainContent.innerHTML = renderOutbreakIntelligenceView();
      attachOutbreakIntelligenceEvents();
      break;
    case 'emergency':
      mainContent.innerHTML = renderEmergencyResponseView();
      attachEmergencyResponseEvents();
      break;
    case 'asha-app':
      mainContent.innerHTML = renderAshaFieldAppView();
      attachAshaFieldAppEvents();
      break;
    case 'facility-intel':
      mainContent.innerHTML = renderFacilityIntelligenceView();
      attachFacilityIntelligenceEvents();
      break;
    case 'resource-allocation':
      mainContent.innerHTML = renderResourceAllocationView();
      attachResourceAllocationEvents();
      break;
    case 'equity':
      mainContent.innerHTML = renderHealthEquityView();
      attachHealthEquityEvents();
      break;
    case 'village-profile':
      mainContent.innerHTML = renderVillageProfileView();
      attachVillageProfileEvents();
      break;
    case 'my-health':
      mainContent.innerHTML = renderDigitalHealthProfileView();
      attachDigitalHealthProfileEvents();
      break;
    case 'data-sources':
      mainContent.innerHTML = renderDataSourcesView();
      attachDataSourcesEvents();
      break;
    case 'admin-analytics':
      mainContent.innerHTML = renderAdminAnalyticsView();
      attachAdminAnalyticsEvents();
      break;
    case 'trust-safety':
      mainContent.innerHTML = renderTrustSafetyView();
      attachTrustSafetyEvents();
      break;
    default:
      mainContent.innerHTML = renderDashboardView();
      attachDashboardEvents();
      break;
  }

  // 3. Re-initialize Lucide Icons across all rendered DOM elements
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// Subscribe to global state updates for automatic UI re-renders
state.subscribe(() => {
  renderApp();
});

// Initial boot
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
