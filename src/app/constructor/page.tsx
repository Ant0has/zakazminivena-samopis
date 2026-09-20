import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TripConstructor } from '@/components/TripConstructor';

export const metadata: Metadata = {
  title: 'Конструктор поездки на минивэне — Комфорт | ЗаказМинивэна.ru',
  description: 'Выберите маршрут, пассажиров и багаж. Посмотрите варианты салона и рассчитайте стоимость от 3 000 ₽ за минивэн «Комфорт». Итоговую цену подтвердим до заказа.',
  alternates: { canonical: 'https://zakazminivena.ru/constructor' },
};
export default function ConstructorPage() {
  return <><Header /><main className="pt-20"><h1 className="mx-auto max-w-7xl px-4 pt-6 text-3xl font-bold sm:px-6">Конструктор поездки на минивэне</h1><TripConstructor /></main><Footer /></>;
}
