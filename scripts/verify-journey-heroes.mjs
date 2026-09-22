import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {request} from 'node:http';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url), ts=require('typescript');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const port=Number(process.argv[2]||3002), baselineFile=process.argv[3];
const capture=process.argv.includes('--capture');
if(!Number.isInteger(port)||port<1||port>65535)throw Error('Invalid port');
const sandbox={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root,'src/lib/journey-illustrations.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,sandbox);
const images=sandbox.exports.journeyIllustrations, failures=[], pages={};
const previous=baselineFile&&!capture?JSON.parse(fs.readFileSync(baselineFile,'utf8')).pages:null;
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"');
const get=p=>new Promise((resolve,reject)=>{
 const req=request({hostname:'127.0.0.1',port,path:p,headers:{Host:'zakazminivena.ru'}},res=>{
  const chunks=[];res.on('data',c=>chunks.push(c));res.on('end',()=>resolve({status:res.statusCode,text:Buffer.concat(chunks).toString(),headers:res.headers}));
 });req.on('error',reject);req.setTimeout(15000,()=>req.destroy(Error('Timeout')));req.end();
});
for(let attempt=0;attempt<40;attempt++){try{if((await get('/')).status===200)break;}catch{}await new Promise(r=>setTimeout(r,250));}
for(const [url,image] of Object.entries(images)){
 const r=await get(url), html=r.text;
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1]||'';
 const tags=[...html.matchAll(/<meta\b[^>]*>/g)].map(m=>Object.fromEntries([...m[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(a=>[a[1],decode(a[2])])));
 const meta=name=>tags.find(t=>(t.name||t.property)===name)?.content||'';
 const frames=[...html.matchAll(/<iframe\b[^>]*src="([^"]*)"[^>]*>/g)].map(m=>decode(m[1]));
 const canonical=html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]||'';
 const facts={title,description:meta('description'),canonical,constructor:frames[0]||''};
 pages[url]=facts;
 if(r.status!==200||!title||!facts.description||frames.length!==1)failures.push({url,test:'page/metadata/constructor',status:r.status});
 if(previous&&JSON.stringify(previous[url])!==JSON.stringify(facts))failures.push({url,test:'text/price/route changed',before:previous[url],after:facts});
 if(capture)continue;
 const expected='https://zakazminivena.ru'+image.src;
 if((html.match(/<h1[\s>]/g)||[]).length!==1)failures.push({url,test:'one H1'});
 if(!html.includes('data-journey-hero'))failures.push({url,test:'illustrated hero'});
 if(!html.includes(encodeURIComponent(image.src)))failures.push({url,test:'responsive hero image'});
 if(meta('og:image')!==expected||meta('twitter:image')!==expected)failures.push({url,test:'social image'});
 if(canonical!=='https://zakazminivena.ru'+url)failures.push({url,test:'canonical'});
 const hero=html.match(/<section\b[^>]*data-journey-hero[^>]*>[\s\S]*?<\/section>/);
 if(!hero||!hero[0].includes('href="#trip-constructor"'))failures.push({url,test:'constructor anchor'});
 if(/^\/airport\/[a-z]{3}$/.test(url)){
  const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  if(!schemas.some(s=>s['@type']==='TaxiService'&&s.image===expected))failures.push({url,test:'schema image'});
 }
 const asset=await get(image.src);
 if(asset.status!==200||!asset.headers['content-type']?.includes('image/webp'))failures.push({url,test:'image asset'});
}
if(!capture)for(const iata of ['aaq','krr','sip']){
 const r=await get('/airport/'+iata);if(r.status!==200||r.text.includes('data-journey-hero'))failures.push({url:'/airport/'+iata,test:'deferred hub changed'});
}
const out={checkedAt:new Date().toISOString(),port,capture,heroPages:Object.keys(pages).length,pages,failures,realLeadSent:false};
const output=capture?baselineFile:path.join(root,'hero-smoke-'+port+'.json');
if(!output)throw Error('Capture requires output path');
fs.writeFileSync(output,JSON.stringify(out,null,2));
console.log(JSON.stringify({...out,pages:undefined}));
if(failures.length)process.exitCode=1;
