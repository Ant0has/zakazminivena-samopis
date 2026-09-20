const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {createRequire}=require('node:module');
const root=path.join(__dirname,'..'); const req=createRequire(path.join(root,'package.json')); const ts=req('typescript');
function mod(relative, overrides={}) {
  const code=ts.transpileModule(fs.readFileSync(path.join(root,relative),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
  const m={exports:{}};
  vm.runInNewContext(code,{module:m,exports:m.exports,URL,URLSearchParams,Date,WeakMap,Map,Set,setTimeout,clearTimeout,AbortSignal,console,...overrides});return m.exports;
}
const a=mod('src/lib/lead-attribution.ts'); const now=Date.now(); let checks=0;
function test(name, fn){fn();checks++;console.log('PASS '+name);}
const paid='https://zakazminivena.ru/routes/kazan-samara?utm_source=yandex&utm_medium=cpc&utm_campaign=short-test&yclid=12345';
const start=a.advanceAttribution(null,paid,'',true,now);
test('campaign survives internal navigation',()=>{const b=a.advanceAttribution(start,'https://zakazminivena.ru/constructor','https://zakazminivena.ru/routes/kazan-samara',true,now+100);assert.equal(b.last.utm.yclid,'12345');assert.equal(b.first.landing,'https://zakazminivena.ru/routes/kazan-samara');});
test('direct return keeps last non-direct source',()=>{assert.equal(a.advanceAttribution(start,'https://zakazminivena.ru/','',true,now+200).last.utm.utm_campaign,'short-test');});
test('new campaign is atomic, old campaign and click id cleared',()=>{const b=a.advanceAttribution(start,'https://zakazminivena.ru/?utm_source=partner','',true,now+300);assert.equal(b.last.utm.utm_source,'partner');assert.equal(b.last.utm.yclid,undefined);assert.equal(b.last.utm.utm_campaign,undefined);assert.equal(b.first.utm.yclid,'12345');});
test('organic search replaces old paid attribution',()=>{const b=a.advanceAttribution(start,'https://zakazminivena.ru/routes/kazan-samara','https://www.google.com/search?q=private',true,now+500);assert.equal(b.last.utm.utm_medium,'organic');assert.equal(b.last.utm.yclid,undefined);assert.equal(b.last.referrer,'https://www.google.com/search');});
test('AI referrer preserved as referral; unavailable referrer not invented',()=>{assert.equal(a.advanceAttribution(null,paid.split('?')[0],'https://chatgpt.com/',true,now).last.utm.utm_source,'chatgpt.com');assert.deepEqual(Object.keys(a.advanceAttribution(null,paid.split('?')[0],'',true,now).last.utm),[]);});
test('private work URLs, fragments and arbitrary queries are not retained',()=>{assert.equal(a.safePage('https://zakazminivena.ru/work/short-routes#key=secret'),'');assert.equal(a.safePage('https://zakazminivena.ru/constructor?phone=secret#key=x'),'https://zakazminivena.ru/constructor');assert.equal(a.safePage('javascript:alert(1)'),'');});
test('expiry at 90 days; future and corrupt data rejected',()=>{assert.equal(a.cleanAttribution(start,now+91*86400000),null);assert.equal(a.cleanAttribution({...start,first:{...start.first,at:now+120000}},now),null);assert.equal(a.cleanAttribution({version:1,first:{},last:{}}),null);});
test('storage blocked does not break session attribution',()=>{const store=new Map(),w={location:{href:paid},document:{referrer:''},sessionStorage:{getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)},get localStorage(){throw Error('blocked');}};assert.equal(a.captureAttribution(w).last.utm.yclid,'12345');w.location.href='https://zakazminivena.ru/constructor';assert.equal(a.captureAttribution(w).last.utm.yclid,'12345');});
test('separately bundled iframe does not overwrite paid source with stale document referrer',()=>{const store=new Map(),storage={getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)},w={location:{href:paid},document:{referrer:'https://www.google.com/'},localStorage:storage,sessionStorage:storage};a.captureAttribution(w);w.location.href='https://zakazminivena.ru/constructor';const iframeCopy=mod('src/lib/lead-attribution.ts');assert.equal(iframeCopy.captureAttribution(w).last.utm.yclid,'12345');});
test('referral domains resembling search providers are not classified as organic',()=>{assert.equal(a.advanceAttribution(null,paid.split('?')[0],'https://docs.google.com/',true,now).last.utm.utm_medium,'referral');});
const aliases=mod('src/lib/airport-canonical.ts');
test('10 airport aliases, unmatched airports retained',()=>{assert.equal(Object.keys(aliases.airportAliases).length,10);assert.equal(aliases.airportHref('sheremetyevo'),'/airport/svo');assert.equal(aliases.airportHref('kurumoch'),'/airports/kurumoch');assert.equal(aliases.airportHref('platov'),'/airports/platov');});
(async()=>{
 const config=mod('next.config.ts',{require:name=>{assert.equal(name,'./src/lib/airport-canonical');return aliases;}}).default;
 const redirects=await config.redirects();assert.equal(redirects.length,23);assert.equal(redirects.find(r=>r.source==='/api/:path*').statusCode,308);checks++;
 const requestId='12345678-1234-4234-8234-123456789012'; let payload;
 const api=mod('src/app/api/order/route.ts',{process:{env:{CRM_LEADS_API:'https://example.invalid',CRM_LEADS_API_KEY:'test'}},require:name=>name==='next/server'?{NextResponse:{json:(body,init)=>({body,status:init.status})}}:name==='@/lib/lead-attribution'?a:null,fetch:async(url,options)=>{payload=JSON.parse(options.body);return {ok:true,status:201,json:async()=>({success:true,leadId:1})};}});
 const body={phone:'+70000000000',from:'Город А',to:'Город Б',pageUrl:'https://zakazminivena.ru/constructor?private=x#secret',attribution:start,requestId,metricaClientId:'12345678'};
 const response=await api.POST({json:async()=>body});assert.equal(response.status,200);assert.equal(payload.yclid,'12345');assert.equal(payload.landingPage,'https://zakazminivena.ru/constructor');assert.ok(payload.comment.includes('Метрика ClientID: 12345678'));assert.ok(payload.comment.includes('Первый вход: https://zakazminivena.ru/routes/kazan-samara'));assert.ok(!payload.comment.includes('#secret'));checks++;
 const bad=mod('src/app/api/order/route.ts',{process:{env:{CRM_LEADS_API:'https://example.invalid',CRM_LEADS_API_KEY:'test'}},require:name=>name==='next/server'?{NextResponse:{json:(body,init)=>({body,status:init.status})}}:a,fetch:async()=>({ok:true,status:200,json:async()=>({success:false})})});
 assert.equal((await bad.POST({json:async()=>({phone:'+70000000000'})})).status,503);checks++;
 console.log(JSON.stringify({checks,result:'passed',realNetworkRequests:0}));
})().catch(e=>{console.error(e);process.exitCode=1;});
