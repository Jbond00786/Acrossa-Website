// Local production-file server. Mirrors clean URLs and real 404s for testing;
// Vercel behavior must also be checked on the deployed preview.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const deployment = JSON.parse(await readFile('vercel.json', 'utf8'));
const securityHeaders = deployment.headers.find(({ source }) => source === '/(.*)').headers;
const root = resolve(process.env.SERVE_DIR || 'dist');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
createServer(async (req, res) => {
  for (const { key, value } of securityHeaders) res.setHeader(key, value);
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    if (pathname !== '/' && (pathname.endsWith('/') || pathname.endsWith('.html'))) {
      const target =
        pathname
          .replace(/\/+$/, '')
          .replace(/\.html$/, '')
          .replace(/^\/index$/, '/') || '/';
      res.writeHead(308, { Location: target + url.search });
      res.end();
      return;
    }
    let path = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!path.startsWith(root + '/')) {
      res.writeHead(400);
      res.end();
      return;
    }
    if (!extname(path)) path += '.html';
    let status = 200;
    try {
      if (!(await stat(path)).isFile()) throw new Error('Not a file');
    } catch {
      path = resolve(root, '404.html');
      status = 404;
    }
    const body = await readFile(path);
    res.writeHead(status, {
      'Content-Type': mime[extname(path)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(body);
  } catch {
    res.writeHead(400);
    res.end('Bad request');
  }
}).listen(Number(process.env.PORT || 4173), '127.0.0.1', () => console.log(`Serving ${root}`));
