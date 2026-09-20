/* No analytics, external assets or transmission of the access key in URLs. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = n => new Intl.NumberFormat('ru-RU').format(n);
  const time = v => v ? new Date(v).toLocaleString('ru-RU', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }) : '';
  const storageKey = 'zm-short-routes-access-v1';
  const fragmentKey = new URLSearchParams(location.hash.slice(1)).get('key');
  let key = fragmentKey || '';
  try { key = key || sessionStorage.getItem(storageKey) || ''; } catch {}
  if (location.hash) history.replaceState(null, '', location.pathname);
  let routes = [], state = {entries:{}}, drafts = {}, busy = false;
  const blank = () => ({price:null, comment:'', version:0});
  const dirty = id => {
    const before = state.entries[id] || blank(), current = drafts[id];
    return current.price !== (before.price === null ? '' : String(before.price)) || current.comment.trim() !== before.comment;
  };
  const changedIds = () => routes.filter(r => dirty(r.id)).map(r => r.id);
  function message(text, error = false) { $('message').textContent = text; $('message').className = error ? 'error' : 'success'; }
  function setBusy(value) {
    busy = value;
    document.querySelectorAll('#workspace input, #workspace textarea, #workspace button, #workspace select, #access-form button').forEach(e => { e.disabled = value; });
    if (!value) updateCounts();
  }
  async function api(body) {
    const response = await fetch(location.pathname, {method:'POST', credentials:'omit', cache:'no-store', headers:{'Content-Type':'application/json', Authorization:`Bearer ${key}`}, body:JSON.stringify(body), signal:AbortSignal.timeout(20000)});
    let result;
    try { result = await response.json(); } catch { throw new Error('Сервер временно недоступен. Ваши изменения остались на экране. Повторите сохранение позже.'); }
    if (!response.ok) { const error = new Error(result.error || 'Не удалось выполнить запрос.'); error.conflicts = result.conflicts || []; error.status = response.status; throw error; }
    return result;
  }
  function resetDrafts() {
    drafts = Object.fromEntries(routes.map(r => { const entry = state.entries[r.id] || blank(); return [r.id, { price:entry.price === null ? '' : String(entry.price), comment:entry.comment }]; }));
  }
  function updateCounts() {
    const filled = routes.filter(r => state.entries[r.id]?.price != null).length;
    $('total').textContent = routes.length; $('filled').textContent = filled; $('remaining').textContent = routes.length - filled;
    $('progress').max = routes.length; $('progress').value = filled;
    $('saved-time').textContent = state.updatedAt ? `Последнее сохранение: ${time(state.updatedAt)}` : 'На сервере пока нет согласованных цен';
    const count = changedIds().length;
    $('save').disabled = busy || count === 0;
    $('save-count').textContent = count || '';
    $('save-summary').textContent = count ? `Есть несохранённые строки: ${count}` : 'Все изменения сохранены';
  }
  function statusFor(id) {
    return dirty(id) ? ['dirty','Не сохранено'] : state.entries[id]?.price != null ? ['saved','Сохранено'] : ['','Без цены'];
  }
  function render() {
    const q = $('search').value.toLocaleLowerCase('ru-RU').replace(/ё/g,'е').trim();
    const filter = $('filter').value;
    const shown = routes.filter(r => {
      const matches = `${r.from} ${r.to}`.toLocaleLowerCase('ru-RU').replace(/ё/g,'е').includes(q);
      return matches && (filter === 'all' || (filter === 'empty' && !drafts[r.id].price) || (filter === 'filled' && !!drafts[r.id].price) || (filter === 'changed' && dirty(r.id)));
    });
    $('rows').innerHTML = shown.map(r => {
      const index = routes.indexOf(r), item = drafts[r.id], status = statusFor(r.id), name = `${r.from} → ${r.to}`;
      return `<tr data-index="${index}" class="${dirty(r.id) ? 'dirty-row' : ''}"><td><span class="route-name">${escape(r.from)}<span class="arrow">→</span>${escape(r.to)}</span><details><summary>Страницы сайта · ${r.pages.length}</summary>${r.pages.map(p => `<a href="${escape(p)}" target="_blank" rel="noopener noreferrer">${escape(p)}</a>`).join('')}</details></td><td><span class="distance">≈ ${escape(money(r.sourceKm))} км</span><small class="distance-note">${r.distanceStatus === 'legacy-estimate-needs-road-check' ? 'Оценка · уточнить адреса' : 'Данные city2city · уточнить адреса'}${r.displayKm !== r.sourceKm ? `<br>В расчёте: ${r.displayKm} км` : ''}</small></td><td><span class="auto-price">От ${money(r.autoPrice)} ₽</span></td><td class="price-cell"><input data-field="price" aria-label="Цена: ${escape(name)}" inputmode="numeric" type="text" maxlength="9" placeholder="—" value="${escape(item.price)}" autocomplete="off"></td><td class="comment-cell"><textarea data-field="comment" aria-label="Комментарий: ${escape(name)}" maxlength="1000" placeholder="Что включено, особые условия…">${escape(item.comment)}</textarea></td><td><span class="badge ${status[0]}">${status[1]}</span></td></tr>`;
    }).join('');
    $('visible-count').textContent = `Показано ${shown.length} из ${routes.length}`;
    $('empty').hidden = shown.length > 0;
    updateCounts();
  }
  async function load() {
    setBusy(true);
    try {
      const result = await api({action:'load'});
      routes = result.routes; state = result.state; resetDrafts();
      try { sessionStorage.setItem(storageKey,key); } catch {}
      $('access').hidden = true; $('workspace').hidden = false; $('access-key').value = '';
      render(); message('');
    } catch (e) {
      message(e.message || 'Не удалось загрузить таблицу. Проверьте соединение и повторите.', true);
      if (e.status === 401) $('access').hidden = false;
    } finally { setBusy(false); }
  }
  $('access-form').addEventListener('submit', e => { e.preventDefault(); key = $('access-key').value.trim(); load(); });
  $('search').addEventListener('input', render); $('filter').addEventListener('change', render);
  $('rows').addEventListener('input', e => {
    const field = e.target.dataset.field, tr = e.target.closest('tr');
    if (!field || !tr) return;
    const id = routes[Number(tr.dataset.index)].id;
    drafts[id][field] = field === 'price' ? e.target.value.replace(/[\s\u00a0\u202f]/g,'') : e.target.value;
    e.target.removeAttribute('aria-invalid');
    const status = statusFor(id), badge = tr.querySelector('.badge');
    badge.className = `badge ${status[0]}`; badge.textContent = status[1];
    tr.classList.toggle('dirty-row',dirty(id)); updateCounts();
  });
  $('save').addEventListener('click', async () => {
    const ids = changedIds();
    if (!ids.length || busy) return;
    const changes = [];
    for (const id of ids) {
      const item = drafts[id], raw = item.price, price = raw === '' ? null : Number(raw);
      if (raw !== '' && (!/^\d+$/.test(raw) || !Number.isSafeInteger(price) || price < 1 || price > 1000000)) {
        const route = routes.find(r => r.id === id);
        message(`Проверьте цену ${route.from} → ${route.to}: целое число от 1 до 1 000 000 ₽ или пустое поле.`,true);
        const input = document.querySelector(`tr[data-index="${routes.indexOf(route)}"] input`);
        if (input) { input.setAttribute('aria-invalid','true'); input.focus(); }
        return;
      }
      changes.push({id,price,comment:item.comment,expectedVersion:state.entries[id]?.version || 0});
    }
    setBusy(true); message('Сохраняем на сервере…');
    try {
      const result = await api({action:'save',changes}); state = result.state; resetDrafts(); render();
      message(`Сохранено на сервере: ${changes.length} строк. Цены для клиентов не изменены.`);
    } catch (e) {
      const names = (e.conflicts || []).map(id => { const r=routes.find(v=>v.id===id); return r ? `${r.from} → ${r.to}` : id; });
      message(`${e.message || 'Связь прервалась. Нажмите «Обновить», чтобы проверить сервер, либо повторите сохранение.'}${names.length ? '\n'+names.join('; ') : ''}`,true);
      for (const id of e.conflicts || []) document.querySelector(`tr[data-index="${routes.findIndex(r=>r.id===id)}"]`)?.classList.add('conflict-row');
    } finally { setBusy(false); }
  });
  $('reload').addEventListener('click', () => {
    if (changedIds().length && !confirm('Обновить данные с сервера? Несохранённые изменения на экране будут заменены. При конфликте сначала скопируйте нужные цены и комментарии.')) return;
    load();
  });
  $('share').addEventListener('click', async () => {
    const url = `${location.origin}${location.pathname}#key=${encodeURIComponent(key)}`;
    try { await navigator.clipboard.writeText(url); message('Ссылка скопирована. Передавайте только тем, кому разрешено редактировать цены.'); }
    catch { prompt('Скопируйте полную ссылку. Любой её получатель сможет редактировать таблицу.',url); }
  });
  $('export').addEventListener('click', () => {
    if (changedIds().length) { message('Перед выгрузкой сохраните изменения. В CSV попадают только сохранённые на сервере цены.',true); return; }
    const cell = v => `"${String(v ?? '').replace(/^[\s]*[=+@-]/, m => "'"+m).replace(/"/g,'""')}"`;
    const data = [['Откуда','Куда','Исходное расстояние, км','Расчётное расстояние, км','Расчёт сайта, от ₽','Цена сотрудника, ₽','Комментарий','Сохранено','Страницы сайта'],...routes.map(r => { const entry=state.entries[r.id]||blank(); return [r.from,r.to,r.sourceKm,r.displayKm,r.autoPrice,entry.price,entry.comment,entry.updatedAt || '',r.pages.map(p=>'https://zakazminivena.ru'+p).join(' | ')]; })];
    const url = URL.createObjectURL(new Blob(['\ufeff'+data.map(row=>row.map(cell).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'}));
    const link=document.createElement('a'); link.href=url; link.download=`ZM-короткие-маршруты-${new Date().toISOString().slice(0,10)}.csv`; link.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  window.addEventListener('beforeunload', e => { if (changedIds().length) { e.preventDefault(); e.returnValue=''; } });
  if (key) load();
})();
