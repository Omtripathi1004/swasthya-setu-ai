/**
 * SwasthyaSetu AI - Vercel Serverless Function
 * Route: /api/healthcare-resources/search
 * 
 * Provides secure server-side proxy to TinyFish Search & Fetch APIs.
 * Enforces:
 * - Secret confidentiality (TINYFISH_API_KEY read only here)
 * - Safe input validation (no PHI accepted)
 * - Sanitized response payload with transparent provenance
 * - No sensitive data logging
 */

const { searchHealthcareResources } = require('../_tinyfish.js');

module.exports = async function handler(req, res) {
  const reqId = `req_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
  const startTime = Date.now();

  // CORS headers for security
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    let params = {};
    if (req.method === 'GET') {
      params = req.query || {};
    } else if (req.method === 'POST') {
      params = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    } else {
      return res.status(405).json({
        error: 'Method Not Allowed',
        message: 'Only GET and POST are supported.'
      });
    }

    // Input parameters
    const query = params.q || params.query || '';
    const category = params.category || 'all';
    const district = params.district || 'Lucknow';
    const state = params.state || 'Uttar Pradesh';

    // Privacy safeguard: Ensure query contains no personal numbers, email or Aadhaar
    if (/\b\d{10,12}\b/.test(query) || /@/.test(query)) {
      return res.status(400).json({
        status: 'invalid_request',
        error_code: 'PHI_REJECTED',
        message: 'Personal identification numbers, phone numbers or emails must not be sent to public healthcare queries.'
      });
    }

    const result = await searchHealthcareResources({
      query,
      category,
      district,
      state
    });

    const latency = Date.now() - startTime;
    // Safe operational logging - NO health data or secrets logged
    console.log(`[API /api/healthcare-resources/search] id=${reqId} status=${result.status} latency=${latency}ms count=${result.results ? result.results.length : 0}`);

    return res.status(200).json({
      request_id: reqId,
      ...result
    });
  } catch (error) {
    const latency = Date.now() - startTime;
    console.error(`[API /api/healthcare-resources/search] id=${reqId} error=${error.message} latency=${latency}ms`);
    
    return res.status(500).json({
      request_id: reqId,
      status: 'internal_error',
      message: 'An unexpected error occurred while processing the healthcare resource search.'
    });
  }
};
