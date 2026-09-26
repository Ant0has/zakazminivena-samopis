import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url), ts=require('typescript');
const root=new URL('../',import.meta.url);
const source=fs.readFileSync(new URL('src/lib/journey-illustrations.ts',root),'utf8');
const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const sandbox={exports:{}};vm.runInNewContext(code,sandbox);
const {journeyIllustrations,getJourneyIllustration,journeySocialImage}=sandbox.exports;
test('All 33 explicit hero mappings have distinct local WebP files and meaningful alt text',()=>{
  assert.equal(Object.keys(journeyIllustrations).length,33);
  assert.equal(new Set(Object.values(journeyIllustrations).map(v=>v.src)).size,33);
  for(const [route,image] of Object.entries(journeyIllustrations)){
    assert.ok(route.startsWith('/'));
    assert.match(image.alt,/рисованная иллюстрация/);
    assert.ok(image.alt.length>40);
    assert.equal(image.width,1536);assert.equal(image.height,1024);
    const bytes=fs.readFileSync(new URL('public'+image.src,root));
    assert.equal(bytes.toString('ascii',0,4),'RIFF');
    assert.equal(bytes.toString('ascii',8,12),'WEBP');
    assert.ok(bytes.length<600000,'Oversized hero: '+route);
    assert.equal(journeySocialImage(route).url,'https://zakazminivena.ru'+image.src);
  }
});
test('Only the 13 reviewed airport hubs receive illustrations; no generic airport fallback',()=>{
  const airports=['svo','vko','dme','led','aer','mrv','kgd','kzn','svx','ovb','ikt','mmk','zia'];
  for(const iata of airports)assert.ok(getJourneyIllustration('/airport/'+iata));
  for(const iata of ['aaq','krr','sip','nonexistent'])assert.equal(getJourneyIllustration('/airport/'+iata),undefined);
  assert.equal(journeySocialImage('/unknown'),undefined);
});
test('Airport JSON-LD uses the selected hero, without changing prices or constructor settings',()=>{
  const page=fs.readFileSync(new URL('src/app/airport/[iata]/page.tsx',root),'utf8');
  assert.match(page,/image: 'https:\/\/zakazminivena.ru' \+ \(illustration\?\.src/);
  assert.match(page,/journeySocialImage\('\/airport\/' \+ iata\)/);
  assert.match(page,/const constructorRoute = routes.find/);
});

test('Intercity batch maps exactly ten existing registry routes and has reproducible assets',()=>{
  const manifest=JSON.parse(fs.readFileSync(new URL('docs/illustrations/intercity-prompts-2026-09-26.json',root),'utf8'));
  const registry=JSON.parse(fs.readFileSync(new URL('src/lib/route-registry.json',root),'utf8'));
  assert.equal(manifest.scenes.length,10);
  assert.equal(new Set(manifest.scenes.map(s=>s.path)).size,10);
  for(const scene of manifest.scenes){
    assert.ok(registry.byPath[scene.path],'Unknown route '+scene.path);
    assert.equal(getJourneyIllustration(scene.path).src,scene.src);
    assert.equal(scene.src,'/images/journeys/'+scene.id+'-v1.webp');
    assert.ok(scene.prompt.includes('illustration-story'));
    assert.equal(scene.width,1536);assert.equal(scene.height,1024);
  }
});
test('Intercity Product schema uses the page illustration and retains the shared pricing offer',()=>{
  const page=fs.readFileSync(new URL('src/app/routes/[slug]/page.tsx',root),'utf8');
  assert.ok(page.includes("...(illustration ? { image: 'https://zakazminivena.ru' + illustration.src } : {})"));
  assert.match(page,/offers: routeOffer\(price\)/);
  assert.match(page,/return routeMetadata\(/);
});
