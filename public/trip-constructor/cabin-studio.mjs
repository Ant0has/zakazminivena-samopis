import {automaticCabin} from './cabin-composition.mjs';
import {packCargo} from './cargo-engine.mjs';
import {cargoImageBox,projectedPoint} from './cargo-view.mjs';
import {studioAssets,seatPosition,driverPosition,seatOcclusion} from './cabin-studio-layout.mjs';
import {characterRoster} from './family-characters.mjs';

const make=(tag,className)=>{const node=document.createElement(tag);node.className=className;return node;};
function picture(src,className){const img=make('img',className);img.src=src;img.alt='';img.draggable=false;return img;}
function sprite(type,cell){
  const node=make('span',`studio-sprite studio-${type}`),img=picture(studioAssets[type],'');
  img.style.left=`-${(['cargo','people'].includes(type)?cell%2:cell)*100}%`;
  if(type==='cargo')img.style.top=`-${Math.floor(cell/2)*100}%`;
  if(type==='people'){
    const h=cell<2?675:579;node.style.aspectRatio=`627 / ${h}`;
    img.style.height='auto';img.style.top=cell<2?'0':`-${675/h*100}%`;
  }
  node.append(img);node.setAttribute('aria-hidden','true');return node;
}
function position(node,{x,y,width},anchorX=.69,anchorY=.24,ratio=1){
  node.style.left=`${(x-width*anchorX)/1536*100}%`;
  node.style.top=`${(y-width/ratio*anchorY)/1024*100}%`;
  node.style.width=`${width/1536*100}%`;
}
function preload(src){return new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=()=>reject(new Error(`Не загружено изображение ${src}`));img.src=src;});}

export async function mountCabin(container,{state,capacity,onLayout}){
  await Promise.all(Object.values(studioAssets).map(preload));
  const root=make('div','studio-root'),frame=make('div','studio-frame'),layers=make('div','studio-layers');
  const base=picture(studioAssets.body,'studio-body');base.alt='Серебристый минивэн без логотипов: вид сзади-сверху, открытый салон и багажник';
  frame.append(base,layers);root.append(frame);container.append(root);
  let current=state,plan=automaticCabin(state,capacity);
  function render(){
    layers.replaceChildren();
    const folded=current.foldedSeats||0,bodySrc=folded===3?studioAssets.fold3:studioAssets.body;
    base.src=bodySrc;
    if(folded===1||folded===2){
      // Accept only the folded region. Generated upright-seat drift is excluded.
      const patch=picture(studioAssets['fold'+folded],'studio-layer-patch');
      patch.style.clipPath=folded===1?'polygon(72% 30%,89% 35%,90% 69%,73% 72%,68% 56%,70% 45%)':'polygon(67% 29%,88% 31%,91% 70%,71% 72%,61% 56%,60% 46%)';
      layers.append(patch);
    }
    const roster=characterRoster(plan),cabinOverlays=[];
    const occupants=[{driver:true,kind:'adult',cell:0,point:driverPosition},...roster.map(s=>({...s,point:seatPosition(s,7)}))];
    for(const person of occupants.sort((a,b)=>a.point.y-b.point.y)){
      const node=sprite('people',person.cell);node.classList.add('studio-person');node.dataset.character=person.driver?'driver':person.character.id;
      if(person.driver)node.classList.add('studio-driver');
      const anchors=[[443/627,110/675],[393/627,125/675],[443/627,95/579],[378/627,105/579]];
      const [ax,ay]=anchors[person.cell];
      position(node,{...person.point,width:person.kind==='child'?178:198},ax,ay,person.cell<2?627/675:627/579);
      if(person.front){node.style.transform='skewX(-16deg)';node.style.transformOrigin=`${ax*100}% ${ay*100}%`;}
      cabinOverlays.push(node);
    }
    const visibleMasks=seatOcclusion.filter((_,i)=>i<5||i<8-folded);
    for(const polygon of visibleMasks){
      const mask=picture(bodySrc,'studio-occlusion');
      mask.style.clipPath=`polygon(${polygon.map(([x,y])=>`${x/1536*100}% ${y/1024*100}%`).join(',')})`;
      cabinOverlays.push(mask);
    }
    const consoleCover=picture(studioAssets.body,'studio-body-mask');
    consoleCover.style.clipPath='polygon(30% 23%,35% 22%,41% 26%,41% 32%,37% 38%,31% 34%,30% 30%)';
    cabinOverlays.push(consoleCover);
    const packing=packCargo(current);
    const project=(x,y,z=0)=>projectedPoint(x,y,z,packing.dims.extendedDepth);
    const drawOrder=[...packing.placed].sort((a,b)=>{
      const depth=i=>project(i.x+i.w/2,i.y+i.d/2)[1]+i.z*.1;
      return depth(a)-depth(b);
    });
    for(const item of drawOrder){
      const cell=item.type==='bags'&&item.angle===90?1:item.cell;
      const node=sprite(item.asset,cell);node.classList.add('studio-packed');
      const box=cargoImageBox(item,packing.dims.extendedDepth);
      if(['skiPairs','snowboards'].includes(item.type)){
        const r=item.angle*Math.PI/180;
        const a=project(item.x,item.y),b=project(item.x+Math.sin(r)*item.length,item.y+Math.cos(r)*item.length);
        box.width=Math.hypot(b[0]-a[0],b[1]-a[1])/1.18;
        const angle=Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI+180-45;
        node.style.transform=`rotate(${angle}deg)`;
      }
      position(node,box,.5,.5,item.asset==='legacy'?.6:1);layers.append(node);
    }
    // Upright occupants and seat backs occlude the rear cargo layer.
    layers.append(...cabinOverlays);
    // Keep passengers and luggage behind the actual near-side bodywork.
    const sill=picture(bodySrc,'studio-body-mask');
    sill.style.clipPath='polygon(3% 22%,15% 30%,26% 37%,39% 46%,52% 54.5%,66% 63.5%,72% 66%,68% 79%,57% 84%,31% 67%,13% 50%,2% 34%)';
    layers.append(sill);
    frame.setAttribute('role','img');
    frame.setAttribute('aria-label',`Пример: ${current.passengers} пассажиров, детей ${current.children}, водитель отдельно. Сложено кресел третьего ряда: ${folded}. В эскизе размещено ${packing.placed.length} из ${packing.items.length} предметов. Вместимость не подтверждена.`);
    onLayout?.({...plan,roster,extraBaggage:packing.unplaced.length,packing,visualStyle:'automatic-studio-illustration'});
  }
  render();
  return {update(next,nextCapacity){current=next;plan=automaticCabin(next,nextCapacity);render();},
    getLayout(){return {...plan,visualStyle:'automatic-studio-illustration',vehicleModel:'unbranded-concept',placementConfirmed:false};},
    destroy(){root.remove();}};
}
