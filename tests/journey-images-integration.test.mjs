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
test('All 159 explicit hero mappings have distinct local WebP files and meaningful alt text',()=>{
  assert.equal(Object.keys(journeyIllustrations).length,159);
  assert.equal(new Set(Object.values(journeyIllustrations).map(v=>v.src)).size,159);
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
test('18 city pages use their own illustrated hero, social preview and TaxiService image',()=>{
  const manifest=JSON.parse(fs.readFileSync(new URL('docs/illustrations/cities-2026-09-29.json',root),'utf8'));
  const page=fs.readFileSync(new URL('src/app/cities/[slug]/page.tsx',root),'utf8');
  assert.equal(manifest.scenes.length,18);
  assert.equal(new Set(manifest.scenes.map(scene=>scene.path)).size,18);
  assert.equal(Object.keys(journeyIllustrations).filter(path=>path.startsWith('/cities/')).length,18);
  for(const scene of manifest.scenes){
    assert.equal(getJourneyIllustration(scene.path)?.src,scene.src);
    assert.match(scene.title,/^Минивэн с водителем в /);
    assert.match(scene.source,/^city-.+-source-v1\.png$/);
  }
  assert.match(page,/const cityIllustration = getJourneyIllustration\(`\/cities\/\$\{slug\}`\)/);
  assert.match(page,/src=\{cityIllustration\?\.src \?\? getRouteImage/);
  assert.match(page,/socialImage \? \{ images: \[socialImage\] \}/);
  assert.match(page,/"image": `https:\/\/zakazminivena\.ru\$\{cityIllustration\.src\}`/);
});
test('The 11 new long-route scenes use existing reviewed City2City distances',()=>{
  const registry=JSON.parse(fs.readFileSync(new URL('src/lib/route-registry.json',root),'utf8'));
  const ids='rostov-sochi rostov-adler moskva-sochi kazan-ekaterinburg moskva-spb spb-moskva moskva-voronezh voronezh-moskva moskva-kazan kazan-moskva novosibirsk-omsk'.split(' ');
  for(const id of ids){
    const path='/routes/'+id;
    assert.equal(registry.byPath[path]?.distanceStatus,'c2c-cache-endpoints-reviewed');
    assert.equal(getJourneyIllustration(path).src,'/images/journeys/'+id+'-v1.webp');
  }
});
test('17 regional scenes do not upgrade legacy distance status or silently include unapproved routes',()=>{
  const registry=JSON.parse(fs.readFileSync(new URL('src/lib/route-registry.json',root),'utf8'));
  const ids='adler-roza-khutor sochi-krasnaya-polyana simferopol-yalta simferopol-alushta simferopol-evpatoriya simferopol-feodosiya simferopol-sudak simferopol-sevastopol krasnodar-anapa krasnodar-gelendzhik mineralnye-vody-dombay mineralnye-vody-kislovodsk mineralnye-vody-pyatigorsk mineralnye-vody-nalchik voronezh-lipetsk voronezh-tambov novosibirsk-kemerovo'.split(' ');
  for(const id of ids){
    const path='/routes/'+id;
    assert.equal(registry.byPath[path]?.distanceStatus,'legacy-estimate-needs-road-check');
    assert.equal(getJourneyIllustration(path).src,'/images/journeys/'+id+'-v1.webp');
  }
  assert.equal(Object.keys(journeyIllustrations).filter(path=>path.startsWith('/routes/')).length,65);
  const missing=Object.keys(registry.byPath).filter(path=>path.startsWith('/routes/')&&!getJourneyIllustration(path)).sort();
  assert.deepEqual(missing,['/routes/voronezh-belgorod','/routes/voronezh-kursk']);
});
test('Priority route batch maps eleven reviewed-distance pages without new route records',()=>{
  const registry=JSON.parse(fs.readFileSync(new URL('src/lib/route-registry.json',root),'utf8'));
  const ids=['moskva-tver','volgograd-rostov','krasnodar-adler','moskva-nizhniy-novgorod','yaroslavl-moskva','moskva-tula','moskva-ryazan','moskva-kaluga','moskva-kostroma','nizhniy-novgorod-moskva','krasnodar-simferopol'];
  for(const id of ids){
    const path='/routes/'+id;
    assert.equal(registry.byPath[path]?.distanceStatus,'c2c-cache-endpoints-reviewed');
    const version=['moskva-tula','moskva-kostroma'].includes(id)?2:1;
    assert.equal(getJourneyIllustration(path).src,'/images/journeys/'+id+'-v'+version+'.webp');
  }
});
test('Regional batch B maps four existing reviewed-distance routes with reproducible assets',()=>{
  const manifest=JSON.parse(fs.readFileSync(new URL('docs/illustrations/regional-prompts-2026-09-29-b.json',root),'utf8'));
  const registry=JSON.parse(fs.readFileSync(new URL('src/lib/route-registry.json',root),'utf8'));
  assert.equal(manifest.scenes.length,4);
  assert.equal(new Set(manifest.scenes.map(s=>s.path)).size,4);
  for(const scene of manifest.scenes){
    assert.equal(registry.byPath[scene.path]?.distanceStatus,'c2c-cache-endpoints-reviewed');
    assert.equal(getJourneyIllustration(scene.path).src,scene.src);
    assert.equal(scene.src,'/images/journeys/'+scene.id+'-v1.webp');
    assert.ok(scene.prompt.includes('illustration-story'));
    assert.equal(scene.width,1536);assert.equal(scene.height,1024);
  }
});
test('Only the 13 reviewed airport hubs receive illustrations; no generic airport fallback',()=>{
  const airports=['svo','vko','dme','led','aer','mrv','kgd','kzn','svx','ovb','ikt','mmk','zia'];
  for(const iata of airports)assert.ok(getJourneyIllustration('/airport/'+iata));
  for(const iata of ['aaq','krr','sip','nonexistent'])assert.equal(getJourneyIllustration('/airport/'+iata),undefined);
  assert.equal(journeySocialImage('/unknown'),undefined);
});
test('57 airport-to-city pages receive their own image and structured data uses the same image',()=>{
  const manifest=JSON.parse(fs.readFileSync(new URL('docs/illustrations/airport-city-prompts-2026-09-29.json',root),'utf8'));
  const pages=fs.readFileSync(new URL('src/app/airport/[iata]/[destination]/page.tsx',root),'utf8');
  assert.equal(manifest.scenes.length,57);
  assert.equal(new Set(manifest.scenes.map(scene=>scene.path)).size,57);
  assert.equal(new Set(manifest.scenes.map(scene=>scene.src)).size,57);
  for(const scene of manifest.scenes){
    assert.equal(getJourneyIllustration(scene.path)?.src,scene.src);
    assert.ok(scene.path.startsWith('/airport/'));
    assert.match(scene.title,/^Минивэн /);
    assert.match(scene.source,/^airport-.+-source-v[12]\.png$/);
  }
  assert.equal(Object.keys(journeyIllustrations).filter(path=>/^\/airport\/[^/]+\/[^/]+$/.test(path)).length,58);
  assert.match(pages,/image: illustration\s*\? `https:\/\/zakazminivena\.ru\$\{illustration\.src\}`/);
  assert.match(pages,/getJourneyIllustration\('\/airport\/' \+ iata \+ '\/' \+ destination\)/);
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
