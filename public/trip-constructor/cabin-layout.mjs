// Illustrative layouts, deliberately NOT manufacturer seat plans or packing estimates.
export function cabinSlots(capacity) {
  const front = capacity === 8
    ? [{id:'front-a',x:0.14,z:-1.86,front:true},{id:'front-b',x:0.85,z:-1.86,front:true}]
    : [{id:'front-a',x:0.64,z:-1.86,front:true}];
  const middle = capacity === 6 ? [-0.72,0.72] : [-0.76,0,0.76];
  return [...middle.map((x,i)=>({id:`middle-${i}`,x,z:-0.43,front:false})),
    ...[-0.76,0,0.76].map((x,i)=>({id:`rear-${i}`,x,z:1.02,front:false})),...front]
    .map((s,i)=>({...s,number:i+1}));
}
export function planCabin(state,capacity,previous=[]) {
  const slots=cabinSlots(capacity),ids=new Set(slots.map(s=>s.id));
  const order=[...new Set([...previous.filter(id=>ids.has(id)),...slots.map(s=>s.id)])];
  const occupied=order.slice(0,Math.min(state.passengers,capacity));
  const childSeats=occupied.filter(id=>!slots.find(s=>s.id===id).front).slice(0,state.children);
  // A newly selected family preset always has enough rear seats available.
  for(const id of order.filter(id=>!occupied.includes(id)&&!slots.find(s=>s.id===id).front)) {
    if(childSeats.length>=state.children)break;
    const replace=occupied.findIndex(seat=>slots.find(s=>s.id===seat).front);
    if(replace<0)break;occupied[replace]=id;childSeats.push(id);
  }
  const assignments=slots.map(s=>({...s,kind:childSeats.includes(s.id)?'child':occupied.includes(s.id)?'adult':'empty'}));
  return {illustrative:true,capacity,assignments,order:[...occupied,...order.filter(id=>!occupied.includes(id))],
    unseated:Math.max(0,state.passengers-capacity),
    luggage:{bags:state.bags,carry:state.carry,stroller:state.stroller,skis:state.skis,pet:state.pet},
    placementConfirmed:false};
}
export function movePassenger(plan,from,to) {
  const source=plan.assignments.find(s=>s.id===from),target=plan.assignments.find(s=>s.id===to);
  if(!source||!target||source.kind==='empty'||target.kind!=='empty')return null;
  if(source.kind==='child'&&target.front)return null;
  return plan.order.map(id=>id===from?to:id===to?from:id);
}
