import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {initialState,updateState,snapshot,briefText} from '../public/trip-constructor/trip-engine.mjs';
import {cargoScenarios,rowScenarios,packCargo,insideCargo,passengerLimit} from '../public/trip-constructor/cargo-engine.mjs';
import {characterRoster} from '../public/trip-constructor/family-characters.mjs';
import {automaticCabin} from '../public/trip-constructor/cabin-composition.mjs';
import {cargoImageBox,projectedPoint} from '../public/trip-constructor/cargo-view.mjs';

test('Eight passengers are rejected; every folding mode removes one available seat',async()=>{
  assert.throws(()=>updateState(initialState(),{passengers:8}));
  for(let foldedSeats=0;foldedSeats<=3;foldedSeats++){
    const s=updateState(initialState(),{foldedSeats,passengers:7-foldedSeats,children:3});
    const plan=automaticCabin(s,7);
    assert.equal(passengerLimit(s),7-foldedSeats);
    assert.equal(plan.assignments.filter(p=>p.kind!=='empty').length,s.passengers);
    assert.equal(plan.assignments.filter(p=>p.kind==='child').length,3);
    assert.equal(plan.assignments.filter(p=>p.front).length,1);
    assert.equal(plan.assignments.filter(p=>p.id.startsWith('rear-')).length,3-foldedSeats);
    assert.throws(()=>updateState(s,{passengers:s.passengers+1}));
  }
  const html=await readFile(new URL('../public/trip-constructor/constructor.html',import.meta.url),'utf8');
  assert.doesNotMatch(html,/data-passengers="8"|До 8 пассажиров/);
});
test('Cargo presets are valid, conserve every item, stay within envelopes and never intersect',()=>{
  for(const scenario of [...Object.values(cargoScenarios),...Object.values(rowScenarios).flatMap(rows=>rows.map(r=>r.selection))]){
    const s=updateState(initialState(),scenario),p=packCargo(s);
    assert.equal(p.confirmed,false);
    assert.equal(p.placed.length+p.unplaced.length,p.items.length);
    assert.equal(new Set([...p.placed,...p.unplaced].map(i=>i.id)).size,p.items.length);
    assert.equal(p.unplaced.length,0);
    for(const item of p.placed){
      assert.ok(insideCargo(item,p.dims));
      const box=cargoImageBox(item,p.dims.extendedDepth);
      assert.ok(Object.values(box).every(Number.isFinite));
      if(item.type==='stroller'||item.type==='pet')assert.equal(item.z,0);
    }
    for(let i=0;i<p.placed.length;i++)for(const b of p.placed.slice(i+1)){
      const a=p.placed[i];
      const intersects=a.x<b.x+b.w-.01&&a.x+a.w>b.x+.01&&a.y<b.y+b.d-.01&&a.y+a.d>b.y+.01&&a.z<b.z+b.height-.01&&a.z+a.height>b.z+.01;
      assert.equal(intersects,false);
    }
  }
});
test('Family artwork includes mother, father, girl and boy without changing trip counts',()=>{
  const s=updateState(initialState(),cargoScenarios.family);
  const roster=characterRoster(automaticCabin(s,7));
  assert.equal(roster.length,4);
  assert.deepEqual(new Set(roster.map(p=>p.character.id)),new Set(['mother','father','girl','boy']));
  assert.equal(roster.filter(p=>p.kind==='child').length,2);
  assert.ok(roster.filter(p=>p.front).every(p=>p.kind==='adult'));
  for(const rows of Object.values(rowScenarios))for(const row of rows){
    const state=updateState(initialState(),row.selection),p=automaticCabin(state,7);
    assert.equal(characterRoster(p).length,state.passengers);
    assert.equal(p.assignments.filter(s=>s.id.startsWith('rear-')).length,3-state.foldedSeats);
  }
});
test('Overflow is explicitly retained, not silently removed; folded row protects occupied seats',()=>{
  for(let foldedSeats=0;foldedSeats<=3;foldedSeats++){
    const p=packCargo({...initialState(),foldedSeats,bags:10,carry:10,boxes:4,stroller:true,pet:true});
    assert.equal(p.items.length,26);
    assert.equal(p.items.length,p.placed.length+p.unplaced.length);
    assert.ok(p.unplaced.length>0);
    for(const i of p.placed)assert.ok(insideCargo(i,p.dims));
  }
});
test('Long equipment responds to length and measured-depth changes',()=>{
  const s=updateState(initialState(),{...cargoScenarios.ski,skiPairs:1,skiLength:220});
  assert.equal(packCargo(s).unplaced.length,1);
  assert.equal(packCargo({...s,extendedDepth:230}).unplaced.length,0);
  assert.equal(packCargo({...s,foldedSeats:0}).unplaced.length,1);
  assert.deepEqual(projectedPoint(40,130,0,130),projectedPoint(40,230,0,230));
  for(const patch of [{boxes:25},{foldedSeats:4},{skiPairs:9},{snowboards:-1},{skiLength:99},{extendedDepth:0}])
    assert.throws(()=>updateState(s,patch));
});
test('Export preserves the cargo selection and labels the physical limits as unconfirmed',()=>{
  const s=updateState(initialState(),{...cargoScenarios.ski,date:'2026-10-01'});
  const draft=snapshot(s,[],'2026-09-16'),text=briefText(draft);
  assert.equal(draft.sent,false);assert.equal(draft.cargo.confirmed,false);
  assert.equal(draft.selection.skiPairs,4);assert.equal(draft.selection.foldedSeats,3);
  assert.match(text,/вместимость НЕ подтверждена/);assert.match(text,/170 см — допущение/);
});
