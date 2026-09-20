import {planCabin} from './cabin-layout.mjs';

export const baggagePresets={light:{bags:0,carry:2},weekend:{bags:2,carry:2},holiday:{bags:4,carry:2}};

// Automatic examples only: no seat selection or stored manual placement.
// This illustration always has exactly one passenger seat beside the driver.
export function automaticCabin(state,catalogueCapacity){
  if(state.foldedSeats){
    const remaining=['rear-0','rear-1','rear-2'].slice(0,3-state.foldedSeats);
    const order=['middle-0','middle-2','middle-1',...remaining,'front-a'];
    const p=planCabin(state,7,order);
    return {...p,assignments:p.assignments.filter(s=>!s.id.startsWith('rear-')||remaining.includes(s.id)),
      capacity:Math.min(catalogueCapacity,7-state.foldedSeats),catalogueCapacity,
      unseated:Math.max(0,state.passengers-Math.min(catalogueCapacity,7-state.foldedSeats)),automatic:true,
      caption:state.foldedSeats===3?'До 4 пассажиров + увеличенный багажник':'Часть третьего ряда отдана багажу'};
  }
  const capacity=Math.min(catalogueCapacity,7);
  const middle=capacity===6?['middle-0','middle-1']:['middle-0','middle-2'];
  const central=capacity===6?[]:['middle-1'];
  const n=Math.min(state.passengers,capacity);
  const order=n===1?[middle[0],middle[1],...central,'rear-0','rear-2','rear-1','front-a']
    :n===2?[...middle,...central,'rear-0','rear-2','rear-1','front-a']
    :n===3?[...middle,...central,'rear-0','rear-2','rear-1','front-a']
    :n===4?[...middle,'rear-0','rear-2',...central,'rear-1','front-a']
    :n===5?[...middle,'rear-0','rear-1','rear-2',...central,'front-a']
    :[...middle,...central,'rear-0','rear-1','rear-2','front-a'];
  const plan=planCabin(state,capacity,order);
  return {...plan,catalogueCapacity,unseated:Math.max(0,state.passengers-catalogueCapacity),
    visualOverflow:Math.max(0,state.passengers-capacity),automatic:true,
    caption:state.children?'Семейная поездка':n<=2?'Больше свободного пространства':n<=5?'Вместе в задних рядах':'Вся компания в одном салоне'};
}

// Poses are illustrative, not a physical packing/volume calculation.
export function realisticLuggage(state){
  const items=[];
  const spots=[{x:1190,y:752,width:218,depth:2,cell:0},{x:1290,y:663,width:204,depth:0,cell:1},
    {x:1190,y:712,width:218,depth:3,cell:0},{x:1290,y:623,width:204,depth:1,cell:1}];
  for(let i=0;i<state.bags;i++)items.push({id:'bags-'+i,type:'bags',inside:i<4,...(spots[i]??{})});
  for(let i=0;i<state.carry;i++)items.push({id:'carry-'+i,type:'carry',inside:i<2,cell:2,
    ...([{x:1113,y:662,width:150,depth:4},{x:1223,y:572,width:140,depth:5}][i]??{})});
  for(const type of ['stroller','skis','pet'])if(state[type])items.push({id:type,type,inside:false});
  return items;
}
