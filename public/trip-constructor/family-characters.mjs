// Fictional visual examples, never demographic information about the customer.
export const characterTypes=[
  {id:'father',cell:0,label:'Папа',group:'adult'},
  {id:'mother',cell:1,label:'Мама',group:'adult'},
  {id:'boy',cell:2,label:'Мальчик',group:'child'},
  {id:'girl',cell:3,label:'Девочка',group:'child'}
];
export function characterRoster(plan,variation=0){
  let adult=0,child=0;
  return plan.assignments.filter(s=>s.kind!=='empty').map(seat=>{
    const cell=seat.kind==='child'?2+(child++ +variation)%2:(adult++ +1+variation)%2;
    return {...seat,character:characterTypes[cell],cell};
  });
}
