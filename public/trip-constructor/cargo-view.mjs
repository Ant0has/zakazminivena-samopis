import {packCargo,itemSummary,cargoTypes,cargoReference} from './cargo-engine.mjs';
const fmt=n=>String(Math.round(n*10)/10).replace('.',',');
// A dimensioned data diagram, separate from the illustrative vehicle image.
export function renderCargoPlan(root,state){
  const p=packCargo(state),d=p.dims,H=state.foldedSeats?d.extendedDepth:d.depth;
  const blocked=state.foldedSeats?d.width*(3-state.foldedSeats)/3:0;
  const groups=new Map();
  for(const item of p.placed){const key=[item.x,item.y,item.w,item.d,item.type].join(':');const group=groups.get(key)||{...item,count:0};group.count++;groups.set(key,group);}
  const shapes=[...groups.values()].map(i=>{
    const cx=i.x+i.w/2,cy=H-i.y-i.d/2;
    return `<g><rect x="${i.x}" y="${H-i.y-i.d}" width="${i.w}" height="${i.d}" fill="none" stroke="${i.color}" stroke-dasharray="1 2" stroke-width=".4"/><rect x="${cx-i.width/2}" y="${cy-i.length/2}" width="${i.width}" height="${i.length}" rx="1.5" fill="${i.color}" stroke="white" stroke-width=".8" transform="rotate(${-i.angle} ${cx} ${cy})"/><text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" fill="white" font-size="7" font-weight="600">${i.short}${i.count>1?' ×'+i.count:''}</text><title>${i.label}: ${i.count}; ${i.length}×${i.width}×${i.height} см</title></g>`;
  }).join('');
  root.innerHTML=`<div class="packing-plan"><p class="packing-plan-label">ВИД СВЕРХУ · САНТИМЕТРЫ</p><svg viewBox="-15 -13 ${d.width+30} ${H+27}" role="img" aria-label="Оценочная схема груза сверху: ${p.placed.length} предметов размещено, ${p.unplaced.length} не размещено"><rect width="${d.width}" height="${H}" rx="3" fill="#ecf0e9" stroke="#a9b9aa" stroke-width=".7"/>${blocked?`<rect x="0" y="0" width="${blocked}" height="${H-d.depth}" fill="#d2d9d0"/><text x="${blocked/2}" y="${(H-d.depth)/2}" text-anchor="middle" fill="#66776a" font-size="6">КРЕСЛА</text>`:''}${shapes}<text x="${d.width/2}" y="-5" text-anchor="middle" font-size="6" fill="#64796a">${fmt(d.width)} см</text><text transform="translate(${d.width+10},${H/2}) rotate(90)" text-anchor="middle" font-size="6" fill="#64796a">${fmt(H)} см${state.foldedSeats?' *':''}</text><text x="${d.width/2}" y="${H+10}" text-anchor="middle" font-size="6" fill="#64796a">ДВЕРЬ БАГАЖНИКА</text></svg></div>
  <div class="packing-result"><p class="composition-kicker">ОЦЕНКА ПО ГАБАРИТАМ</p><h3>${p.placed.length} из ${p.items.length} предметов в эскизе</h3><p>${itemSummary(p.items)}</p>${p.unplaced.length?`<p class="packing-alert">Не размещено: ${itemSummary(p.unplaced)}. Попробуйте другой режим или уточните размеры.</p>`:'<p class="packing-caveat">Эскиз не подтверждает реальную вместимость.</p>'}<p class="packing-footnote">${state.foldedSeats?'* Длина '+d.extendedDepth+' см после трансформации — ваше допущение, не заводской размер.':'Базовый пол 85 × 122,5 см — замер H‑1 Travel 2009, не всех версий Starex.'} Высота укладки в модели — 60 см. Нужны проверка механизма кресел, массы и крепления груза.</p></div>`;
  return p;
}

// Approximate projective registration against our generated illustration.
// Authoritative rectangles and dimensions remain in the separate top view.
export function projectedPoint(x,y,z=0,extendedDepth=170){
  const rear=[[1140,806],[1360,640]],middle=[[1043,638],[1250,493]],front=[[875,581],[1165,421]];
  // Register different measured lengths into the same illustrative cargo bay.
  // The dimensioned top view, not this perspective image, carries the scale.
  const t=y<=85?y/85:(y-85)/(extendedDepth-85),from=y<=85?rear:middle,to=y<=85?middle:front;
  const edge=from.map((p,i)=>p.map((v,j)=>v+(to[i][j]-v)*t));
  const u=x/cargoReference.width;
  return [edge[0][0]+(edge[1][0]-edge[0][0])*u,edge[0][1]+(edge[1][1]-edge[0][1])*u-z*1.45];
}
export function cargoImageBox(item,extendedDepth=170){
  const corners=[[item.x,item.y],[item.x+item.w,item.y],[item.x,item.y+item.d],[item.x+item.w,item.y+item.d]].map(([x,y])=>projectedPoint(x,y,item.z,extendedDepth));
  const xs=corners.map(p=>p[0]),ys=corners.map(p=>p[1]);
  const width=Math.max(...xs)-Math.min(...xs),height=Math.max(...ys)-Math.min(...ys);
  const center=projectedPoint(item.x+item.w/2,item.y+item.d/2,item.z+item.height*.35,extendedDepth);
  return {x:center[0],y:center[1],width:Math.max(width,height)*1.04};
}
