// Coordinates belong to our generated 1536 × 1024 illustration, not a vehicle plan.
export const studioAssets={body:'h1-studio-v3.png',people:'h1-family-v5.png',baggage:'h1-baggage-v3.png',cargo:'h1-cargo-v4.png',fold1:'h1-fold1-v5.png',fold2:'h1-fold2-v5.png',fold3:'h1-fold3-v4.png',legacy:'h1-luggage-v2.png'};
export function seatPosition(seat,capacity){
  const middle=[[652,315],[749,253],[843,199]],rear=[[932,449],[1033,380],[1110,326]];
  let point;
  if(seat.id.startsWith('middle-'))point=middle[capacity===6&&seat.id==='middle-1'?2:Number(seat.id.at(-1))];
  else if(seat.id.startsWith('rear-'))point=rear[Number(seat.id.at(-1))];
  else point=[644,92];
  return {x:point[0],y:point[1],width:218};
}
export const driverPosition={x:426,y:224,width:218};

// Same source image above people hides bodies behind the actual seat backs.
// These are clipping boundaries only; no replacement vehicle illustration is drawn.
export const seatOcclusion=[
  [[449,224],[481,231],[497,263],[490,288],[519,300],[517,333],[492,390],[426,368],[395,335],[411,309],[432,295],[421,268],[429,240]],
  [[670,98],[701,103],[716,141],[711,158],[731,174],[727,218],[700,278],[668,313],[602,308],[607,266],[638,210],[641,166],[633,140],[640,114]],
  [[679,316],[704,327],[719,363],[714,378],[744,397],[751,418],[680,520],[586,462],[620,401],[651,384],[651,358],[660,332]],
  [[779,249],[803,260],[819,296],[815,310],[843,331],[842,367],[778,466],[697,425],[714,378],[752,328],[750,291],[757,267]],
  [[877,201],[901,211],[916,249],[913,269],[935,286],[924,329],[876,413],[795,375],[817,329],[843,277],[841,243],[851,218]],
  [[963,442],[988,452],[1007,490],[1000,507],[1030,526],[1037,550],[982,636],[875,594],[897,542],[926,519],[924,487],[936,464]],
  [[1065,384],[1087,394],[1102,432],[1097,448],[1121,464],[1117,502],[1061,583],[992,556],[1005,511],[1032,456],[1026,432],[1040,404]],
  [[1140,335],[1166,348],[1180,382],[1175,399],[1200,418],[1191,457],[1145,535],[1076,503],[1099,449],[1122,407],[1116,374],[1125,348]]
];
export const luggageTypes={bags:{cell:0,label:'Чемодан'},carry:{cell:1,label:'Ручная кладь'},stroller:{cell:2,label:'Коляска'},pet:{cell:3,label:'Переноска'},skis:{cell:4,label:'Лыжи / сноуборд'}};
export function studioLuggage(state){
  const items=[];
  for(const [type,spec] of Object.entries(luggageTypes)){
    const count=Number(state[type]);
    for(let i=0;i<count;i++)items.push({id:`${type}-${i}`,type,...spec,inside:(type==='bags'&&i<3)||(type==='carry'&&i<2)});
  }
  return items;
}
export function packingPosition(item){
  const i=Number(item.id.split('-').at(-1));
  return item.type==='bags'
    ? [{x:1191,y:707,width:110},{x:1261,y:659,width:104},{x:1327,y:611,width:100}][i]
    : [{x:1110,y:662,width:102},{x:1180,y:615,width:94}][i];
}
