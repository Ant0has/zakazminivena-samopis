import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require=createRequire(new URL('../package.json',import.meta.url));
const ts=require('typescript');
const attributionCode=ts.transpileModule(fs.readFileSync(new URL('../src/lib/lead-attribution.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const attributionSandbox={exports:{},URL,Date,WeakMap};vm.runInNewContext(attributionCode,attributionSandbox);
const code=ts.transpileModule(fs.readFileSync(new URL('../src/app/api/order/route.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const body={phone:'+70000000000',from:'Город А',to:'Город Б',date:'2027-01-15',passengers:4,tariff:'comfort',consent:true};
const cases=[{name:'No delivery configured',env:{},status:503},{name:'CRM rejects request',env:{CRM_LEADS_API:'https://example.invalid/leads',CRM_LEADS_API_KEY:'test-only'},crmOk:false,status:503},{name:'CRM accepts request',env:{CRM_LEADS_API:'https://example.invalid/leads',CRM_LEADS_API_KEY:'test-only'},crmOk:true,status:200},{name:'SMTP accepts request',env:{ORDER_SMTP_HOST:'example.invalid',ORDER_SMTP_USER:'test',ORDER_SMTP_PASSWORD:'test',ORDER_EMAIL_TO:'test@example.invalid'},emailOk:true,status:200},{name:'Missing consent',env:{},body:{...body,consent:false},status:400},{name:'More than seven passengers',env:{},body:{...body,passengers:8},status:400},{name:'Object injected as phone',env:{},body:{phone:{}},status:400}];
const results=[];
for(const scenario of cases){
 let attempts=0;
 const sandbox={exports:{},process:{env:scenario.env},AbortSignal,console:{log(){},error(){}},fetch:async()=>{attempts++;return {ok:!!scenario.crmOk,status:scenario.crmOk?201:503,json:async()=>({success:!!scenario.crmOk,leadId:scenario.crmOk?42:undefined})};},require:name=>{
   if(name==='@/lib/lead-attribution')return attributionSandbox.exports;
   if(name==='next/server')return {NextResponse:{json:(body,init)=>({body,status:init.status})}};
   if(name==='nodemailer')return {createTransport:()=>({sendMail:async()=>{attempts++;if(!scenario.emailOk)throw Error('mock rejected');return {accepted:['test@example.invalid']};}})};
   throw Error('Unexpected dependency: '+name);
 }};
 vm.runInNewContext(code,sandbox);
 const result=await sandbox.exports.POST({json:async()=>scenario.body||body});
 assert.equal(result.status,scenario.status,scenario.name);
 assert.equal(result.body.ok,scenario.status===200,scenario.name);
 if(scenario.status===400)assert.equal(attempts,0);
 results.push({name:scenario.name,status:result.status,mockedDeliveryAttempts:attempts});
}
console.log(JSON.stringify({passed:results.length,realNetworkRequests:0}));
