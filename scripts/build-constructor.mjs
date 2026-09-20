import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
const folder = new URL('../public/trip-constructor/', import.meta.url);
// Pin the build-only bundler. npm caches it; no extra production runtime dependency.
for (const [entry,output] of [['constructor.js','constructor.bundle.js'],['constructor-entry.css','constructor.bundle.css']]) {
  execFileSync('npm', ['exec','--yes','--package=esbuild@0.25.9','--','esbuild',new URL(entry,folder).pathname,'--bundle','--format=esm','--target=es2020','--minify','--outfile='+new URL(output,folder).pathname], {stdio:'inherit'});
}
const version=createHash('sha256').update(fs.readFileSync(new URL('constructor.bundle.js',folder))).update(fs.readFileSync(new URL('constructor.bundle.css',folder))).digest('hex').slice(0,12);
const htmlFile=new URL('constructor.html',folder);
let html=fs.readFileSync(htmlFile,'utf8');
html=html.replace(/<link rel="stylesheet"[^>]*>/g,'');
html=html.replace('</head>',`<link rel="stylesheet" href="constructor.bundle.css?v=${version}"></head>`);
html=html.replace(/<script[^>]*\bsrc="trip-data.js[^\"]*"[^>]*><\/script>/g,'');
html=html.replace(/<script type="module" src="constructor(?:\.bundle)?\.js[^\"]*"><\/script>/g,'');
html=html.replace(/<script id="constructor-loader">[\s\S]*?<\/script>/g,'');
html=html.replace(/<img\b[^>]*>/g,tag=>tag.replace(/\ssrc=/,' data-src='));
const loader=`<script id="constructor-loader">document.body.setAttribute('aria-busy','true');setTimeout(async()=>{try{await import('./trip-data.js?v=${version}');await import('./constructor.bundle.js?v=${version}');document.body.setAttribute('aria-busy','false')}catch(error){document.body.setAttribute('aria-busy','false');document.getElementById('errors').textContent='Не удалось загрузить конструктор. Обновите страницу или свяжитесь с нами по телефону.';document.getElementById('price').textContent='Расчёт временно недоступен';}},1800);</script>`;
html=html.replace('</body>',loader+'</body>');
fs.writeFileSync(htmlFile,html);
console.log('Constructor assets version:',version);
