/**
 * SwasthyaSetu AI - Local Development Server
 * 
 * Serves static assets and provides local execution of /api/ serverless routes
 * without needing extra npm dependencies.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load environment variables from .env or .env.local if present (without external dotenv package)
function loadEnvFile(filename) {
  const filePath = path.join(__dirname, filename);
  if (fs.existsSync(filePath)) {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [k, ...v] = trimmed.split('=');
        if (k && !process.env[k.trim()]) {
          process.env[k.trim()] = v.join('=').trim().replace(/^['"]|['"]$/g, '');
        }
      }
    }
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const PORT = process.env.PORT || 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // 1. API Route Handler (e.g. /api/chat or /api/healthcare-resources/search)
  if (pathname.startsWith('/api/')) {
    try {
      let handlerFile = null;
      if (pathname.startsWith('/api/chat')) {
        handlerFile = './api/chat.js';
      } else if (pathname.startsWith('/api/healthcare-resources/search')) {
        handlerFile = './api/healthcare-resources/search.js';
      }

      if (handlerFile) {
        const handler = require(handlerFile);
        req.query = parsedUrl.query;
        
        let bodyData = '';
        req.on('data', chunk => { bodyData += chunk; });
        req.on('end', async () => {
          if (bodyData) {
            try { req.body = JSON.parse(bodyData); } catch { req.body = bodyData; }
          }

          res.status = function(code) {
            this.statusCode = code;
            return this;
          };
          res.json = function(data) {
            this.setHeader('Content-Type', 'application/json');
            this.end(JSON.stringify(data));
            return this;
          };

          try {
            await handler(req, res);
          } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'API Handler Failed: ' + err.message }));
      return;
    }
  }

  // 2. Static File Serving
  if (pathname === '/') pathname = '/index.html';
  let filePath = path.join(__dirname, pathname);

  // Security check: ensure path is within directory
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback for cleanUrls: try adding .html
      const htmlPath = filePath + '.html';
      if (fs.existsSync(htmlPath)) {
        filePath = htmlPath;
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`  SwasthyaSetu AI Local Server`);
    console.log(`  Listening at: http://localhost:${PORT}`);
    console.log(`  API Endpoint: http://localhost:${PORT}/api/healthcare-resources/search`);
    console.log(`  TinyFish API Key: ${process.env.TINYFISH_API_KEY ? 'Configured [PROTECTED]' : 'Not Set (Using safe fallback baseline)'}`);
    console.log(`==================================================\n`);
  });
}

module.exports = server;
