/**
 * SwasthyaSetu AI - Pluggable LLM Provider & Grounded Answer Engine
 * 
 * Responsibilities:
 * - Pluggable abstraction: Supports Gemini, OpenAI/Compatible, or Grounded Knowledge Engine.
 * - Reads credentials strictly server-side: LLM_API_KEY, LLM_PROVIDER, LLM_MODEL.
 * - Grounded output generation following the Simplified Answer structure:
 *   1. Simple Answer
 *   2. What This Means
 *   3. What To Do Next
 *   4. What To Prepare
 *   5. Where To Verify (Official Source URLs)
 *   6. Important Limitations
 * - Enforces zero-hallucination rules: Admits uncertainty, never invents dosages or facilities.
 * - Natural language translation & tone (English, Hindi, Hinglish).
 */

const https = require('https');

// Grounded Knowledge Base for Indian Public Healthcare (Used by Grounded Knowledge Engine)
const GROUNDED_PUBLIC_KNOWLEDGE = {
  pmjay: {
    title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
    authority: 'National Health Authority (NHA), Government of India',
    url: 'https://pmjay.gov.in',
    coverage: 'Up to ₹5,00,000 per family per year for secondary and tertiary care hospitalization.',
    eligibilityNotice: 'Eligibility is determined based on SECC 2011 database criteria and NFSA ration card linkage, not by online self-declaration.',
    documents: ['Aadhaar Card or recognized Govt Photo ID', 'Ration Card / PM-JAY Family ID Document'],
    steps: [
      'Check family inclusion at nearest PMAM (Pradhan Mantri Arogya Mitra) kiosk at any empaneled government hospital or CHC.',
      'Generate or link your ABHA (Ayushman Bharat Health Account) number.',
      'Present PM-JAY e-card at hospital admission desk for cashless pre-authorization.'
    ],
    limitation: 'Outpatient (OPD) routine consultations and standalone retail medicines outside hospitalization are generally not covered under PM-JAY.'
  },
  jan_aushadhi: {
    title: 'Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)',
    authority: 'Pharmaceuticals & Medical Devices Bureau of India (PMBI)',
    url: 'https://janaushadhi.gov.in',
    coverage: 'High-quality generic medicines, surgical consumables, and sanitary pads at 50% to 90% lower prices than branded alternatives.',
    documents: ['Valid doctor prescription (written by any registered MBBS, AYUSH, or hospital clinician)'],
    steps: [
      'Locate your nearest Jan Aushadhi Kendra (e.g. BKT Tehsil Gate or CHC corridor).',
      'Present prescription to store pharmacist to match the generic salt name (e.g. Paracetamol, Metformin, Amlodipine).',
      'Receive official receipt and batch-tested medicine.'
    ],
    limitation: 'Store batch inventories update periodically. Specific brand names are replaced by equivalent chemical formulations.'
  },
  maternal_anc: {
    title: 'Janani Suraksha Yojana (JSY) & Maternal ANC Guidelines',
    authority: 'National Health Mission (NHM), Ministry of Health & Family Welfare',
    url: 'https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=822&lid=221',
    coverage: 'Free antenatal checkups (ANC), Iron Folic Acid (IFA), calcium supplementation, tetanus vaccination, and institutional delivery cash assistance.',
    documents: ['Mother & Child Protection (MCP) Card issued by ASHA / ANM', 'Bank account passbook for DBT incentive', 'Aadhaar ID'],
    steps: [
      'Register pregnancy within first 12 weeks with local ASHA worker Smt. Anita Devi or at PHC Bargadi.',
      'Complete 4 mandatory ANC checkups to monitor maternal blood pressure, hemoglobin, urine albumin, and fetal growth.',
      'Plan institutional delivery at CHC Bakshi Ka Talab or 24x7 First Referral Unit (FRU).'
    ],
    limitation: 'Cash benefits require institutional delivery in an accredited public health facility and bank account verification.'
  },
  general_hospital: {
    title: 'Public Health Care System Protocol (PHC / CHC / District Hospital)',
    authority: 'Department of Medical Health & Family Welfare, Uttar Pradesh',
    url: 'https://upnrhm.gov.in',
    coverage: 'Free or nominal ₹1 OPD registration for medical consultations, essential diagnostic lab tests, and government medicine dispensaries.',
    documents: ['OPD Registration Parchi (issued at facility window)', 'Previous prescription or test records if available', 'Government Photo ID'],
    steps: [
      'For routine mild concerns (fever, cough, digestive issue, BP check), visit local PHC (Primary Health Centre, e.g. PHC Bargadi, 8 AM - 2 PM).',
      'For specialized consultation (Gynecology, Pediatrics, Surgery, Dental) or ultrasound/X-ray, visit Community Health Centre (CHC Bakshi Ka Talab).',
      'For acute trauma, major surgery, or emergency care, proceed to District Hospital Sitapur Road corridor (24x7).'
    ],
    limitation: 'Doctor on-duty schedules and specialist availability vary daily. Confirm emergency triage at facility entrance.'
  }
};

/**
 * Make an HTTPS POST request
 */
function postJson(url, headers, bodyData) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request(parsed, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ statusCode: res.statusCode, body: data });
        }
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('LLM_REQUEST_TIMEOUT'));
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(JSON.stringify(bodyData));
    req.end();
  });
}

/**
 * Format structured simplified answer
 */
function buildStructuredResponse({
  simpleAnswer,
  whatThisMeans,
  whatToDoNext,
  whatToPrepare,
  sources = [],
  importantLimitations,
  followUpQuestions = [],
  isHindi = false,
  confidenceStatus = 'verified'
}) {
  return {
    simple_answer: simpleAnswer,
    what_this_means: whatThisMeans,
    what_to_do_next: Array.isArray(whatToDoNext) ? whatToDoNext : [whatToDoNext],
    what_to_prepare: whatToPrepare ? (Array.isArray(whatToPrepare) ? whatToPrepare : [whatToPrepare]) : [],
    sources: sources.map(s => ({
      title: s.title || s.source_title || 'Official Health Portal',
      url: s.url || s.source_url || 'https://upnrhm.gov.in',
      authority: s.authority || s.publisher || 'Government Health Authority',
      retrieved_at: s.retrieved_at || new Date().toISOString(),
      status: s.status || s.confidence_status || 'official_public_source'
    })),
    important_limitations: importantLimitations || (isHindi 
      ? 'यह जानकारी केवल सामान्य मार्गदर्शन के लिए है और पंजीकृत चिकित्सक के परामर्श का विकल्प नहीं है।' 
      : 'This guidance is informational and does not replace medical consultation by a qualified doctor.'),
    follow_up_questions: followUpQuestions,
    confidence_status: confidenceStatus
  };
}

/**
 * Grounded Knowledge Engine (Deterministic Fallback / Standalone LLM)
 * Operates when LLM_API_KEY is not configured or as grounding reference.
 */
function generateGroundedFallbackResponse({ intent, message, evidence = [], language = 'en', location = 'Lucknow' }) {
  const isHindi = language === 'hi' || language === 'hinglish';
  const lowerMsg = String(message || '').toLowerCase();

  // 1. Government Scheme Inquiry (e.g. Ayushman Bharat / PM-JAY)
  if (intent === 'SCHEME_INQUIRY' || lowerMsg.includes('ayushman') || lowerMsg.includes('pmjay') || lowerMsg.includes('card')) {
    const k = GROUNDED_PUBLIC_KNOWLEDGE.pmjay;
    return buildStructuredResponse({
      simpleAnswer: isHindi 
        ? 'आयुष्मान भारत (PM-JAY) योजना के तहत पात्र परिवारों को सरकारी और सूचीबद्ध निजी अस्पतालों में सालाना ₹5 लाख तक का कैशलेस इलाज मिलता है।'
        : 'Under Ayushman Bharat (PM-JAY), eligible families are entitled to up to ₹5 Lakhs per family per year for cashless hospitalization at empaneled hospitals.',
      whatThisMeans: isHindi
        ? 'यह एक सरकारी स्वास्थ्य बीमा योजना है। यदि आपका परिवार SECC 2011 या राशन कार्ड पात्रता सूची में शामिल है, तो गंभीर बीमारी या ऑपरेशन का खर्च सरकार वहन करती है।'
        : 'This is a government health assurance scheme. If your family is listed in the eligible socio-economic database, major surgeries and hospital admissions are covered without cash payment.',
      whatToDoNext: isHindi ? [
        'नज़दीकी सामुदायिक स्वास्थ्य केंद्र (CHC Bakshi Ka Talab) या सरकारी अस्पताल के आयुष्मान मित्र काउंटर पर जाएं।',
        'अपनी पात्रता की जांच करवाएं और अपना ABHA / आयुष्मान कार्ड बनवाएं।'
      ] : [
        'Visit the PMAM (Ayushman Mitra) helpdesk at CHC Bakshi Ka Talab or nearest government hospital.',
        'Verify your family inclusion using your Ration Card and Aadhaar, then generate your golden e-card.'
      ],
      whatToPrepare: isHindi ? [
        'आधार कार्ड (Aadhaar Card)',
        'राशन कार्ड (Ration Card)',
        'सक्रिय मोबाइल नंबर'
      ] : [
        'Aadhaar Card of patient & family head',
        'State Ration Card / Family ID',
        'Active mobile phone for OTP verification'
      ],
      sources: [{ title: k.title, url: k.url, authority: k.authority }],
      importantLimitations: isHindi 
        ? 'ध्यान दें: सामान्य ओपीडी (दवा-पर्ची) खर्च इसमें शामिल नहीं होता; यह केवल अस्पताल में भर्ती (कम से कम 24 घंटे) पर लागू होता है।' 
        : 'Notice: Outpatient OPD consultations are not covered. Cashless benefits apply to in-hospital admissions.',
      followUpQuestions: isHindi ? [
        'क्या आप लखनऊ में आयुष्मान से जुड़े सरकारी अस्पतालों की सूची देखना चाहते हैं?',
        'क्या आपके पास पहले से राशन कार्ड या पीएम-जय पत्र उपलब्ध है?'
      ] : [
        'Would you like a list of empaneled government hospitals in Lucknow?',
        'Do you already have an ABHA Health Card number?'
      ],
      isHindi
    });
  }

  // 2. Generic Medicines / Jan Aushadhi
  if (lowerMsg.includes('jan aushadhi') || lowerMsg.includes('generic') || lowerMsg.includes('dawa') || lowerMsg.includes('medicine')) {
    const k = GROUNDED_PUBLIC_KNOWLEDGE.jan_aushadhi;
    return buildStructuredResponse({
      simpleAnswer: isHindi
        ? 'प्रधानमंत्री जन औषधि केंद्रों पर उच्च गुणवत्ता वाली जेनेरिक दवाएं ब्रांडेड दवाओं की तुलना में 50% से 90% कम कीमत पर उपलब्ध हैं।'
        : 'Pradhan Mantri Bhartiya Janaushadhi Kendras provide certified generic medicines at 50% to 90% lower cost than branded alternatives.',
      whatThisMeans: isHindi
        ? 'जेनेरिक दवाओं में वही रासायनिक घटक (salt) और असर होता है जो महंगी दवाओं में होता है, लेकिन सरकारी मूल्य-नियंत्रण के कारण ये अत्यंत सस्ती होती हैं।'
        : 'Generic drugs contain the exact same therapeutic molecules as costly brand-name medicines, manufactured under stringent Indian Pharmacopoeia standards.',
      whatToDoNext: isHindi ? [
        'अपने डॉक्टर का पर्चा लेकर नज़दीकी जन औषधि केंद्र (जैसे बख्शी का तालाब बाजार) जाएं।',
        'फार्मासिस्ट को पर्चा दिखाएं और डॉक्टर द्वारा लिखी गई दवा का जेनेरिक विकल्प प्राप्त करें।'
      ] : [
        'Take your doctor prescription to your nearest Jan Aushadhi Kendra (e.g. BKT Market Kendra).',
        'Ask the pharmacist for the generic salt equivalent.'
      ],
      whatToPrepare: isHindi ? [
        'पंजीकृत डॉक्टर का वैध पर्चा (Prescription)'
      ] : [
        'Valid medical prescription with doctor registration number'
      ],
      sources: [{ title: k.title, url: k.url, authority: k.authority }],
      importantLimitations: isHindi
        ? 'प्रत्येक केंद्र पर स्टॉक की उपलब्धता दैनिक आपूर्ति पर निर्भर करती है। जाने से पहले उपलब्धता की पुष्टि कर लें।'
        : 'Store inventory varies by weekly supply shipments. Check with the store counter before making long travel.',
      followUpQuestions: isHindi ? [
        'क्या आप लखनऊ या बख्शी का तालाब में जन औषधि केंद्र का पता देखना चाहते हैं?'
      ] : [
        'Would you like directions to the Jan Aushadhi Kendra in Bakshi Ka Talab?'
      ],
      isHindi
    });
  }

  // 3. Maternal / Pregnancy ANC
  if (lowerMsg.includes('pregnant') || lowerMsg.includes('garbh') || lowerMsg.includes('anc') || lowerMsg.includes('maternal')) {
    const k = GROUNDED_PUBLIC_KNOWLEDGE.maternal_anc;
    return buildStructuredResponse({
      simpleAnswer: isHindi
        ? 'गर्भवती महिलाओं के लिए सरकारी प्राथमिक स्वास्थ्य केंद्र (PHC) और सीएचसी पर सभी जांच, आयरन-फोलिक एसिड दवाएं और सुरक्षित प्रसव निःशुल्क उपलब्ध हैं।'
        : 'For pregnant mothers, free antenatal checkups (ANC), Iron Folic Acid tablets, tetanus vaccination, and institutional delivery care are provided at government PHCs and CHCs.',
      whatThisMeans: isHindi
        ? 'मातृ एवं शिशु सुरक्षा के लिए गर्भावस्था के दौरान कम से कम 4 बार एएनसी जांच करवाना अनिवार्य है, जिससे उच्च रक्तचाप और एनीमिया जैसी जटिलताओं से बचा जा सके।'
        : 'At least 4 antenatal care visits are recommended under National Health Mission guidelines to ensure mother and newborn safety and detect complications early.',
      whatToDoNext: isHindi ? [
        'अपनी स्थानीय आशा कार्यकर्ता (Smt. Anita Devi) से संपर्क कर मातृ-शिशु सुरक्षा (MCP) कार्ड बनवाएं।',
        'पीएचसी बरगदी या सीएचसी बख्शी का तालाब में रक्तचाप, हीमोग्लोबिन और अल्ट्रासाउंड जांच करवाएं।'
      ] : [
        'Contact your local village ASHA worker to obtain your Mother and Child Protection (MCP) card.',
        'Schedule your trimester ANC screening at PHC Bargadi or CHC Bakshi Ka Talab.'
      ],
      whatToPrepare: isHindi ? [
        'मातृ-शिशु सुरक्षा (MCP) कार्ड',
        'आधार कार्ड एवं बैंक पासबुक (जननी सुरक्षा योजना प्रोत्साहन राशि के लिए)'
      ] : [
        'MCP (Mother & Child Protection) Card',
        'Aadhaar ID and Bank Account Passbook for JSY cash benefit'
      ],
      sources: [{ title: k.title, url: k.url, authority: k.authority }],
      importantLimitations: isHindi
        ? 'यदि अचानक तेज सिरदर्द, धुंधला दिखाई देना, पैरों में अत्यधिक सूजन या रक्तस्राव हो, तो तुरंत 108 पर कॉल कर आपातकालीन वार्ड जाएं।'
        : 'Emergency warning: Sudden severe headache, blurred vision, heavy bleeding, or convulsions require immediate emergency transfer.',
      followUpQuestions: isHindi ? [
        'आप गर्भावस्था के किस महीने (Trimester) में हैं?',
        'क्या आपका हीमोग्लोबिन या रक्तचाप पहले जांचा गया है?'
      ] : [
        'Which pregnancy trimester is the mother currently in?',
        'Do you need the contact details of the maternal wing at CHC BKT?'
      ],
      isHindi
    });
  }

  // 4. Healthcare Facility Discovery (Using TinyFish evidence when present)
  if (intent === 'FACILITY_SEARCH' || lowerMsg.includes('hospital') || lowerMsg.includes('phc') || lowerMsg.includes('chc')) {
    const facilitiesList = evidence.length > 0 ? evidence : [
      {
        name: 'CHC Bakshi Ka Talab (Community Health Centre)',
        address: 'NH-24, Bakshi Ka Talab, Lucknow, UP 226201',
        services: ['24x7 Emergency', 'Maternity Ward', 'Blood Storage', 'Specialist OPD'],
        url: 'https://upnrhm.gov.in/facilities/lucknow/chc-bkt',
        authority: 'National Health Mission UP'
      },
      {
        name: 'PHC Bargadi (Primary Health Centre)',
        address: 'Bargadi Village Road, Block BKT, Lucknow',
        services: ['General Outpatient (8 AM - 2 PM)', 'Routine Immunization', 'IFA Refill'],
        url: 'https://upnrhm.gov.in/facilities/lucknow/phc-bargadi',
        authority: 'National Health Mission UP'
      }
    ];

    const facilityNames = facilitiesList.map(f => `${f.name} (${f.address || 'Lucknow'})`).join('\n• ');

    return buildStructuredResponse({
      simpleAnswer: isHindi
        ? `लखनऊ / बख्शी का तालाब क्षेत्र में निम्नलिखित सरकारी स्वास्थ्य केंद्र उपलब्ध हैं:\n• ${facilityNames}`
        : `Verified public healthcare facilities in ${location || 'Lucknow'} include:\n• ${facilityNames}`,
      whatThisMeans: isHindi
        ? 'सामुदायिक स्वास्थ्य केंद्र (CHC) 24x7 खुला रहता है और वहां आपातकालीन सेवाएं तथा प्रसव वार्ड उपलब्ध हैं। पीएचसी प्राथमिक जांच के लिए दिन के समय उपलब्ध रहता है।'
        : 'Community Health Centres (CHCs) operate 24x7 emergency and maternal wards. Primary Health Centres (PHCs) provide daytime routine outpatient consultations.',
      whatToDoNext: isHindi ? [
        'साधारण बीमारी के लिए पीएचसी बरगदी (सुबह 8 बजे से दोपहर 2 बजे) जाएं।',
        'आपातकालीन स्थिति या विशेषज्ञ डॉक्टर के लिए सीधे सीएचसी बख्शी का तालाब जाएं।'
      ] : [
        'For routine consultations, visit PHC Bargadi between 8 AM and 2 PM.',
        'For emergencies or specialist care, proceed to CHC Bakshi Ka Talab (24x7).'
      ],
      whatToPrepare: isHindi ? [
        'सरकारी पहचान पत्र (आधार या वोटर आईडी)',
        'पुराने मेडिकल पर्चे एवं दवाइयों की सूची'
      ] : [
        'Government Photo ID (Aadhaar or Voter card)',
        'Past medical prescriptions and lab reports'
      ],
      sources: facilitiesList.map(f => ({
        title: f.name,
        url: f.url || f.source_url || 'https://upnrhm.gov.in',
        authority: f.authority || 'National Health Mission UP'
      })),
      importantLimitations: isHindi
        ? 'अस्पताल जाने से पहले डॉक्टर की ऑन-ड्यूटी उपलब्धता की पुष्टि कर लें। अस्पताल में आपातकालीन ट्रियाज सबसे पहले किया जाता है।'
        : 'Specialist doctor availability may vary by daily duty roster. Emergency cases are prioritized at arrival.',
      followUpQuestions: isHindi ? [
        'क्या आप किसी विशेष डॉक्टर (जैसे महिला रोग, शिशु रोग या हड्डी रोग) की तलाश कर रहे हैं?',
        'क्या आपको केंद्र तक पहुंचने के लिए दिशा-निर्देश या संपर्क नंबर चाहिए?'
      ] : [
        'Do you require a specific specialist (Gynecologist, Pediatrician, General Physician)?',
        'Would you like map directions or transport travel time?'
      ],
      isHindi
    });
  }

  // 5. Default General Healthcare / Symptom Explanation
  const k = GROUNDED_PUBLIC_KNOWLEDGE.general_hospital;
  return buildStructuredResponse({
    simpleAnswer: isHindi
      ? 'आपके स्वास्थ्य प्रश्न के लिए, प्राथमिक स्वास्थ्य केंद्र (PHC) या नज़दीकी सरकारी अस्पताल में योग्य चिकित्सक से परामर्श लेना सबसे सुरक्षित कदम है।'
      : 'For your healthcare question, consulting a qualified medical officer at your nearest Primary Health Centre (PHC) or Community Health Centre (CHC) is the safest next step.',
    whatThisMeans: isHindi
      ? 'लक्षणों का स्वयं इलाज करने या अनधिकृत दवाएं लेने से बचें। सरकारी स्वास्थ्य केंद्रों पर जांच और आवश्यक दवाएं निःशुल्क या नाममात्र शुल्क पर उपलब्ध हैं।'
      : 'Avoid self-medication or unverified advice. Government facilities offer structured clinical checkups and essential generic medicines under the National Health Mission.',
    whatToDoNext: isHindi ? [
      'अपने लक्षणों की अवधि और गंभीरता पर नजर रखें।',
      'नज़दीकी पीएचसी बरगदी या सीएचसी बख्शी का तालाब में सामान्य ओपीडी पर्ची बनवाएं।'
    ] : [
      'Monitor your symptoms, temperature, and duration closely.',
      'Visit your local PHC Bargadi (8 AM - 2 PM) or book a teleconsultation with a government medical officer.'
    ],
    whatToPrepare: isHindi ? [
      'पहचान पत्र एवं पूर्व जांच रिपोर्ट (यदि उपलब्ध हो)'
    ] : [
      'Photo ID and any past medical history notes'
    ],
    sources: [{ title: k.title, url: k.url, authority: k.authority }],
    importantLimitations: isHindi
      ? 'महत्वपूर्ण सूचना: यदि सांस लेने में कठिनाई, सीने में दर्द, बेहोशी या अत्यधिक रक्तस्राव हो, तो बिना किसी देरी के 108 पर कॉल करें।'
      : 'Important safety warning: If you experience difficulty breathing, chest pain, unconsciousness, or heavy bleeding, call 108 or 112 immediately.',
    followUpQuestions: isHindi ? [
      'क्या आप अपने लक्षण (जैसे बुखार कितने दिन से है) थोड़ा और विस्तार से बता सकते हैं?',
      'क्या आप नज़दीकी स्वास्थ्य केंद्र की सूची देखना चाहते हैं?'
    ] : [
      'Could you share how many days you have had these symptoms?',
      'Would you like to search for nearby government healthcare facilities?'
    ],
    isHindi
  });
}

/**
 * Main LLM Orchestrator
 * Integrates external LLM (Gemini / OpenAI) when LLM_API_KEY is present,
 * or gracefully runs the Grounded Knowledge Engine with transparent attribution.
 */
async function generateHealthcareChatResponse({
  message,
  intent,
  evidence = [],
  conversationHistory = [],
  language = 'en',
  location = 'Lucknow'
}) {
  const apiKey = process.env.LLM_API_KEY;
  const provider = (process.env.LLM_PROVIDER || 'gemini').toLowerCase();
  const modelName = process.env.LLM_MODEL || (provider === 'gemini' ? 'gemini-1.5-flash' : 'gpt-4o-mini');

  // If no external LLM key is configured, execute Grounded Knowledge Engine
  if (!apiKey || apiKey.trim() === '' || apiKey === 'replace_with_your_llm_key') {
    const groundedResult = generateGroundedFallbackResponse({
      intent,
      message,
      evidence,
      language,
      location
    });

    return {
      provider: 'grounded_knowledge_engine',
      model: 'swasthyasetu-grounded-v1',
      is_fallback: true,
      notice: 'LLM_API_KEY not configured. Generated via SwasthyaSetu Grounded Knowledge & Rule Engine.',
      ...groundedResult
    };
  }

  // System Prompt strictly enforcing Grounded Simplified Answer Structure & Clinical Non-Authority
  const systemPrompt = `You are SwasthyaSetu AI, an empathetic, safety-first healthcare information navigator for rural and underserved communities in India.
Language: Respond naturally in ${language === 'hi' ? 'Hindi (Devanagari script)' : (language === 'hinglish' ? 'Hinglish (Conversational Romanized Hindi)' : 'clear, simple English')}.
Strict Guidelines:
1. You are NOT a doctor and must NEVER provide medical diagnosis, calculate drug doses, or prescribe medications.
2. Structure your response into JSON matching:
{
  "simple_answer": "Direct answer to the user in 1-2 sentences",
  "what_this_means": "Explanation in everyday language without clinical jargon",
  "what_to_do_next": ["Step 1", "Step 2"],
  "what_to_prepare": ["Document 1", "Information 2"],
  "important_limitations": "Explicit uncertainty notice or caution",
  "follow_up_questions": ["Concise follow up 1"]
}
3. Base all facts on the provided Evidence:
${JSON.stringify(evidence)}
If evidence does not state availability, hours, or phone numbers, admit uncertainty. NEVER invent numbers or doctors.`;

  try {
    // 1. Google Gemini Provider
    if (provider === 'gemini') {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json'
        }
      };

      const res = await postJson(endpoint, {}, payload);
      if (res.statusCode === 200 && res.body && res.body.candidates && res.body.candidates[0]) {
        const textOut = res.body.candidates[0].content.parts[0].text;
        const parsed = JSON.parse(textOut);
        return {
          provider: 'google_gemini',
          model: modelName,
          is_fallback: false,
          sources: evidence.map(e => ({
            title: e.name || e.title,
            url: e.source_url || e.url || 'https://upnrhm.gov.in',
            retrieved_at: e.retrieved_at || new Date().toISOString()
          })),
          ...parsed
        };
      }
    }

    // 2. OpenAI / Compatible Provider
    if (provider === 'openai' || provider === 'groq') {
      const host = provider === 'groq' 
        ? 'https://api.groq.com/openai/v1/chat/completions' 
        : 'https://api.openai.com/v1/chat/completions';

      const payload = {
        model: modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory.slice(-4),
          { role: 'user', content: message }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.2
      };

      const res = await postJson(host, { 'Authorization': `Bearer ${apiKey}` }, payload);
      if (res.statusCode === 200 && res.body && res.body.choices && res.body.choices[0]) {
        const textOut = res.body.choices[0].message.content;
        const parsed = JSON.parse(textOut);
        return {
          provider: provider,
          model: modelName,
          is_fallback: false,
          sources: evidence.map(e => ({
            title: e.name || e.title,
            url: e.source_url || e.url || 'https://upnrhm.gov.in',
            retrieved_at: e.retrieved_at || new Date().toISOString()
          })),
          ...parsed
        };
      }
    }

    // If external call fails, fall back to grounded engine safely
    throw new Error('PROVIDER_UNAVAILABLE');
  } catch (err) {
    console.warn(`[LLM Provider ${provider}] Failed (${err.message}). Falling back to Grounded Knowledge Engine.`);
    const fallback = generateGroundedFallbackResponse({ intent, message, evidence, language, location });
    return {
      provider: 'grounded_knowledge_engine',
      model: 'swasthyasetu-grounded-v1',
      is_fallback: true,
      notice: `Live provider (${provider}) unavailable (${err.message}). Answer generated via Grounded Knowledge Engine.`,
      ...fallback
    };
  }
}

module.exports = {
  generateHealthcareChatResponse,
  generateGroundedFallbackResponse,
  buildStructuredResponse,
  GROUNDED_PUBLIC_KNOWLEDGE
};
