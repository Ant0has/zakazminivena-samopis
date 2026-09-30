import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { request } from 'node:http';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.argv[2]);
const output = process.argv[3];
if (!Number.isInteger(port) || port < 1 || port > 65535 || !output) {
  throw new Error('Usage: node scripts/verify-editorial-heroes.mjs <port> <report.json>');
}

const sandbox = { exports: {} };
const source = fs.readFileSync(path.join(root, 'src/lib/journey-illustrations.ts'), 'utf8');
vm.runInNewContext(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, sandbox);
const images = Object.entries(sandbox.exports.journeyIllustrations)
  .filter(([, image]) => image.src.includes('/series-'));
const get = pathname => new Promise((resolve, reject) => {
  const req = request({ hostname: '127.0.0.1', port, path: pathname, headers: { Host: 'zakazminivena.ru' } }, res => {
    const chunks = [];
    res.on('data', chunk => chunks.push(chunk));
    res.on('end', () => resolve({ status: res.statusCode, text: Buffer.concat(chunks).toString(), headers: res.headers }));
  });
  req.on('error', reject);
  req.setTimeout(15000, () => req.destroy(new Error('Timeout')));
  req.end();
});
const meta = (html, name) => {
  const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map(match => match[0]);
  const tag = tags.find(value => value.includes(`property="${name}"`) || value.includes(`name="${name}"`));
  return tag?.match(/content="([^"]*)"/)?.[1]?.replaceAll('&amp;', '&') ?? '';
};

for (let attempt = 0; attempt < 40; attempt++) {
  try { if ((await get('/')).status === 200) break; } catch {}
  await new Promise(resolve => setTimeout(resolve, 250));
}
const failures = [];
for (const [url, image] of images) {
  const page = await get(url);
  const html = page.text;
  const expected = 'https://zakazminivena.ru' + image.src;
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (page.status !== 200) failures.push({ url, test: 'status', actual: page.status });
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) failures.push({ url, test: 'one H1' });
  if (canonical !== 'https://zakazminivena.ru' + url) failures.push({ url, test: 'canonical', actual: canonical });
  if (!html.includes(encodeURIComponent(image.src)) && !html.includes(image.src)) failures.push({ url, test: 'first-screen image' });
  if (meta(html, 'og:image') !== expected || meta(html, 'twitter:image') !== expected) {
    failures.push({ url, test: 'social image', og: meta(html, 'og:image'), twitter: meta(html, 'twitter:image') });
  }
  if (url.startsWith('/minivan-') && !html.includes('id="trip-constructor"')) failures.push({ url, test: 'constructor' });
  const asset = await get(image.src);
  if (asset.status !== 200 || !asset.headers['content-type']?.includes('image/webp')) {
    failures.push({ url, test: 'WebP asset', status: asset.status });
  }
}
const result = { checkedAt: new Date().toISOString(), port, pages: images.length, failures, realLeadSent: false };
fs.writeFileSync(output, JSON.stringify(result, null, 2));
console.log(JSON.stringify(result));
if (failures.length) process.exitCode = 1;
