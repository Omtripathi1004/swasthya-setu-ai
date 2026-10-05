/**
 * SwasthyaSetu AI - Comprehensive Relational Seed Data
 * Region: Uttar Pradesh -> Lucknow District -> Bakshi Ka Talab / Mal / Mohanlalganj -> Villages
 */

export const REGIONAL_HIERARCHY = {
  states: [
    {
      id: 'UP',
      name: 'Uttar Pradesh',
      nameHindi: 'उत्तर प्रदेश',
      districts: [
        {
          id: 'LKO',
          name: 'Lucknow',
          nameHindi: 'लखनऊ',
          blocks: [
            {
              id: 'BKT',
              name: 'Bakshi Ka Talab',
              nameHindi: 'बख्शी का तालाब',
              villages: [
                { id: 'VIL_01', name: 'Bargadi', nameHindi: 'बरगदी', population: 3840, households: 620, equityScore: 68 },
                { id: 'VIL_02', name: 'Kathvara', nameHindi: 'कठवारा', population: 4210, households: 710, equityScore: 74 },
                { id: 'VIL_03', name: 'Mahona', nameHindi: 'महौना', population: 5120, households: 840, equityScore: 62 },
                { id: 'VIL_04', name: 'Umaria', nameHindi: 'उमरिया', population: 2950, households: 480, equityScore: 59 }
              ]
            },
            {
              id: 'MAL',
              name: 'Mal',
              nameHindi: 'माल',
              villages: [
                { id: 'VIL_05', name: 'Ataria', nameHindi: 'अटारिया', population: 3100, households: 520, equityScore: 65 },
                { id: 'VIL_06', name: 'Nabipanah', nameHindi: 'नबीपनाह', population: 2780, households: 450, equityScore: 61 }
              ]
            },
            {
              id: 'MLG',
              name: 'Mohanlalganj',
              nameHindi: 'मोहनलालगंज',
              villages: [
                { id: 'VIL_07', name: 'Nigohan', nameHindi: 'निगोहां', population: 4900, households: 790, equityScore: 71 },
                { id: 'VIL_08', name: 'Mau', nameHindi: 'मऊ', population: 3320, households: 540, equityScore: 67 }
              ]
            }
          ]
        },
        {
          id: 'SIT',
          name: 'Sitapur',
          nameHindi: 'सीतापुर',
          blocks: [
            {
              id: 'KHA',
              name: 'Khairabad',
              nameHindi: 'खैराबाद',
              villages: [
                { id: 'VIL_09', name: 'Kamlapur', nameHindi: 'कमलापुर', population: 3600, households: 580, equityScore: 60 }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const DASHBOARD_METRICS = {
  peopleServed: 142580,
  activeHealthAlerts: 14,
  availableFacilities: 28,
  teleconsultationsCount: 3890,
  medicineAvailabilityPct: 91.4,
  highRiskPatientsCount: 84,
  vaccinationCoveragePct: 94.2,
  maternalAlertsCount: 12
};

export const HEALTHCARE_FACILITIES = [
  {
    id: 'FAC_01',
    name: 'CHC Bakshi Ka Talab',
    nameHindi: 'सामुदायिक स्वास्थ्य केंद्र (CHC) बख्शी का तालाब',
    type: 'CHC',
    typeLabel: 'Community Health Centre',
    latitude: 26.9745,
    longitude: 80.9231,
    block: 'Bakshi Ka Talab',
    district: 'Lucknow',
    distanceKm: 4.2,
    travelTimeMins: 12,
    status: 'Open 24x7',
    contact: '+91 522 289102',
    bedsTotal: 30,
    bedsAvailable: 11,
    icuBedsTotal: 4,
    icuBedsAvailable: 2,
    doctorsOnDuty: 4,
    doctorsTotal: 6,
    oxygenCylinders: 18,
    ambulances: 2,
    patientLoad: 'Moderate (65%)',
    avgWaitMins: 18,
    isDemoData: true,
    services: ['Emergency 24x7', 'Maternal & ANC', 'Child Immunization', 'Diagnostics & X-Ray', 'Telemedicine Hub', 'Pharmacy'],
    specialists: ['General Physician', 'Gynecologist', 'Pediatrician'],
    address: 'NH-24, Sitapur Road, BKT, Lucknow'
  },
  {
    id: 'FAC_02',
    name: 'PHC Bargadi',
    nameHindi: 'प्राथमिक स्वास्थ्य केंद्र (PHC) बरगदी',
    type: 'PHC',
    typeLabel: 'Primary Health Centre',
    latitude: 26.9892,
    longitude: 80.9415,
    block: 'Bakshi Ka Talab',
    district: 'Lucknow',
    distanceKm: 1.8,
    travelTimeMins: 6,
    status: 'Open Now (8 AM - 4 PM)',
    contact: '+91 9415 102938',
    bedsTotal: 6,
    bedsAvailable: 3,
    icuBedsTotal: 0,
    icuBedsAvailable: 0,
    doctorsOnDuty: 1,
    doctorsTotal: 2,
    oxygenCylinders: 4,
    ambulances: 1,
    patientLoad: 'Low (35%)',
    avgWaitMins: 10,
    isDemoData: true,
    services: ['OPD Triage', 'Maternal Checkup', 'Basic Diagnostics', 'Vaccination', 'Jan Aushadhi Counter'],
    specialists: ['Medical Officer (MBBS)'],
    address: 'Main Road, Bargadi Village, BKT'
  },
  {
    id: 'FAC_03',
    name: 'District Hospital Sitapur Road (Dr. Ram Manohar Lohia Annexe)',
    nameHindi: 'जिला अस्पताल सीतापुर रोड',
    type: 'District Hospital',
    typeLabel: 'District Hospital',
    latitude: 26.9015,
    longitude: 80.9520,
    block: 'Lucknow Central',
    district: 'Lucknow',
    distanceKm: 14.5,
    travelTimeMins: 28,
    status: 'Open 24x7',
    contact: '+91 522 230911',
    bedsTotal: 250,
    bedsAvailable: 48,
    icuBedsTotal: 30,
    icuBedsAvailable: 5,
    doctorsOnDuty: 22,
    doctorsTotal: 38,
    oxygenCylinders: 120,
    ambulances: 8,
    patientLoad: 'High (82%)',
    avgWaitMins: 35,
    isDemoData: true,
    services: ['24x7 Trauma & Emergency', 'ICU / Ventilator', 'Specialist Surgery', 'Advanced Pathology', 'Blood Bank', 'Dialysis'],
    specialists: ['Cardiologist', 'Neurologist', 'Surgeon', 'Gynecologist', 'Pediatrician', 'Orthopedic'],
    address: 'Sitapur Highway Near IT Crossing, Lucknow'
  },
  {
    id: 'FAC_04',
    name: 'Jan Aushadhi Kendra BKT Market',
    nameHindi: 'जन औषधि केंद्र बख्शी का तालाब',
    type: 'Pharmacy',
    typeLabel: 'Pradhan Mantri Jan Aushadhi Kendra',
    latitude: 26.9710,
    longitude: 80.9255,
    block: 'Bakshi Ka Talab',
    district: 'Lucknow',
    distanceKm: 3.9,
    travelTimeMins: 10,
    status: 'Open (9 AM - 8 PM)',
    contact: '+91 9839 441029',
    bedsTotal: 0,
    bedsAvailable: 0,
    doctorsOnDuty: 0,
    doctorsTotal: 0,
    oxygenCylinders: 0,
    ambulances: 0,
    patientLoad: 'Normal',
    avgWaitMins: 5,
    isDemoData: true,
    services: ['Generic Medicines', 'Essential Health Supplies', 'Surgical Dressings', 'BP & Blood Sugar Kits'],
    specialists: ['Licensed Pharmacist'],
    address: 'Shop No. 12, Main Market BKT'
  },
  {
    id: 'FAC_05',
    name: 'Telemedicine Kiosk - Mahona Sub-Centre',
    nameHindi: 'ई-संजीवनी टेलीमेडिसिन केंद्र - महौना',
    type: 'Telemedicine',
    typeLabel: 'eSanjeevani Teleconsultation Kiosk',
    latitude: 27.0110,
    longitude: 80.9100,
    block: 'Bakshi Ka Talab',
    district: 'Lucknow',
    distanceKm: 7.1,
    travelTimeMins: 16,
    status: 'Active (9 AM - 5 PM)',
    contact: '+91 522 401928',
    bedsTotal: 2,
    bedsAvailable: 2,
    doctorsOnDuty: 0,
    doctorsTotal: 0,
    oxygenCylinders: 2,
    ambulances: 0,
    patientLoad: 'Low',
    avgWaitMins: 8,
    isDemoData: true,
    services: ['Virtual Specialist Consultation', 'Digital Vital Diagnostic Kit', 'e-Prescription Printing'],
    specialists: ['CHO (Community Health Officer) Operator'],
    address: 'Health Sub-Centre Compound, Mahona Village'
  }
];

export const MEDICINES_CATALOG = [
  {
    id: 'MED_01',
    name: 'Paracetamol 500mg Tablets',
    nameHindi: 'पैरासिटामोल 500mg',
    category: 'Analgesic / Antipyretic',
    genericName: 'Paracetamol',
    janAushadhiPrice: 12.00,
    marketMRP: 42.00,
    stripSize: '10 Tablets',
    availabilityStatus: 'Normal Stock',
    stockCount: 420,
    facilityId: 'FAC_02',
    facilityName: 'PHC Bargadi',
    lastUpdated: '2026-10-04'
  },
  {
    id: 'MED_02',
    name: 'Amoxicillin 500mg Capsules',
    nameHindi: 'एमोक्सिसिलिन 500mg',
    category: 'Antibiotic',
    genericName: 'Amoxicillin',
    janAushadhiPrice: 28.50,
    marketMRP: 95.00,
    stripSize: '10 Capsules',
    availabilityStatus: 'Low Stock',
    stockCount: 45,
    facilityId: 'FAC_01',
    facilityName: 'CHC Bakshi Ka Talab',
    lastUpdated: '2026-10-05'
  },
  {
    id: 'MED_03',
    name: 'Metformin 500mg SR Tablets',
    nameHindi: 'मेटफॉर्मिन 500mg',
    category: 'Anti-Diabetic',
    genericName: 'Metformin Hydrochloride',
    janAushadhiPrice: 16.00,
    marketMRP: 55.00,
    stripSize: '10 Tablets',
    availabilityStatus: 'Normal Stock',
    stockCount: 680,
    facilityId: 'FAC_04',
    facilityName: 'Jan Aushadhi Kendra BKT',
    lastUpdated: '2026-10-05'
  },
  {
    id: 'MED_04',
    name: 'Amlodipine 5mg Tablets',
    nameHindi: 'एम्लोडिपाइन 5mg',
    category: 'Antihypertensive',
    genericName: 'Amlodipine',
    janAushadhiPrice: 8.50,
    marketMRP: 38.00,
    stripSize: '10 Tablets',
    availabilityStatus: 'Normal Stock',
    stockCount: 510,
    facilityId: 'FAC_04',
    facilityName: 'Jan Aushadhi Kendra BKT',
    lastUpdated: '2026-10-04'
  },
  {
    id: 'MED_05',
    name: 'Iron & Folic Acid Tablets (IFA Red)',
    nameHindi: 'आयरन और फोलिक एसिड',
    category: 'Maternal Nutrition',
    genericName: 'Ferrous Ascorbate + Folic Acid',
    janAushadhiPrice: 0.00,
    marketMRP: 45.00,
    stripSize: '100 Tablets (Free Govt Supply)',
    availabilityStatus: 'Normal Stock',
    stockCount: 1200,
    facilityId: 'FAC_02',
    facilityName: 'PHC Bargadi',
    lastUpdated: '2026-10-05'
  },
  {
    id: 'MED_06',
    name: 'ORS Sachet (Oral Rehydration Salts)',
    nameHindi: 'ओआरएस (ORS) घोल',
    category: 'Electrolyte Rehydration',
    genericName: 'WHO Oral Rehydration Salts',
    janAushadhiPrice: 4.50,
    marketMRP: 22.00,
    stripSize: '1 Sachet 21.8g',
    availabilityStatus: 'Critical Stock',
    stockCount: 18,
    facilityId: 'FAC_02',
    facilityName: 'PHC Bargadi',
    lastUpdated: '2026-10-05'
  }
];

export const GOVT_SCHEMES = [
  {
    id: 'SCH_01',
    name: 'Ayushman Bharat PM-JAY',
    nameHindi: 'आयुष्मान भारत - पीएम जन आरोग्य योजना',
    category: 'Financial Health Cover',
    benefit: '₹5,00,00,0 coverage per family per year for secondary & tertiary hospital care',
    eligibilityCriteria: ['SECC 2011 Rural Deprivation Criteria', 'BPL / Antyodaya Ration Card', 'Auto-included vulnerable groups'],
    documentsRequired: ['Aadhaar Card', 'Ration Card / PM-JAY Family ID letter'],
    officialUrl: 'https://pmjay.gov.in',
    dataStatus: 'Active Government Scheme',
    icon: 'shield-check'
  },
  {
    id: 'SCH_02',
    name: 'Ayushman Bharat Digital Mission (ABDM / ABHA)',
    nameHindi: 'आयुष्मान भारत डिजिटल मिशन (ABHA ID)',
    category: 'Digital Health Identity',
    benefit: 'Unique 14-digit ABHA ID card for seamless digital health records across all PHCs, CHCs & hospitals',
    eligibilityCriteria: ['All Indian Citizens'],
    documentsRequired: ['Aadhaar Card with linked mobile number'],
    officialUrl: 'https://abdm.gov.in',
    dataStatus: 'Active Government Scheme',
    icon: 'credit-card'
  },
  {
    id: 'SCH_03',
    name: 'Janani Suraksha Yojana (JSY)',
    nameHindi: 'जननी सुरक्षा योजना',
    category: 'Maternal Welfare',
    benefit: 'Direct cash assistance ₹1,400 for institutional delivery in rural PHC/CHC',
    eligibilityCriteria: ['Pregnant women living in rural areas', 'BPL / SC / ST pregnant women'],
    documentsRequired: ['MCP Card (Mother & Child Protection)', 'Bank Account details', 'Aadhaar'],
    officialUrl: 'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309',
    dataStatus: 'Active Government Scheme',
    icon: 'heart-pulse'
  },
  {
    id: 'SCH_04',
    name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    nameHindi: 'प्रधानमंत्री मातृ वंदना योजना',
    category: 'Maternal Cash Benefit',
    benefit: '₹5,000 cash incentive in tranches for first child pregnancy care and nutrition',
    eligibilityCriteria: ['Pregnant & Lactating Mothers (First live birth)'],
    documentsRequired: ['ANC Registration at PHC', 'Aadhaar Card', 'Bank Account'],
    officialUrl: 'https://pmmvy.wcd.gov.in',
    dataStatus: 'Active Government Scheme',
    icon: 'baby'
  },
  {
    id: 'SCH_05',
    name: 'PM Bharatiya Janaushadhi Pariyanjana (PMBJP)',
    nameHindi: 'प्रधानमंत्री भारतीय जनऔषधि परियोजना',
    category: 'Affordable Medicines',
    benefit: 'Access to high-quality generic medicines at 50% to 90% discount compared to brand MRP',
    eligibilityCriteria: ['Open to all patients and families'],
    documentsRequired: ['Valid Prescription from registered doctor (optional for OTC)'],
    officialUrl: 'https://janaushadhi.gov.in',
    dataStatus: 'Active Government Scheme',
    icon: 'pill'
  }
];

export const ASHA_HOUSEHOLD_VISITS = [
  {
    id: 'VIS_01',
    householdId: 'HH_BKT_102',
    headName: 'Ramesh Kumar',
    headNameHindi: 'रमेश कुमार',
    village: 'Bargadi',
    visitType: 'Maternal ANC Follow-up',
    patientName: 'Sunita Kumar (Age 24)',
    pregnancyWeek: 'Week 28 (Trimester 3)',
    status: 'Pending Today',
    priority: 'HIGH_RISK',
    riskReason: 'Borderline Hemoglobin (9.1 g/dL) & elevated BP (134/86)',
    lastVisitDate: '2026-09-18',
    assignedAsha: 'Smt. Anita Devi (ASHA Worker)'
  },
  {
    id: 'VIS_02',
    householdId: 'HH_BKT_108',
    headName: 'Suresh Verma',
    headNameHindi: 'सुरेश वर्मा',
    village: 'Bargadi',
    visitType: 'Child Vaccination Due',
    patientName: 'Aarav Verma (Age 9 Months)',
    vaccineDue: 'Measles-Rubella (MR 1st Dose) & Vitamin A Drops',
    status: 'Pending Today',
    priority: 'MODERATE',
    riskReason: 'Due for 9-month immunization window',
    lastVisitDate: '2026-08-10',
    assignedAsha: 'Smt. Anita Devi (ASHA Worker)'
  },
  {
    id: 'VIS_03',
    householdId: 'HH_BKT_115',
    headName: 'Mahesh Chaurasia',
    headNameHindi: 'महेश चौरसिया',
    village: 'Bargadi',
    visitType: 'Hypertension Follow-up',
    patientName: 'Mahesh Chaurasia (Age 58)',
    condition: 'Hypertension + Type-2 Diabetes',
    status: 'Completed',
    priority: 'ROUTINE',
    riskReason: 'Logged BP 128/82, Glucose 140 mg/dL (Adhering to Metformin)',
    lastVisitDate: '2026-10-05',
    assignedAsha: 'Smt. Anita Devi (ASHA Worker)'
  },
  {
    id: 'VIS_04',
    householdId: 'HH_BKT_121',
    headName: 'Radha Rani',
    headNameHindi: 'राधा रानी',
    village: 'Kathvara',
    visitType: 'Postnatal Care (PNC)',
    patientName: 'Radha Rani & Newborn Girl (Age 14 Days)',
    status: 'Scheduled Tomorrow',
    priority: 'ROUTINE',
    riskReason: 'Newborn weight gain check & breastfeeding assessment',
    lastVisitDate: '2026-09-28',
    assignedAsha: 'Smt. Sunita Singh (ANM)'
  }
];

export const GOVERNMENT_DATA_SOURCES = [
  {
    id: 'DS_01',
    name: 'National Health Mission (NHM) HMIS Portal',
    publisher: 'Ministry of Health and Family Welfare (MoHFW), Govt of India',
    datasetName: 'Health Management Information System - Facility & District Health Indicators',
    lastUpdated: '2026-09-30',
    dataStatus: 'Official Data Source Stream',
    coverage: 'All 75 Districts of Uttar Pradesh',
    accessUrl: 'https://hmis.mohfw.gov.in',
    apiStatus: 'Connected (REST API / Metadata Sync)',
    description: 'Provides monthly facility-level reporting on outpatient, inpatient, ANC visits, immunization, and disease notifications.'
  },
  {
    id: 'DS_02',
    name: 'National Health Authority (NHA) PM-JAY & ABDM API',
    publisher: 'National Health Authority, Govt of India',
    datasetName: 'Ayushman Bharat Beneficiary & ABHA Health Identity Registry',
    lastUpdated: '2026-10-04',
    dataStatus: 'Official Government API',
    coverage: 'Pan-India / Lucknow District',
    accessUrl: 'https://abdm.gov.in/developers',
    apiStatus: 'Connected (Sandbox Gateway)',
    description: 'Enables ABHA health card creation, consent management, and empaneled hospital query.'
  },
  {
    id: 'DS_03',
    name: 'Open Government Data Platform India (data.gov.in)',
    publisher: 'National Informatics Centre (NIC), Ministry of Electronics & IT',
    datasetName: 'Directory of Primary Health Centres & Community Health Centres',
    lastUpdated: '2026-08-15',
    dataStatus: 'Open Data (CC BY 4.0)',
    coverage: 'Uttar Pradesh State Health Directory',
    accessUrl: 'https://data.gov.in/catalog/health-facilities-india',
    apiStatus: 'Simulated Demo Mirror',
    description: 'Geographic coordinates, pincode mapping, and facility categorization for rural healthcare infrastructure.'
  },
  {
    id: 'DS_04',
    name: 'National Family Health Survey (NFHS-5 India)',
    publisher: 'International Institute for Population Sciences (IIPS) & MoHFW',
    datasetName: 'NFHS-5 District Health & Demographic Factsheet (Lucknow)',
    lastUpdated: '2024-03-12',
    dataStatus: 'Official Survey Dataset',
    coverage: 'Lucknow District (Rural & Urban)',
    accessUrl: 'http://rchiips.org/nfhs/factsheet_NFHS-5.shtml',
    apiStatus: 'Static Benchmark Data',
    description: 'Serves as ground truth baseline for maternal mortality ratio, anemia rates, stunting, and vaccination benchmarks.'
  },
  {
    id: 'DS_05',
    name: 'India Meteorological Department (IMD) Climate & Health Gateway',
    publisher: 'Ministry of Earth Sciences, Govt of India',
    datasetName: 'Daily Temperature, Rainfall & Heatwave Vulnerability Index',
    lastUpdated: '2026-10-05',
    dataStatus: 'Official Meteorological API',
    coverage: 'Lucknow Weather Station',
    accessUrl: 'https://mausam.imd.gov.in',
    apiStatus: 'Connected (Daily Pulse)',
    description: 'Provides ambient temperature (31.4°C), humidity (68%), and rainfall data used for vector breeding and heat stress prediction.'
  }
];

export const TELEMEDICINE_QUEUE = [
  {
    id: 'TELE_101',
    tokenNumber: 'TK-2026-084',
    patientName: 'Pooja Devi',
    patientNameHindi: 'पूजा देवी',
    age: 29,
    gender: 'Female',
    village: 'Bargadi',
    specialty: 'Obstetrics & Gynaecology',
    symptoms: 'Mild lower abdominal cramps in 2nd trimester (Week 22), mild dizziness',
    aiSummary: 'Risk: MODERATE. Vital check: BP 118/76, Temp 98.4°F, Hb 10.2 g/dL. Recommended: Fetal movement check, hydration & folic acid continuation.',
    requestedTime: '10:15 AM',
    status: 'In Consultation',
    doctorAssigned: 'Dr. Meenakshi Sharma (MD Gynaecology)'
  },
  {
    id: 'TELE_102',
    tokenNumber: 'TK-2026-085',
    patientName: 'Ram Asrey',
    patientNameHindi: 'राम आसरे',
    age: 52,
    gender: 'Male',
    village: 'Kathvara',
    specialty: 'General Physician',
    symptoms: 'High fever for 3 days with shivering, joint pain, retro-orbital headache',
    aiSummary: 'Risk: HIGH (Vector-Borne Anomaly Alert - Dengue/Malaria Suspect). Vital check: Temp 102.6°F, SpO2 97%. Recommended: Dengue NS1 & Malarial Antigen test at PHC.',
    requestedTime: '10:30 AM',
    status: 'Waiting in Queue',
    doctorAssigned: 'Dr. Rajesh Gupta (MBBS, CHC BKT Medical Officer)'
  }
];

export const NOTIFICATIONS_LIST = [
  {
    id: 'NOTIF_01',
    type: 'EMERGENCY',
    title: '108 Ambulance SOS Dispatched',
    message: 'Ambulance UP-32-EG-4091 dispatched to Bargadi Village for Obstetric Emergency (Token #EMG-902). ETA: 8 Mins.',
    timestamp: '10 mins ago',
    read: false
  },
  {
    id: 'NOTIF_02',
    type: 'HIGH_RISK_PATIENT',
    title: 'High Risk Maternal Alert',
    message: 'Sunita Kumar (HH_BKT_102, Bargadi) flagged with Hb 9.1 g/dL & elevated BP. ASHA visit scheduled.',
    timestamp: '25 mins ago',
    read: false
  },
  {
    id: 'NOTIF_03',
    type: 'MEDICINE_SHORTAGE',
    title: 'ORS Sachet Critical Stock Alert',
    message: 'PHC Bargadi reports critical stock of ORS Sachet (18 remaining). AI redistribution suggested from CHC BKT.',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: 'NOTIF_04',
    type: 'DISEASE_ANOMALY',
    title: 'Potential Fever Anomaly Detected',
    message: 'AI detected 12 fever cases reported within 48h in Kathvara Village. Public health verification recommended.',
    timestamp: '2 hours ago',
    read: true
  }
];
