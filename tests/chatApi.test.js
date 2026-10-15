/**
 * Unit & Integration Tests: Intelligent Healthcare Chat API & Pipeline
 * Route: /api/chat
 */

const chatHandler = require('../api/chat.js');
const { analyzeUserQuery, INTENT_TYPES } = require('../api/_intent.js');


describe('Intent Classification & Parameter Extraction', () => {
  test('accurately identifies facility search intent and extracts district', () => {
    const analysis = analyzeUserQuery('Find nearest Community Health Centre in Lucknow');
    expect(analysis.intent).toBe(INTENT_TYPES.FACILITY_SEARCH);
    expect(analysis.requiresExternalSearch).toBe(true);
    expect(analysis.extractedLocation).toBe('Lucknow');
  });

  test('accurately identifies government scheme inquiry', () => {
    const analysis = analyzeUserQuery('Ayushman card eligibility criteria and benefits');
    expect(analysis.intent).toBe(INTENT_TYPES.SCHEME_INQUIRY);
    expect(analysis.requiresExternalSearch).toBe(true);
  });

  test('detects Devanagari Hindi language', () => {
    const analysis = analyzeUserQuery('मुझे सरकारी अस्पताल में चेकअप करवाना है');
    expect(analysis.language).toBe('hi');
  });

  test('detects conversational Hinglish language', () => {
    const analysis = analyzeUserQuery('Meri maa ko bukhar hai, kahan dikhana chahiye');
    expect(analysis.language).toBe('hinglish');
  });
});

describe('Deterministic Safety Interception on /api/chat', () => {
  test('immediately escalates severe emergency red-flag with 112/108 advice and zero LLM delay', async () => {
    const req = {
      method: 'POST',
      body: {
        message: 'Patient has severe crushing chest pain and cannot breathe',
        sessionId: 'test_sess_01'
      }
    };

    let statusCode = 0;
    let responseData = null;

    const res = {
      setHeader: () => {},
      status: (code) => {
        statusCode = code;
        return {
          json: (data) => { responseData = data; }
        };
      }
    };

    await chatHandler(req, res);

    expect(statusCode).toBe(200);
    expect(responseData.is_emergency).toBe(true);
    expect(responseData.intent).toBe(INTENT_TYPES.EMERGENCY);
    expect(responseData.what_to_do_next[0]).toMatch(/112|108/);
    expect(responseData.sources.some(s => s.url.includes('112.gov.in'))).toBe(true);
  });

  test('rejects messages containing personal phone numbers or Aadhaar (PHI Protection)', async () => {
    const req = {
      method: 'POST',
      body: {
        message: 'My contact number is 9876543210 please call for appointment',
        sessionId: 'test_sess_02'
      }
    };

    let statusCode = 0;
    let responseData = null;

    const res = {
      setHeader: () => {},
      status: (code) => {
        statusCode = code;
        return {
          json: (data) => { responseData = data; }
        };
      }
    };

    await chatHandler(req, res);

    expect(statusCode).toBe(400);
    expect(responseData.error_code).toBe('PHI_REJECTED');
  });
});

describe('Simplified 6-Part Answer Generation & Grounding', () => {
  test('returns all required simplified response sections for scheme inquiries', async () => {
    const req = {
      method: 'POST',
      body: {
        message: 'Explain how Ayushman Bharat PMJAY scheme works',
        sessionId: 'test_sess_03',
        language: 'en'
      }
    };

    let statusCode = 0;
    let responseData = null;

    const res = {
      setHeader: () => {},
      status: (code) => {
        statusCode = code;
        return {
          json: (data) => { responseData = data; }
        };
      }
    };

    await chatHandler(req, res);

    expect(statusCode).toBe(200);
    expect(responseData.simple_answer).toBeDefined();
    expect(responseData.what_this_means).toBeDefined();
    expect(Array.isArray(responseData.what_to_do_next)).toBe(true);
    expect(responseData.what_to_do_next.length).toBeGreaterThan(0);
    expect(Array.isArray(responseData.what_to_prepare)).toBe(true);
    expect(Array.isArray(responseData.sources)).toBe(true);
    expect(responseData.sources.some(s => s.url.includes('pmjay.gov.in'))).toBe(true);
    expect(responseData.important_limitations).toBeDefined();
    expect(Array.isArray(responseData.follow_up_questions)).toBe(true);
  });

  test('supports session clearing', async () => {
    const req = {
      method: 'POST',
      body: {
        sessionId: 'test_sess_04',
        clear: true
      }
    };

    let statusCode = 0;
    let responseData = null;

    const res = {
      setHeader: () => {},
      status: (code) => {
        statusCode = code;
        return {
          json: (data) => { responseData = data; }
        };
      }
    };

    await chatHandler(req, res);

    expect(statusCode).toBe(200);
    expect(responseData.status).toBe('session_cleared');
  });
});
