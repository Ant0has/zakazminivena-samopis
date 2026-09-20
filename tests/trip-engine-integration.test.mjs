import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,updateState,presets,models,tripCapacity,quoteFor,validateDraft,snapshot,briefText,validDate} from '../public/trip-constructor/trip-engine.mjs';
const routes=[{from:'Казань',to:'Самара',km:375,hours:'5.5 ч',price:22000,slug:'kazan-samara'}];
test('Known route uses shared city2city formula; return trip does not silently double or discount it',()=>{const s=initialState();assert.equal(quoteFor(s,routes).amount,22000);assert.equal(quoteFor({...s,returnTrip:true},routes).amount,22000);assert.equal(quoteFor({...s,from:'Тюмень'},routes).amount,null);assert.equal(quoteFor({...s,from:'Самара',to:'Казань'},routes).amount,null);});
test('Invalid state is rejected atomically',()=>{const s=initialState();for(const bad of [{passengers:0},{passengers:9},{children:5},{passengers:2,children:3},{bags:-1},{model:'invented'},{pet:'yes'},{unknown:true},null,[],{date:'2026-02-30'}])assert.throws(()=>updateState(s,bad));assert.deepEqual(s,initialState());});
test('Presets respect modeled capacity and child-count constraint',()=>{for(const p of Object.values(presets)){const s=updateState(initialState(),p);assert.ok(s.children<=s.passengers);assert.ok(s.passengers<=tripCapacity);}});
test('Draft validation catches missing, past, return dates and model capacity',()=>{const s=initialState();assert.ok(validateDraft(s,'2026-09-16').length);assert.equal(validateDraft({...s,date:'2026-10-01'},'2026-09-16').length,0);assert.ok(validateDraft({...s,date:'2026-09-01'},'2026-09-16').length);assert.ok(validateDraft({...s,date:'2026-10-01',returnTrip:true,returnDate:'2026-09-30'},'2026-09-16').length);assert.ok(validateDraft({...s,date:'2026-10-01',passengers:8},'2026-09-16').length);assert.ok(validateDraft({...s,date:'2026-10-01',from:'Самара'},'2026-09-16').length);});
test('Snapshot and exported text cannot imply sending or booking',()=>{const s=updateState(initialState(),{date:'2026-10-01',pet:true,returnTrip:true,returnDate:'2026-10-02'});const d=snapshot(s,routes,'2026-09-16');assert.equal(d.sent,false);assert.equal(d.status,'draft_not_sent');assert.ok(d.requiresConfirmation.includes('Цена и условия обратной поездки'));assert.match(briefText(d),/НЕ ОТПРАВЛЕН/);assert.match(briefText(d),/подтверждается до заказа/i);assert.equal(validDate('2028-02-29'),true);assert.equal(validDate('2026-02-29'),false);});
test('Fleet is informational: no model selection or hidden preferred car in draft',()=>{
  assert.deepEqual(models.map(m=>m.id),['vw-caravelle','hyundai-starex','kia-carnival-iv']);
  const s=initialState();assert.equal(Object.hasOwn(s,'model'),false);
  for(const m of models)assert.throws(()=>updateState(s,{model:m.id}),/Неизвестная опция/);
  const d=snapshot(s,routes);assert.equal(d.vehicle.model,null);assert.equal(d.vehicle.assignment,'to_be_confirmed');
  assert.equal(Object.hasOwn(d,'model'),false);assert.equal(Object.hasOwn(d.selection,'model'),false);
  assert.doesNotMatch(briefText(d),/Предпочтение|Hiace|Alphard/);assert.match(briefText(d),/модель будет согласована/);
});
