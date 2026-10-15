/**
 * Unit & Integration Tests: TinyFish Security, Normalization & SSRF Protection
 */

const { isDomainAllowed, normalizeResource, searchHealthcareResources } = require('../api/_tinyfish.js');
const searchHandler = require('../api/healthcare-resources/search.js');

describe('TinyFish Security & SSRF Protection', () => {
  test('allows official government health domains', () => {
    expect(isDomainAllowed('https://upnrhm.gov.in/facilities')).toBe(true);
    expect(isDomainAllowed('https://mohfw.gov.in/directories')).toBe(true);
    expect(isDomainAllowed('https://nhp.gov.in/phc-directory')).toBe(true);
    expect(isDomainAllowed('https://cowin.gov.in/centres')).toBe(true);
    expect(isDomainAllowed('https://janaushadhi.gov.in/stores')).toBe(true);
  });

  test('strictly blocks unauthorized or internal SSRF targets', () => {
    expect(isDomainAllowed('http://localhost:8080/admin')).toBe(false);
    expect(isDomainAllowed('http://169.254.169.254/latest/meta-data')).toBe(false);
    expect(isDomainAllowed('https://untrusted-commercial-site.com')).toBe(false);
    expect(isDomainAllowed('https://malicious-site.gov.in.attacker.org')).toBe(false);
    expect(isDomainAllowed('not-a-valid-url')).toBe(false);
  });
});

describe('Data Normalization & Provenance Schemas', () => {
  test('enforces null or unconfirmed for missing fields and preserves source URLs', () => {
    const raw = {
      name: 'PHC Test Facility',
      url: 'https://upnrhm.gov.in/facilities/test'
    };

    const normalized = normalizeResource(raw, {
      district: 'Lucknow',
      state: 'Uttar Pradesh'
    });

    expect(normalized.name).toBe('PHC Test Facility');
    expect(normalized.source_url).toBe('https://upnrhm.gov.in/facilities/test');
    expect(normalized.phone).toBeNull(); // Never invent phone numbers
    expect(normalized.caveats).toContain('Verify operating hours');
    expect(normalized.retrieved_at).toBeDefined();
    expect(normalized.data_label).toBeDefined();
  });
});

describe('Missing API Key Graceful Failure Path', () => {
  const originalKey = process.env.TINYFISH_API_KEY;

  beforeEach(() => {
    delete process.env.TINYFISH_API_KEY;
  });

  afterEach(() => {
    if (originalKey) process.env.TINYFISH_API_KEY = originalKey;
  });

  test('returns service_unavailable and verified baseline when API key is missing', async () => {
    const result = await searchHealthcareResources({
      query: 'PHC Bargadi',
      category: 'phc',
      district: 'Lucknow'
    });

    expect(result.status).toBe('service_unavailable');
    expect(result.error_code).toBe('API_KEY_NOT_CONFIGURED');
    expect(result.results.length).toBeGreaterThan(0);
    expect(result.is_fallback).toBe(true);
    // Baseline items must have verified official provenance
    expect(result.results[0].source_url).toMatch(/gov\.in/);
  });

  test('handler rejects queries containing identifiable numbers or emails (PHI Protection)', async () => {
    const req = {
      method: 'GET',
      query: { q: 'Patient phone 9876543210 test' }
    };

    let statusCode = 0;
    let jsonResponse = null;

    const res = {
      setHeader: () => {},
      status: (code) => {
        statusCode = code;
        return {
          json: (data) => { jsonResponse = data; }
        };
      }
    };

    await searchHandler(req, res);
    expect(statusCode).toBe(400);
    expect(jsonResponse.status).toBe('invalid_request');
    expect(jsonResponse.error_code).toBe('PHI_REJECTED');
  });
});
