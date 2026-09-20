export function buildOrderPayload(draft, { phone, name = '', flight = '', consent = false, pageUrl = '', website = '' }) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) throw new Error('Введите телефон с кодом страны.');
  if (!consent) throw new Error('Подтвердите согласие на обработку данных для заявки.');
  if (draft.errors.length) throw new Error(draft.errors.join(' '));
  const s = draft.selection;
  const utm = {};
  const url = new URL(pageUrl);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'yclid']) {
    const value = url.searchParams.get(key); if (value) utm[key] = value.slice(0, 500);
  }
  return {
    from: s.from, to: s.to, date: s.date, passengers: s.passengers,
    phone: phone.trim(), name: name.trim().slice(0, 100), pageUrl, utm, website,
    consent: true, tariff: 'comfort',
    comment: [
      'Конструктор ZM · Комфорт · не подтверждённая бронь',
      `Пассажиров: ${s.passengers}, включая детей: ${s.children}. Водитель отдельно.`,
      `Чемоданов: ${s.bags}; ручная кладь: ${s.carry}; коробок: ${s.boxes}.`,
      `Коляска: ${s.stroller ? 'да' : 'нет'}; питомец: ${s.pet ? 'да' : 'нет'}.`,
      `Лыжи: ${s.skiPairs} пар (${s.skiLength} см); сноуборды: ${s.snowboards} (${s.boardLength} см).`,
      `Сложено кресел третьего ряда: ${s.foldedSeats}. Размещение и крепление груза требуют подтверждения.`,
      s.returnTrip ? `Обратно: ${s.returnDate}; стоимость обратной поездки отдельно.` : 'В одну сторону.',
      flight ? `Рейс / пожелания: ${flight.trim().slice(0, 500)}` : '',
      draft.quote.amount === null ? 'Цена: индивидуальный расчёт.' : `Цена от ${draft.quote.amount} ₽ за автомобиль в одну сторону; ${draft.quote.km} км ориентировочно.`,
      'Итоговую цену, автомобиль, детские кресла и багаж подтвердить до заказа.',
    ].filter(Boolean).join('\n'),
  };
}
