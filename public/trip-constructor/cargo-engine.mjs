// Primary measurement: RiDC, Hyundai H-1 Travel 2.5 (2009).
// The extended depth and stacking height below are assumptions, NOT Hyundai specs.
export const cargoReference={width:122.5,depth:85,extendedDepth:170,height:60,
  source:'https://new.ridc.org.uk/features-reviews/out-and-about/choosing-car/car/hyundai-h-1-travel-25-5dr-mpv-2009',
  measuredVehicle:'Hyundai H-1 Travel 2.5, 2009',confirmed:false};
export const cargoTypes={
  bags:{label:'Большой чемодан',short:'Ч',width:48,length:75,height:30,asset:'baggage',cell:0,color:'#c5b79b'},
  carry:{label:'Сумка',short:'С',width:30,length:45,height:25,asset:'baggage',cell:2,color:'#315e65'},
  boxes:{label:'Коробка',short:'К',width:40,length:50,height:30,asset:'cargo',cell:0,color:'#bb8756'},
  stroller:{label:'Сложенная коляска',short:'Д',width:55,length:85,height:35,asset:'cargo',cell:1,color:'#677581'},
  skiPairs:{label:'Чехол с парой лыж',short:'Л',width:20,length:180,height:15,asset:'cargo',cell:2,color:'#577b74'},
  snowboards:{label:'Чехол со сноубордом',short:'Б',width:35,length:165,height:12,asset:'cargo',cell:3,color:'#85736b'},
  pet:{label:'Переноска',short:'П',width:40,length:60,height:45,asset:'legacy',cell:3,color:'#d3c9b3'}
};
export const cargoScenarios={
  company:{passengers:7,children:0,foldedSeats:0,bags:4,carry:0,boxes:0,stroller:false,pet:false,skis:false,skiPairs:0,snowboards:0},
  family:{passengers:4,children:2,foldedSeats:3,bags:2,carry:1,boxes:0,stroller:true,pet:false,skis:false,skiPairs:0,snowboards:0},
  luggage:{passengers:4,children:0,foldedSeats:3,bags:6,carry:2,boxes:0,stroller:false,pet:false,skis:false,skiPairs:0,snowboards:0},
  boxes:{passengers:4,children:0,foldedSeats:3,bags:0,carry:0,boxes:12,stroller:false,pet:false,skis:false,skiPairs:0,snowboards:0},
  ski:{passengers:4,children:0,foldedSeats:3,bags:0,carry:0,boxes:0,stroller:false,pet:false,skis:true,skiPairs:4,snowboards:0,skiLength:180},
  board:{passengers:4,children:0,foldedSeats:3,bags:0,carry:0,boxes:0,stroller:false,pet:false,skis:false,skiPairs:0,snowboards:3,boardLength:165},
};
// Presets for a particular folding mode keep the remaining third-row seats free of cargo.
const example=(passengers,foldedSeats,extra)=>({...cargoScenarios.company,passengers,foldedSeats,bags:0,...extra});
export const rowScenarios={
  0:[
    {title:'Полная компания',note:'7 пассажиров · 4 больших чемодана',selection:example(7,0,{bags:4})},
    {title:'Семья налегке',note:'Мама, папа и двое детей · 2 чемодана',selection:example(4,0,{children:2,bags:2})}
  ],
  1:[
    {title:'Шестеро с багажом',note:'6 пассажиров · 4 чемодана и 2 сумки',selection:example(6,1,{bags:4,carry:2})},
    {title:'Коробки и сумки',note:'6 пассажиров · 4 коробки и 2 сумки',selection:example(6,1,{boxes:4,carry:2})},
    {title:'С доской',note:'5 пассажиров · 1 чехол 165 см и 2 чемодана',selection:example(5,1,{snowboards:1,boardLength:165,bags:2})}
  ],
  2:[
    {title:'Семья с коляской',note:'5 пассажиров · коляска и 2 чемодана',selection:example(5,2,{children:2,stroller:true,bags:2})},
    {title:'Пятеро надолго',note:'5 пассажиров · 6 больших чемоданов',selection:example(5,2,{bags:6})},
    {title:'Пятеро с коробками',note:'5 пассажиров · 8 коробок',selection:example(5,2,{boxes:8})}
  ],
  3:[
    {title:'Семейная поездка',note:'Мама, папа, мальчик и девочка · коляска',selection:{...cargoScenarios.family}},
    {title:'Большой багаж',note:'4 пассажира · 6 чемоданов и 2 сумки',selection:{...cargoScenarios.luggage}},
    {title:'Коробки',note:'4 пассажира · 12 коробок',selection:{...cargoScenarios.boxes}}
  ]
};
export function passengerLimit(state,modelSeats=7){return Math.min(modelSeats,7-(state.foldedSeats||0));}
export function itemsFor(state){
  const items=[];
  for(const [type,definition] of Object.entries(cargoTypes)){
    const count=type==='skiPairs'?(state.skiPairs??Number(state.skis)):Number(state[type]||0);
    const length=type==='skiPairs'?(state.skiLength||180):type==='snowboards'?(state.boardLength||165):definition.length;
    for(let i=0;i<count;i++)items.push({...definition,type,id:type+'-'+i,length});
  }
  return items;
}
const overlap=(a,b)=>a.x<b.x+b.w-.01&&a.x+a.w>b.x+.01&&a.y<b.y+b.d-.01&&a.y+a.d>b.y+.01;
export function cargoDimensions(state){return {...cargoReference,extendedDepth:state.extendedDepth||170,foldedSeats:state.foldedSeats||0};}
export function insideCargo(p,dims){
  if(p.x<1||p.y<1||p.x+p.w>dims.width-1||p.y+p.d>dims.extendedDepth-1)return false;
  if(p.y+p.d>dims.depth-1&&(!dims.foldedSeats||p.x<dims.width*(3-dims.foldedSeats)/3+1))return false;
  return p.z>=0&&p.z+p.height<=dims.height;
}
function poses(item){
  const angles=['skiPairs','snowboards'].includes(item.type)?Array.from({length:91},(_,i)=>i):[0,90];
  return angles.map(angle=>{const r=angle*Math.PI/180;return {angle,w:Math.round((item.width*Math.cos(r)+item.length*Math.sin(r))*10)/10,d:Math.round((item.length*Math.cos(r)+item.width*Math.sin(r))*10)/10};});
}
function supported(p,placed){
  if(p.z===0)return true;
  if(p.type==='pet'||p.type==='stroller')return false;
  return placed.some(b=>Math.abs(b.z+b.height-p.z)<.01&&b.type!=='pet'&&b.type!=='stroller'&&
    (['bags','boxes'].includes(b.type)||b.type===p.type)&&
    p.x>=b.x-.01&&p.y>=b.y-.01&&p.x+p.w<=b.x+b.w+.01&&p.y+p.d<=b.y+b.d+.01);
}
function packWithStrategy(state,rowPenalty){
  const dims=cargoDimensions(state),items=itemsFor(state),placed=[],unplaced=[];
  const ordered=[...items].sort((a,b)=>b.length*b.width-a.length*a.width);
  for(const item of ordered){
    const xs=[1,dims.width*(3-dims.foldedSeats)/3+1,...placed.flatMap(p=>[p.x,p.x+p.w+1])];
    const zs=[0,...new Set(placed.map(p=>p.z+p.height))].filter(z=>z+item.height<=dims.height);
    let best=null,score=Infinity;
    for(const pose of poses(item)){
      // Load from the inner end toward the rear door, leaving small gaps, not
      // isolated objects on the threshold. Only genuine free strips can extend.
      const ys=[1,dims.depth,dims.depth-pose.d-1,dims.extendedDepth-pose.d-1,...placed.flatMap(p=>[p.y,p.y+p.d+1,p.y-pose.d-1])];
      for(const z of zs)for(const y of ys)for(const x of xs){
      const p={...item,...pose,x,y,z};
      if(!insideCargo(p,dims)||!supported(p,placed))continue;
      if(placed.some(b=>p.z<b.z+b.height-.01&&p.z+p.height>b.z+.01&&overlap(p,b)))continue;
      const crossesRow=dims.foldedSeats&&p.y<dims.depth&&p.y+p.d>dims.depth;
      const rank=z*100000+(crossesRow?rowPenalty:0)-(y+pose.d)*100+x+pose.w*pose.d/100000;
      if(rank<score){best=p;score=rank;}
      }
    }
    if(best)placed.push(best);else unplaced.push(item);
  }
  return {dims,items,placed,unplaced,confirmed:false,method:'conservative-rectangular-envelopes',
    note:'Оценка по габаритам. Не проверены масса, крепление, проём, ступень сложенных кресел и нагрузка на спинки.'};
}
export function packCargo(state){
  const zoned=packWithStrategy(state,25000),continuous=packWithStrategy(state,0);
  return zoned.placed.length>=continuous.placed.length?zoned:continuous;
}
export function itemSummary(items){
  return Object.keys(cargoTypes).map(type=>{const n=items.filter(i=>i.type===type).length;return n?cargoTypes[type].label+': '+n:null;}).filter(Boolean).join(' · ')||'Без багажа';
}
