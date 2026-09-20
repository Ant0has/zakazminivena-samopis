import { pricingYear, pricingRevision } from '@/lib/route-pricing';

export function PricingNote() {
  return <p data-pricing-revision={pricingRevision} className="text-xs leading-relaxed text-muted-foreground">Цены {pricingYear} года. Опубликованный расчёт — «от» за весь минивэн в одну сторону. Итоговую стоимость и условия подтверждаем до заказа; расстояния в каталоге ориентировочные.</p>;
}
