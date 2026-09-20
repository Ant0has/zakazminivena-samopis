const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { createRequire } = require('node:module');
const root = path.join(__dirname,'..');
const localRequire = createRequire(path.join(root,'package.json'));
const ts = localRequire('typescript');
const dir = fs.mkdtempSync(path.join(os.tmpdir(),'zm-short-routes-test-'));
process.env.ZM_SHORT_ROUTES_DATA_DIR = dir;
const token = crypto.randomBytes(32).toString('base64url');
fs.writeFileSync(path.join(dir,'access.json'), JSON.stringify({keyHash:crypto.createHash('sha256').update(token).digest('hex')}), {mode:0o600});
function compile(file, special={}) {
  const source = fs.readFileSync(file,'utf8');
  const code = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText;
  const mod = {exports:{}};
  const req = createRequire(file);
  vm.runInThisContext(`(function(require,module,exports){${code}\n})`,{filename:file})(name=>special[name]||req(name),mod,mod.exports);
  return mod.exports;
}
const store = compile(path.join(root,'src/lib/short-route-workspace.ts'));
const route = compile(path.join(root,'src/app/work/short-routes/route.ts'),{'@/lib/short-route-workspace':store});
let checks = 0;
async function check(name, f) { await f(); checks++; console.log('PASS '+name); }
const req = (body, options={}) => new Request('https://zakazminivena.ru/work/short-routes', {method:'POST', headers:{Origin:'https://zakazminivena.ru','Content-Type':'application/json',Authorization:`Bearer ${token}`,...options.headers}, body: typeof body === 'string' ? body : JSON.stringify(body)});
(async()=>{
  const id = store.shortRoutes[0].id, id2=store.shortRoutes[1].id;
  const change = (overrides={}) => ({id,price:4500,comment:'Встреча в терминале',expectedVersion:0,...overrides});
  await check('69 unique directions / 76 source pages',async()=>{ assert.equal(store.shortRoutes.length,69); assert.equal(new Set(store.shortRoutes.map(r=>r.id)).size,69); assert.equal(store.shortRoutes.reduce((n,r)=>n+r.pages.length,0),76); });
  await check('access key required / wrong key rejected',async()=>{ await assert.rejects(store.authorize(null),e=>e.status===401); await assert.rejects(store.authorize('Bearer '+crypto.randomBytes(32).toString('base64url')),e=>e.status===401); await store.authorize('Bearer '+token); });
  await check('empty store is explicit, no fabricated prices',async()=>{ assert.equal((await store.readState()).revision,0); assert.deepEqual((await store.readState()).entries,{}); });
  await check('valid data persists through independent module reload',async()=>{ await store.saveChanges([change()]); const another=compile(path.join(root,'src/lib/short-route-workspace.ts')); assert.equal((await another.readState()).entries[id].price,4500); });
  await check('concurrent same-row edit rejected; no overwrite',async()=>{ await assert.rejects(store.saveChanges([change({price:6000})]),e=>e.status===409); assert.equal((await store.readState()).entries[id].price,4500); });
  await check('concurrent different row edits merge',async()=>{ const s=await store.saveChanges([change({id:id2,price:5200})]); assert.equal(s.entries[id].price,4500); assert.equal(s.entries[id2].price,5200); });
  await check('nullable price and comments survive, history exists',async()=>{ await store.saveChanges([change({price:null,comment:'=не формула\nКоляска',expectedVersion:1})]); assert.equal((await store.readState()).entries[id].price,null); assert.equal(fs.readdirSync(path.join(dir,'history')).length,3); assert.equal(fs.statSync(path.join(dir,'drafts.json')).mode & 0o777,0o600); });
  await check('invalid prices / unknown directions / duplicate rows rejected',async()=>{ for(const price of [0,-1,0.5,1000001,'4500',NaN]) assert.throws(()=>store.parseChanges([change({price})]),e=>e.status===400); assert.throws(()=>store.parseChanges([change({id:'/unknown'})])); assert.throws(()=>store.parseChanges([change(),change()])); assert.throws(()=>store.parseChanges([change({comment:'x'.repeat(1001)})])); });
  await check('write lock protects multi-process saves',async()=>{ fs.mkdirSync(path.join(dir,'write.lock')); await assert.rejects(store.saveChanges([change()]),e=>e.status===423); fs.rmdirSync(path.join(dir,'write.lock')); });
  await check('cross-origin and unauthenticated requests blocked',async()=>{ assert.equal((await route.POST(req({action:'load'},{headers:{Origin:'https://example.org'}}))).status,403); assert.equal((await route.POST(req({action:'load'},{headers:{Authorization:''}}))).status,401); });
  await check('malformed / wrong content type / oversized requests rejected',async()=>{ assert.equal((await route.POST(req('{broken'))).status,400); assert.equal((await route.POST(req({action:'load'},{headers:{'Content-Type':'text/plain'}}))).status,415); assert.equal((await route.POST(req(' '.repeat(180001)))).status,413); });
  await check('API results uncacheable and noindex including errors',async()=>{ for(const r of [await route.POST(req({action:'load'})),await route.POST(req({action:'bogus'}))]){ assert.match(r.headers.get('x-robots-tag'),/noindex/); assert.match(r.headers.get('cache-control'),/no-store/); } });
  await check('HTML/assets noindex, no public analytics or access secret',async()=>{ const cwd=process.cwd(); process.chdir(root); try { for(const query of ['', '?asset=app','?asset=style']){ const r=await route.GET(new Request('https://zakazminivena.ru/work/short-routes'+query)); assert.equal(r.status,200); assert.match(r.headers.get('x-robots-tag'),/noindex/); const body=await r.text(); assert.ok(!body.includes(token)); assert.ok(!body.includes('mc.yandex.ru')); if(!query) assert.match(body,/name="robots" content="noindex/); } assert.equal((await route.GET(new Request('https://zakazminivena.ru/work/short-routes?asset=../../.env'))).status,404); } finally { process.chdir(cwd); } });
  console.log(JSON.stringify({checks,result:'passed',testStore:dir}));
})().catch(e=>{ console.error(e); process.exitCode=1; });
