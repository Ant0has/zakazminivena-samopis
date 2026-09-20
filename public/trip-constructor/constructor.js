import {buildOrderPayload} from './order.mjs';
import {leadTracking} from '../../src/lib/lead-attribution.ts';
import {tripCapacity,presets,landingState,updateState,quoteFor,snapshot,briefText,localDate} from './trip-engine.mjs';
import {baggagePresets} from './cabin-composition.mjs';
import {cargoScenarios,rowScenarios,passengerLimit} from './cargo-engine.mjs';
import {renderCargoPlan} from './cargo-view.mjs';
document.querySelectorAll('img[data-src]').forEach(img=>{img.src=img.dataset.src;delete img.dataset.src;});
const routes=window.ZM_TRIP.routes;const el=id=>document.getElementById(id);const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const query=new URLSearchParams(location.search);const embedded=query.get('embed')==='1';
let state=landingState(query),currentPreset='',draft=null,cabin=null;
if(embedded)document.body.classList.add('embedded');
let contextUrl=location.href;
try{if(parent!==window&&parent.location.origin===location.origin)contextUrl=parent.location.href;}catch{}
const parentQuery=new URL(contextUrl).searchParams;
const selectedPath=query.get('route')||parentQuery.get('route');
const selectedRoute=routes.find(r=>r.id===selectedPath||r.pages?.includes(selectedPath));
if(selectedRoute)state=updateState(state,{from:selectedRoute.from,to:selectedRoute.to});
else if(query.get('from')||query.get('to')||parentQuery.get('from')||parentQuery.get('to'))state=updateState(state,{from:query.get('from')||parentQuery.get('from')||'',to:query.get('to')||parentQuery.get('to')||''});
let pendingCalculation=null;
el('cabinSidebar').prepend(document.querySelector('.people-panel'));
const tripSnapshot=()=>({...snapshot(state,routes),visualization:cabin?.getLayout()??null});
const cities=[...new Set(routes.flatMap(r=>[r.from,r.to]))].sort((a,b)=>a.localeCompare(b,'ru'));
cities.forEach(city=>{const o=document.createElement('option');o.value=city;el('cities').append(o);});
el('date').min=localDate();el('returnDate').min=localDate();
const quickRoutes=[['Казань','Самара'],['Екатеринбург','Тюмень'],['Екатеринбург','Челябинск']];
quickRoutes.forEach(([from,to])=>{const b=document.createElement('button');b.textContent=`${from} → ${to}`;b.onclick=()=>change({from,to});el('routeLinks').append(b);});
function readableDate(s){return s?new Date(s+'T12:00:00').toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'}):'';}
function plural(n){return n===1?'пассажир':n>=2&&n<=4?'пассажира':'пассажиров';}
function change(patch,{preset='',announce=true}={}){const next=updateState(state,patch);state=next;currentPreset=preset;el('errors').textContent='';render();if(announce)el('announcer').textContent=`${state.from} — ${state.to}. ${state.passengers} ${plural(state.passengers)}, чемоданов: ${state.bags}. Выбор обновлён.`;return tripSnapshot();}
function render(){
  const q=quoteFor(state,routes);
  cabin?.update(state,tripCapacity);
  const maxPeople=passengerLimit(state,tripCapacity);
  renderCargoPlan(el('cargoPlan'),state);
  const rowTitles=['Все три кресла подняты','Одно сложено · два подняты','Два сложены · одно поднято','Третий ряд полностью сложен'];
  el('rowTitle').textContent=rowTitles[state.foldedSeats];
  const focusedExample=document.activeElement?.closest('[data-row-example]')?.dataset.rowExample;
  el('rowExamples').innerHTML=rowScenarios[state.foldedSeats].map((r,i)=>`<button type="button" data-row-example="${i}" aria-pressed="${Object.entries(r.selection).every(([k,v])=>state[k]===v)}"><b>${r.title}</b><small>${r.note}</small></button>`).join('');
  if(focusedExample!==undefined)el('rowExamples').querySelector(`[data-row-example="${focusedExample}"]`)?.focus({preventScroll:true});
  document.querySelectorAll('[data-fold]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.fold)===state.foldedSeats)));
  document.querySelectorAll('[data-cargo-scenario]').forEach(b=>{const p=cargoScenarios[b.dataset.cargoScenario];b.setAttribute('aria-pressed',String(Object.entries(p).every(([k,v])=>state[k]===v)));});
  for(const k of ['skiLength','boardLength','extendedDepth'])if(el(k).value!==String(state[k]))el(k).value=state[k];
  el('passengerWord').textContent=plural(state.passengers);
  document.querySelectorAll('[data-passengers]').forEach(b=>{b.setAttribute('aria-pressed',String(Number(b.dataset.passengers)===state.passengers));b.disabled=Number(b.dataset.passengers)>maxPeople;});
  document.querySelectorAll('[data-baggage]').forEach(b=>{const preset=baggagePresets[b.dataset.baggage];b.setAttribute('aria-pressed',String(preset.bags===state.bags&&preset.carry===state.carry));});
  el('baggageSummary').textContent=`Чемоданов: ${state.bags} · сумок: ${state.carry}`;
  for(const key of ['from','to','date','returnDate'])if(el(key).value!==state[key])el(key).value=state[key];
  el('returnTrip').checked=state.returnTrip;el('returnField').hidden=!state.returnTrip;el('returnDate').min=state.date||localDate();
  for(const k of ['passengers','children','bags','carry','boxes','skiPairs','snowboards'])el(k+'Value').textContent=state[k];
  document.querySelectorAll('[data-step]').forEach(b=>{const [key,delta]=b.dataset.step.split(':');const next=state[key]+Number(delta);b.disabled=next<(key==='passengers'?1:0)||next>({passengers:maxPeople,children:Math.min(3,state.passengers),bags:10,carry:10,boxes:24,skiPairs:8,snowboards:8}[key]);});
  document.querySelectorAll('[data-option]').forEach(b=>{const active=state[b.dataset.option];b.setAttribute('aria-pressed',String(active));b.querySelector('span').textContent=active?'✓':'+';});
  document.querySelectorAll('[data-preset]').forEach(b=>{const active=b.dataset.preset===currentPreset;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  el('summaryRoute').textContent=`${state.from||'Откуда'} → ${state.to||'Куда'}`;
  el('summaryDate').textContent=state.date?`${readableDate(state.date)}${state.returnTrip?' · обратно '+(readableDate(state.returnDate)||'дата не выбрана'): ' · в одну сторону'}`:'Выберите дату поездки';
  el('distance').textContent=q.km?`≈ ${q.km} км${q.hours?' · '+q.hours:''}`:'Маршрут уточняется';
  el('routeNote').textContent=q.distanceStatus==='live-road-calculation'?'Дорожный расчёт без учёта пробок и остановок. Точные адреса и условия подтвердим до заказа.':q.km?'Расстояние и время — ориентиры из каталога ZM, не данные дорожной обстановки.':'Для этого направления нет точного расчёта в каталоге. Можно собрать черновик для индивидуального согласования.';
  el('compositionCount').textContent=state.passengers;el('compositionCount').nextElementSibling.textContent=plural(state.passengers);
  el('partySummary').textContent=`Взрослых: ${state.passengers-state.children}${state.children?' · детей: '+state.children:''}`;
  const selected=[`${state.bags} чемоданов`,`${state.carry} ручная кладь`,state.children&&`${state.children} детских кресел`,state.boxes&&`${state.boxes} коробок`,state.stroller&&'Коляска',state.skiPairs&&`${state.skiPairs} пар лыж`,state.snowboards&&`${state.snowboards} сноубордов`,state.foldedSeats&&`Сложено кресел: ${state.foldedSeats}`,state.pet&&'Питомец'].filter(Boolean);el('selectedOptions').innerHTML=selected.map(s=>`<span>${esc(s)}</span>`).join('');
  el('price').textContent=q.amount===null?'По запросу':'От '+q.amount.toLocaleString('ru-RU')+' ₽';el('priceUnit').textContent=q.amount===null?'Для выбранного маршрута нужен расчёт':'За автомобиль · в одну сторону';
  el('priceNote').textContent='Итоговую стоимость поездки с багажом и опциями нужно подтвердить.'+(state.returnTrip?' Обратная поездка считается отдельно.':'')+' Это не оферта и не проверка наличия.';
}
for(const k of ['from','to','date','returnDate'])el(k).addEventListener('change',()=>{try{change({[k]:el(k).value});}catch(error){el('errors').textContent=error.message;render();}});
el('returnTrip').onchange=()=>change({returnTrip:el('returnTrip').checked});
el('swap').onclick=()=>change({from:el('to').value,to:el('from').value});
document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{const [k,d]=b.dataset.step.split(':');const value=state[k]+Number(d);change({[k]:value,...(k==='passengers'?{children:Math.min(state.children,value)}:{})});});
document.querySelectorAll('[data-option]').forEach(b=>b.onclick=()=>change({[b.dataset.option]:!state[b.dataset.option]}));
document.querySelectorAll('[data-preset]').forEach(b=>b.onclick=()=>change(presets[b.dataset.preset],{preset:b.dataset.preset}));
document.querySelectorAll('[data-passengers]').forEach(b=>b.onclick=()=>{const passengers=Number(b.dataset.passengers);change({passengers,children:Math.min(state.children,passengers)});});
document.querySelectorAll('[data-baggage]').forEach(b=>b.onclick=()=>change(baggagePresets[b.dataset.baggage]));
document.querySelectorAll('[data-fold]').forEach(b=>b.onclick=()=>{const foldedSeats=Number(b.dataset.fold),passengers=Math.min(state.passengers,7-foldedSeats);change({foldedSeats,passengers,children:Math.min(state.children,passengers)});});
document.querySelectorAll('[data-cargo-scenario]').forEach(b=>b.onclick=()=>{change(cargoScenarios[b.dataset.cargoScenario]);el('equipmentDetails').open=Boolean(state.boxes||state.skiPairs||state.snowboards);});
el('rowExamples').onclick=event=>{const button=event.target.closest('[data-row-example]');if(!button)return;const selected=rowScenarios[state.foldedSeats][Number(button.dataset.rowExample)];change(selected.selection);el('equipmentDetails').open=Boolean(state.boxes||state.skiPairs||state.snowboards);};
for(const key of ['skiLength','boardLength','extendedDepth']){
  const input=el(key);
  const commit=()=>{const value=Number(input.value);if(value!==state[key])change({[key]:value});};
  input.oninput=()=>{if(input.value!==''&&input.validity.valid)commit();};
  input.onchange=()=>{try{commit();}catch(e){render();el('errors').textContent=e.message;el('cabinStatus').textContent=e.message;}};
}
el('createDraft').onclick=()=>{try{change({from:el('from').value,to:el('to').value,date:el('date').value,returnDate:el('returnDate').value},{announce:false});draft=tripSnapshot();if(draft.errors.length){el('errors').textContent=draft.errors.join(' ');return;}el('draftText').textContent=briefText(draft);el('copyStatus').textContent='';if(embedded){el('draftDialog').show();setTimeout(()=>parent.postMessage({type:'zm:scroll',offset:el('draftDialog').getBoundingClientRect().top+scrollY},location.origin),150);}else el('draftDialog').showModal();}catch(error){el('errors').textContent=error.message;}};
el('closeDraft').onclick=()=>el('draftDialog').close();
el('copyDraft').onclick=async()=>{try{await navigator.clipboard.writeText(briefText(draft));el('copyStatus').textContent='Текст скопирован. Черновик никуда не отправлен.';}catch{const range=document.createRange();range.selectNodeContents(el('draftText'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);el('copyStatus').textContent='Автокопирование недоступно. Текст выделен — нажмите ⌘C или Ctrl+C.';}};
el('downloadDraft').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(draft,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='zm-trip-draft.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
render();
el('cabinZoom').onclick=()=>{const active=el('cabinView').classList.toggle('is-closeup');el('cabinZoom').setAttribute('aria-pressed',String(active));el('cabinZoom').textContent=active?'Минивэн целиком':'Салон крупно';};
function cabinUnavailable(){if(cabin){cabin.destroy();cabin=null;}el('cabinLab').classList.remove('scene-ready','cabin-loading');el('cabinFallback').textContent='Не удалось открыть иллюстрацию. Все параметры и сборка поездки работают ниже.';el('cabinStatus').textContent='Параметры поездки можно выбрать справа.';}
el('cabinView').addEventListener('cabin-unavailable',cabinUnavailable);
import('./cabin-studio.mjs').then(async({mountCabin})=>{
  cabin=await mountCabin(el('cabinView'),{state,capacity:tripCapacity,onLayout:plan=>{
    el('cabinCount').innerHTML=`<b>${state.passengers} ${plural(state.passengers)}</b> · водитель отдельно · чемоданы: ${state.bags} · сумки: ${state.carry}`;
    el('layoutCaption').textContent=plan.caption;
    const notes=[];
    if(plan.unseated)notes.push('Для этой группы выберите автомобиль вместительнее.');
    if(state.foldedSeats)notes.push('Трансформация показана для совместимого салона. Механизм кресел и размеры нужно подтвердить.');
    if(plan.extraBaggage)notes.push('Часть груза не размещена: см. схему и список под иллюстрацией.');
    if(state.pet)notes.push('Переноска не должна перекрываться другим грузом; условия перевозки нужно согласовать.');
    el('cabinStatus').textContent=notes.join(' ');
    el('cabinStatus').classList.toggle('warning-text',Boolean(plan.unseated||plan.extraBaggage));
  }});
  cabin.update(state,tripCapacity);
  el('cabinLab').classList.add('scene-ready');el('cabinLab').classList.remove('cabin-loading');
}).catch(error=>{console.warn('Cabin illustration unavailable:',error.message);cabinUnavailable();});
// Optional agent interface: the same validated state and visible update as the controls.
const context=document.modelContext;
if(context?.registerTool){const lifecycle=new AbortController();const register=tool=>{try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(e=>console.warn('WebMCP registration unavailable:',e.message));}catch(e){console.warn('WebMCP registration unavailable:',e.message);}};
  register({name:'configure_trip_draft',title:'Настроить черновик поездки ZM',description:'Изменяет только видимый локальный черновик. Не бронирует, не отправляет заявку, не проверяет наличие. Число пассажиров включает детей, без водителя. Модель автомобиля не выбирается: она согласуется перед поездкой.',inputSchema:{type:'object',properties:{from:{type:'string',maxLength:100},to:{type:'string',maxLength:100},date:{type:'string'},returnTrip:{type:'boolean'},returnDate:{type:'string'},passengers:{type:'integer',minimum:1,maximum:7},children:{type:'integer',minimum:0,maximum:3},bags:{type:'integer',minimum:0,maximum:10},carry:{type:'integer',minimum:0,maximum:10},stroller:{type:'boolean'},skis:{type:'boolean'},pet:{type:'boolean'},foldedSeats:{type:'integer',minimum:0,maximum:3},boxes:{type:'integer',minimum:0,maximum:24},skiPairs:{type:'integer',minimum:0,maximum:8},snowboards:{type:'integer',minimum:0,maximum:8},skiLength:{type:'integer',minimum:120,maximum:220},boardLength:{type:'integer',minimum:120,maximum:200},extendedDepth:{type:'integer',minimum:130,maximum:230}},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute:input=>change(input)});
  register({name:'get_trip_draft',title:'Прочитать черновик поездки ZM',description:'Возвращает текущий видимый выбор, ориентир цены, условную рассадку и неподтверждённые условия. Ничего не меняет.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute:input=>{if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).length)throw new Error('Ожидается пустой объект.');return tripSnapshot();}});
  addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}

// Separate catalogue lookup and live road request: editing a route never leaves an old quote attached.
el('calculateRoad').onclick=()=>{
  try{change({from:el('from').value,to:el('to').value},{announce:false});}catch(e){el('errors').textContent=e.message;return;}
  if(!state.from||!state.to||state.from===state.to){el('errors').textContent='Укажите разные точки отправления и прибытия.';return;}
  if(quoteFor(state,routes).amount!==null){render();el('announcer').textContent='Цена маршрута обновлена по единому каталогу.';return;}
  if(!embedded){el('errors').textContent='Откройте конструктор на основной странице сайта для дорожного расчёта.';return;}
  const id=crypto.randomUUID();pendingCalculation={id,from:state.from,to:state.to};
  el('calculateRoad').disabled=true;el('calculateRoad').textContent='Считаем дорогу…';
  parent.postMessage({type:'zm:calculate',...pendingCalculation},location.origin);
  setTimeout(()=>{if(pendingCalculation?.id===id){pendingCalculation=null;el('calculateRoad').disabled=false;el('calculateRoad').textContent='Рассчитать маршрут';el('errors').textContent='Расчёт занял слишком много времени. Можно отправить заявку для индивидуального расчёта.';}},25000);
};
addEventListener('message',event=>{
  if(event.origin!==location.origin||event.source!==parent||event.data?.type!=='zm:quote'||event.data.id!==pendingCalculation?.id)return;
  const request=pendingCalculation;pendingCalculation=null;
  el('calculateRoad').disabled=false;el('calculateRoad').textContent='Рассчитать маршрут';
  if(state.from!==request.from||state.to!==request.to)return;
  if(event.data.error){el('errors').textContent=event.data.error;return;}
  const q=event.data.quote;
  if(!q||!Number.isFinite(q.distanceM)||q.distanceM<=0){el('errors').textContent='Не удалось получить дорожное расстояние.';return;}
  routes.push({from:request.from,to:request.to,km:q.distanceKm,pricingDistanceM:q.distanceM,rawDistanceM:q.distanceM,hours:'время уточняется',slug:null,distanceStatus:'live-road-calculation'});
  render();el('announcer').textContent='Дорожный расчёт готов.';
});
let orderBusy=false,orderSent=false;
el('orderForm').onsubmit=async event=>{
  event.preventDefault();if(orderBusy||orderSent)return;
  const status=el('orderStatus');status.dataset.error='false';
  let payload;
  try{draft=tripSnapshot();payload=buildOrderPayload(draft,{phone:el('orderPhone').value,name:el('orderName').value,flight:el('orderFlight').value,consent:el('orderConsent').checked,website:el('orderWebsite').value,pageUrl:contextUrl});}
  catch(error){status.dataset.error='true';status.textContent=error.message;return;}
  orderBusy=true;el('sendOrder').disabled=true;status.textContent='Передаём заявку…';
  try{
    let trackingWindow=window;try{if(parent!==window&&parent.location.origin===location.origin)trackingWindow=parent;}catch{}
    Object.assign(payload,await leadTracking(trackingWindow));
    const response=await fetch('/api/order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(20000)});
    const result=await response.json();if(!response.ok||result.ok!==true)throw new Error('Не удалось подтвердить доставку заявки. Позвоните по телефону на сайте; параметры поездки можно скопировать ниже.');
    orderSent=true;status.textContent='Заявка получена. Менеджер свяжется с вами, подтвердит цену и автомобиль. Это ещё не подтверждённая бронь.';
    el('sendOrder').textContent='Заявка отправлена';
    try{parent.postMessage({type:'zm:lead-success'},location.origin);}catch{}
  }catch(error){status.dataset.error='true';status.textContent=error.name==='TimeoutError'?'Не получили подтверждение вовремя. Проверьте доставку по телефону перед повторной отправкой.':error.message;el('sendOrder').disabled=false;}
  finally{orderBusy=false;}
};
if(embedded){let lastHeight=0;const reportHeight=()=>{const height=Math.ceil(document.body.getBoundingClientRect().height)+24;if(Math.abs(lastHeight-height)>2){lastHeight=height;parent.postMessage({type:'zm:height',height},location.origin);}};new ResizeObserver(reportHeight).observe(document.body);addEventListener('load',reportHeight);reportHeight();}
