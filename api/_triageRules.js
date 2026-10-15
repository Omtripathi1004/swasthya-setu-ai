/**
 * SwasthyaSetu AI - Server/CommonJS Deterministic Triage Engine
 * Mirror of js/triageRules.js for Node, Jest, and backend validation.
 */

const EMERGENCY_RED_FLAGS = [
  {
    id: 'BREATHING_DISTRESS',
    label: 'Severe breathing difficulty, gasping, or cyanosis (blue lips)',
    labelHindi: 'सांस लेने में अत्यधिक कठिनाई, हांफना या होंठ नीले पड़ना',
    keywords: ['cannot breathe', 'gasping', 'severe breathing', 'blue lips', 'stridor', 'choking', 'saans nahi aa rahi', 'dum ghutna'],
    vitalsCheck: (vitals) => vitals.spo2 && Number(vitals.spo2) < 90,
    guidance: 'Immediate 108 ambulance dispatch and high-flow oxygen at CHC/District Hospital emergency ward.'
  },
  {
    id: 'CHEST_PAIN',
    label: 'Severe crushing chest pain, pressure, or radiation to left arm/jaw',
    labelHindi: 'सीने में अत्यधिक दर्द, भारीपन या बाएं हाथ/जबड़े में दर्द का फैलना',
    keywords: ['chest pain', 'heart attack', 'crushing chest', 'sine me dard', 'chhati me dard'],
    vitalsCheck: () => false,
    guidance: 'Immediate emergency ECG and cardiology transfer. Do not wait for routine OPD.'
  },
  {
    id: 'UNCONSCIOUSNESS',
    label: 'Loss of consciousness, unresponsiveness, or profound confusion',
    labelHindi: 'बेहोशी, चेतना का अभाव या अत्यंत भ्रमित अवस्था',
    keywords: ['unconscious', 'passed out', 'fainted', 'unresponsive', 'behosh', 'hosh nahi'],
    vitalsCheck: () => false,
    guidance: 'Place patient in recovery position, maintain clear airway, dispatch emergency transport.'
  },
  {
    id: 'STROKE_SIGNS',
    label: 'Signs of stroke: sudden facial drooping, one-sided arm weakness, or slurred speech (FAST)',
    labelHindi: 'स्ट्रोक के लक्षण: चेहरे का तिरछापन, एक तरफ की कमजोरी या आवाज लड़खड़ाना',
    keywords: ['stroke', 'facial droop', 'slurred speech', 'arm weakness', 'lakwa', 'paralysis'],
    vitalsCheck: () => false,
    guidance: 'Critical time window (< 4.5h) for stroke thrombolysis. Rush to nearest district hospital.'
  },
  {
    id: 'UNCONTROLLED_BLEEDING',
    label: 'Uncontrolled heavy hemorrhage or bleeding that does not stop with pressure',
    labelHindi: 'अत्यधिक रक्तस्राव जो दबाने पर भी नहीं रुक रहा',
    keywords: ['heavy bleeding', 'uncontrolled bleeding', 'hemorrhage', 'khoon beh raha', 'raktasrav'],
    vitalsCheck: () => false,
    guidance: 'Apply firm direct pressure with clean cloth and initiate urgent surgical referral.'
  },
  {
    id: 'ACTIVE_SEIZURE',
    label: 'Active continuous seizures or convulsions lasting > 2 minutes',
    labelHindi: 'लगातार दौरे या झटके आना (मिर्गी का गंभीर दौरा)',
    keywords: ['seizure', 'convulsion', 'fits', 'daura', 'jhatke'],
    vitalsCheck: () => false,
    guidance: 'Protect head from injury, do not place objects in mouth, transfer to emergency medical centre.'
  },
  {
    id: 'OBSTETRIC_EMERGENCY',
    label: 'Maternal red flag: heavy vaginal bleeding, convulsions in pregnancy, or severe abdominal agony',
    labelHindi: 'गर्भावस्था आपातकाल: अत्यधिक रक्तस्राव, गर्भावस्था में दौरे या पेट में तीव्र असहनीय दर्द',
    keywords: ['vaginal bleeding pregnancy', 'convulsions pregnancy', 'severe abdominal pain pregnant', 'garbh me dard', 'garbh raktasrav'],
    vitalsCheck: (vitals) => {
      if (vitals.isPregnant && vitals.bpSys && Number(vitals.bpSys) >= 160) return true;
      if (vitals.isPregnant && vitals.bpDia && Number(vitals.bpDia) >= 110) return true;
      return false;
    },
    guidance: 'Immediate emergency obstetric referral (FRU / CHC BKT Maternity Wing). Risk of eclampsia or placental abruption.'
  }
];

function evaluateDeterministicTriage({ symptomsText = '', vitals = {}, reportedFlags = [] }) {
  const detectedRedFlags = [];
  const textLower = String(symptomsText || '').toLowerCase();

  for (const flagId of reportedFlags) {
    const flagObj = EMERGENCY_RED_FLAGS.find(f => f.id === flagId);
    if (flagObj && !detectedRedFlags.some(d => d.id === flagObj.id)) {
      detectedRedFlags.push(flagObj);
    }
  }

  for (const flag of EMERGENCY_RED_FLAGS) {
    if (detectedRedFlags.some(d => d.id === flag.id)) continue;
    const matched = flag.keywords.some(kw => {
      const safeKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`\\b${safeKw}\\b`, 'i');
      return re.test(textLower);
    });
    if (matched) {
      detectedRedFlags.push(flag);
    }
  }

  for (const flag of EMERGENCY_RED_FLAGS) {
    if (detectedRedFlags.some(d => d.id === flag.id)) continue;
    if (flag.vitalsCheck(vitals)) {
      detectedRedFlags.push(flag);
    }
  }

  if (detectedRedFlags.length > 0) {
    return {
      isEmergency: true,
      urgencyLevel: 'EMERGENCY',
      riskScore: 95,
      flags: detectedRedFlags,
      immediateAction: '🚨 CRITICAL EMERGENCY: Call 108 Ambulance immediately or transfer to nearest 24x7 CHC / District Hospital Trauma Unit.',
      immediateActionHindi: '🚨 अत्यंत आपातकालीन स्थिति: तुरंत 108 एम्बुलेंस बुलाएं या निकटतम 24x7 सीएचसी / जिला अस्पताल आपातकालीन वार्ड पहुंचें।',
      recommendedFacilityTier: 'District Hospital Sitapur Road (Trauma Corridor) or CHC BKT 24x7 Emergency',
      cannotDowngrade: true,
      clinicalNotice: 'DETERMINISTIC RED FLAG: This condition requires immediate qualified medical assessment. Do not wait for routine OPD appointment.'
    };
  }

  let score = 20;
  const temp = Number(vitals.temp || 98.6);
  const spo2 = Number(vitals.spo2 || 98);
  const bpSys = Number(vitals.bpSys || 120);

  if (temp >= 102) score += 25;
  else if (temp >= 100) score += 15;

  if (spo2 <= 93) score += 30;
  else if (spo2 <= 95) score += 15;

  if (bpSys >= 150) score += 20;

  if (vitals.isPregnant) score += 15;
  if (vitals.hasAnemia) score += 10;
  if (vitals.hasCardiacHistory) score += 15;

  if (score >= 65) {
    return {
      isEmergency: false,
      urgencyLevel: 'URGENT',
      riskScore: Math.min(score, 85),
      flags: [],
      immediateAction: 'Urgent medical consultation needed within 12-24 hours at Community Health Centre (CHC).',
      immediateActionHindi: '12 से 24 घंटे के भीतर सामुदायिक स्वास्थ्य केंद्र (CHC) में डॉक्टर से परामर्श लें।',
      recommendedFacilityTier: 'CHC Bakshi Ka Talab (Community Health Centre)',
      cannotDowngrade: false,
      clinicalNotice: 'Decision Support Guidance: This risk level is based on structured clinical vitals and requires in-person medical evaluation.'
    };
  }

  return {
    isEmergency: false,
    urgencyLevel: 'ROUTINE',
    riskScore: Math.min(score, 45),
    flags: [],
    immediateAction: 'Routine Primary Health Centre (PHC) visit, teleconsultation, or supervised home monitoring.',
    immediateActionHindi: 'प्राथमिक स्वास्थ्य केंद्र (PHC) में नियमित परामर्श या टेलीकंसल्टेशन लें।',
    recommendedFacilityTier: 'PHC Bargadi (Primary Health Centre)',
    cannotDowngrade: false,
    clinicalNotice: 'Decision Support Guidance: Monitor symptoms closely. If symptoms worsen, re-evaluate or visit PHC Bargadi.'
  };
}

module.exports = {
  EMERGENCY_RED_FLAGS,
  evaluateDeterministicTriage
};
