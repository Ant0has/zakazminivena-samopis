import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {initialState} from '../public/trip-constructor/trip-engine.mjs';
import {automaticCabin,realisticLuggage} from '../public/trip-constructor/cabin-composition.mjs';
import {studioAssets,seatPosition} from '../public/trip-constructor/cabin-studio-layout.mjs';
import {mountCabin} from '../public/trip-constructor/cabin-studio.mjs';
import {packCargo} from '../public/trip-constructor/cargo-engine.mjs';

test('Every studio asset is local and the constructor no longer loads WebGL or rotation controls',async()=>{
  for(const path of Object.values(studioAssets))await access(new URL(`../public/trip-constructor/${path}`,import.meta.url));
  const js=await readFile(new URL('../public/trip-constructor/constructor.js',import.meta.url),'utf8'),html=await readFile(new URL('../public/trip-constructor/constructor.html',import.meta.url),'utf8');
  assert.match(js,/import\('\.\/cabin-studio\.mjs'\)/);
  assert.doesNotMatch(js,/import\('\.\/cabin-scene/);
  assert.doesNotMatch(html,/data-camera|roofToggle|Потяните салон|cabinSeats|Нажмите на место|seatmap/);
});
test('Each supported layout maps to distinct positions inside the illustration',()=>{
  for(const capacity of [6,7,8]){
    const plan=automaticCabin(initialState(),capacity);
    assert.equal(plan.assignments.filter(s=>s.front).length,1);
    const points=plan.assignments.map(s=>seatPosition(s,plan.capacity));
    assert.equal(new Set(points.map(p=>`${p.x}:${p.y}`)).size,Math.min(capacity,7));
    for(const p of points){assert.ok(p.x>0&&p.x<1536);assert.ok(p.y>0&&p.y<1024);assert.ok(p.width>0);}
  }
});
test('Every luggage count from zero to maximum is preserved; overflow never vanishes',()=>{
  for(let bags=0;bags<=10;bags++)for(let carry=0;carry<=10;carry++){
    const state={...initialState(),bags,carry,stroller:true,skis:true,pet:true},items=realisticLuggage(state);
    assert.equal(items.length,bags+carry+3);
    assert.equal(items.filter(i=>i.type==='bags').length,bags);
    assert.equal(items.filter(i=>i.type==='carry').length,carry);
    assert.equal(items.filter(i=>i.inside).length,Math.min(bags,4)+Math.min(carry,2));
    for(const item of items.filter(i=>i.inside))assert.ok([item.x,item.y,item.width,item.depth].every(Number.isFinite));
  }
});

// Minimal DOM stand-in: exercises renderer wiring, not browser layout or appearance.
class Element{
  constructor(tag){this.tagName=tag;this.className='';this.children=[];this.style={};this.dataset={};this.attrs={};this.classList={add:(...names)=>this.className+=' '+names.join(' ')};}
  append(...nodes){for(const n of nodes){n.parent=this;this.children.push(n);}}
  replaceChildren(...nodes){this.children=[];this.append(...nodes);}
  setAttribute(k,v){this.attrs[k]=v;}
  focus(){document.activeElement=this;}
  remove(){if(this.parent)this.parent.children=this.parent.children.filter(n=>n!==this);}
}
const walk=node=>[node,...node.children.flatMap(walk)];
test('Studio automatically fills examples without seat controls and exports an unconfirmed layout',async()=>{
  const oldDocument=globalThis.document,oldImage=globalThis.Image;
  globalThis.document={activeElement:null,createElement:tag=>new Element(tag)};
  globalThis.Image=class{set src(value){queueMicrotask(()=>this.onload());}};
  try{
    const container=new Element('div');let reported;
    const state={...initialState(),passengers:2,children:1};
    const studio=await mountCabin(container,{state,capacity:7,onLayout:p=>reported=p});
    const find=cls=>walk(container).filter(n=>n.className.split(' ').includes(cls));
    assert.equal(find('studio-person').length,3); // two passengers plus the driver
    assert.equal(find('studio-packed').length,4);
    assert.equal(find('studio-seat').length,0);assert.equal(studio.choose,undefined);
    assert.equal(reported.assignments.filter(s=>s.front).length,1);
    assert.equal(reported.automatic,true);
    const full={...state,passengers:7,children:3,bags:10,carry:10,stroller:true,pet:true,skiPairs:1,skis:true};
    studio.update(full,7);
    const packed=packCargo(full);
    assert.equal(find('studio-person').length,8);assert.equal(reported.unseated,0);
    assert.equal(find('studio-packed').length,packed.placed.length);assert.equal(find('studio-tray-item').length,0);assert.equal(reported.extraBaggage,packed.unplaced.length);
    for(let foldedSeats=1;foldedSeats<=3;foldedSeats++){
      const folded={...state,passengers:7-foldedSeats,foldedSeats};
      studio.update(folded,7);
      assert.equal(find('studio-person').length,8-foldedSeats);
      assert.equal(find('studio-occlusion').length,8-foldedSeats);
      assert.equal(reported.unseated,0);
    }
    assert.equal(studio.getLayout().placementConfirmed,false);
    studio.destroy();assert.equal(container.children.length,0);
  }finally{globalThis.document=oldDocument;globalThis.Image=oldImage;}
});
test('Image load errors reject cleanly before mounting a partial scene',async()=>{
  const oldImage=globalThis.Image;
  globalThis.Image=class{set src(value){queueMicrotask(()=>this.onerror());}};
  try{const container=new Element('div');await assert.rejects(mountCabin(container,{state:initialState(),capacity:7}),/Не загружено/);assert.equal(container.children.length,0);}
  finally{globalThis.Image=oldImage;}
});
