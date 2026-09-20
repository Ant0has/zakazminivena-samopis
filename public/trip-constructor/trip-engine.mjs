import {calculateQuote} from './pricing.mjs';
import {packCargo,passengerLimit,itemSummary,cargoScenarios} from './cargo-engine.mjs';
// Fleet examples are informational, never a selected or guaranteed vehicle.
export const models = [
  {id:'vw-caravelle', name:'Volkswagen Caravelle', short:'Caravelle', brand:'Volkswagen', image:'caravelle-outdoor-1280.jpg'},
  {id:'hyundai-starex', name:'Hyundai Starex / H‑1', short:'Starex / H‑1', brand:'Hyundai', image:'starex-960.jpg'},
  {id:'kia-carnival-iv', name:'Kia Carnival IV', short:'Carnival IV', brand:'Kia', image:'carnival-iv-960.jpg'},
];
// Capacity belongs to this calculator's illustrative minivan category, not every fleet trim.
export const tripCapacity=7;
export const presets = {
  couple:{...cargoScenarios.company,passengers:2,bags:0,carry:2},
  family:{...cargoScenarios.family},
  friends:{...cargoScenarios.company},
  snow:{...cargoScenarios.ski},
};
export function localDate(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function initialState(){return {from:'Казань',to:'Самара',date:'',returnTrip:false,returnDate:'',passengers:4,children:0,bags:2,carry:2,stroller:false,skis:false,pet:false,foldedSeats:0,boxes:0,skiPairs:0,snowboards:0,skiLength:180,boardLength:165,extendedDepth:170};}
export function landingState(query){
  let state=initialState();
  if(query.get('empty')==='1')state=updateState(state,{from:'',to:''});
  const scenario=query.get('scenario');
  if(['family','luggage','ski'].includes(scenario))state=updateState(state,cargoScenarios[scenario]);
  else if(/^[5-7]$/.test(query.get('passengers')||'')){
    const passengers=Number(query.get('passengers'));
    state=updateState(state,{passengers,foldedSeats:7-passengers});
  }
  return state;
}
export function validDate(v){if(!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;const d=new Date(v+'T12:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===v;}
export function updateState(state, patch){
  if(!patch||typeof patch!=='object'||Array.isArray(patch))throw new Error('Нужен объект настроек поездки.');
  const known=new Set(Object.keys(initialState()));
  for(const k of Object.keys(patch))if(!known.has(k))throw new Error(`Неизвестная опция: ${k}`);
  const next={...state,...patch};
  if(Object.hasOwn(patch,'skis')&&!Object.hasOwn(patch,'skiPairs'))next.skiPairs=patch.skis?Math.max(1,next.skiPairs):0;
  next.skis=next.skiPairs>0;
  for(const k of ['from','to']){if(typeof next[k]!=='string'||next[k].length>100)throw new Error('Название города: не более 100 символов.');next[k]=next[k].trim();}
  for(const [k,min,max]of [['passengers',1,7],['children',0,3],['bags',0,10],['carry',0,10],['foldedSeats',0,3],['boxes',0,24],['skiPairs',0,8],['snowboards',0,8],['skiLength',120,220],['boardLength',120,200],['extendedDepth',130,230]])if(!Number.isInteger(next[k])||next[k]<min||next[k]>max)throw new Error(`Недопустимое значение ${k}: от ${min} до ${max}.`);
  for(const k of ['returnTrip','stroller','skis','pet'])if(typeof next[k]!=='boolean')throw new Error(`Опция ${k} должна быть true или false.`);
  for(const k of ['date','returnDate'])if(typeof next[k]!=='string'||next[k]!==''&&!validDate(next[k]))throw new Error('Проверьте дату поездки.');
  if(next.children>next.passengers)throw new Error('Количество детских кресел не может превышать число пассажиров.');
  if(next.passengers>passengerLimit(next,tripCapacity))throw new Error('При этой компоновке недостаточно пассажирских мест.');
  return next;
}
export function routeFor(state,routes){const norm=s=>s.trim().toLocaleLowerCase('ru-RU').replaceAll('ё','е');return routes.find(r=>norm(r.from)===norm(state.from)&&norm(r.to)===norm(state.to))??null;}
export function quoteFor(state,routes){const route=routeFor(state,routes);if(!route)return {kind:'individual',amount:null,km:null,hours:null,slug:null};const q=calculateQuote(route.pricingDistanceM??route.rawDistanceM??route.km*1000);return {kind:'comfort-from',amount:q.price,km:q.distanceKm,hours:route.hours,slug:route.slug,coefficient:q.coefficient,distanceStatus:route.distanceStatus};}
export function validateDraft(state,today=localDate()){
  const errors=[];
  if(!state.from||!state.to)errors.push('Укажите точки отправления и прибытия.');
  if(state.from&&state.from.toLocaleLowerCase()===state.to.toLocaleLowerCase())errors.push('Выберите разные города.');
  if(!state.date)errors.push('Выберите дату поездки.');else if(state.date<today)errors.push('Дата поездки уже прошла.');
  if(state.returnTrip&&(!state.returnDate||state.returnDate<state.date||state.returnDate<today))errors.push('Выберите обратную дату не раньше выезда.');
  if(state.passengers>passengerLimit(state,tripCapacity))errors.push(`В выбранной компоновке доступно до ${passengerLimit(state,tripCapacity)} пассажирских мест. Измените число пассажиров или режим кресел.`);
  return errors;
}
export function snapshot(state,routes,today=localDate()){
  const quote=quoteFor(state,routes);
  return {status:'draft_not_sent',selection:{...state},vehicle:{category:'minivan',model:null,assignment:'to_be_confirmed',fleetExamples:models.map(m=>m.name)},cargo:packCargo(state),quote:{...quote,note:'Цена от за весь минивэн «Комфорт» в одну сторону. Итоговая стоимость с адресами и опциями подтверждается до заказа.'},errors:validateDraft(state,today),requiresConfirmation:['Подача и конкретный автомобиль','Размещение багажа и снаряжения','Размеры багажника, механизм сидений, масса и крепление груза',...(state.children?['Возраст и параметры детей, тип кресел']:[]),...(state.pet?['Условия перевозки питомца']:[]),...(state.returnTrip?['Цена и условия обратной поездки']:[]),'Итоговая стоимость'],sent:false};
}
export function briefText(draft){const s=draft.selection;return [`ZM · черновик поездки — НЕ ОТПРАВЛЕН`,`${s.from} → ${s.to}`,`Выезд: ${s.date||'не выбран'}${s.returnTrip?', обратно: '+(s.returnDate||'не выбрано'):''}`,`Пассажиров: ${s.passengers} (включая детей, без водителя)`,`Детских кресел: ${s.children}; возраст детей нужно уточнить`,`Чемоданов: ${s.bags}; ручная кладь: ${s.carry}`,`Сложено кресел 3-го ряда: ${s.foldedSeats||0}; коробок: ${s.boxes||0}`,`Лыжи: ${s.skiPairs||0} пар, чехол ${s.skiLength||180} см; сноуборды: ${s.snowboards||0}, чехол ${s.boardLength||165} см`,`Длина зоны со сложенным рядом: ${s.extendedDepth||170} см — допущение, нужен замер`,`Не размещено в геометрическом эскизе: ${draft.cargo?.unplaced.length?itemSummary(draft.cargo.unplaced):'нет'}; вместимость НЕ подтверждена`,`Дополнительно: ${[s.stroller&&'коляска',s.skis&&'лыжи / сноуборд',s.pet&&'питомец'].filter(Boolean).join(', ')||'не выбрано'}`,`Автомобиль: минивэн; конкретная модель будет согласована перед поездкой`,`Базовый ориентир: ${draft.quote.amount===null?'индивидуальный расчёт':'от '+draft.quote.amount.toLocaleString('ru-RU')+' ₽ за автомобиль в одну сторону'}`,draft.quote.note,`Подтвердить: ${draft.requiresConfirmation.join('; ')}.`].join('\n');}
