import Image from 'next/image';
import { ArrowDown, BabyIcon, ShieldCheckIcon, UsersIcon } from 'lucide-react';
import { PriceCalculator } from '@/components/PriceCalculator';

export function HeroSection() {
  return <>
    <section data-home-hero className="overflow-hidden bg-[#f6f4e9] pt-16">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 pb-8 pt-10 sm:px-6 sm:py-12 lg:grid-cols-[0.95fr_1.15fr] lg:gap-8 lg:px-8 lg:py-14">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">Хорошая поездка начинается вместе</p>
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-[#203e32] sm:text-5xl lg:text-[3.4rem]">
            Заказать минивэн с водителем{' '}
            <span className="text-emerald-700">межгород и аэропорт</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#536457] sm:text-lg">
            Для семейных путешествий и поездок своей компанией до 7 человек.
            Вы собираете близких и чемоданы — мы помогаем с дорогой.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-3 text-xs font-medium text-[#345843] sm:text-sm">
            <span className="inline-flex items-center gap-1.5"><ShieldCheckIcon className="h-4 w-4 shrink-0" />Фиксированная цена</span>
            <span className="inline-flex items-center gap-1.5"><UsersIcon className="h-4 w-4 shrink-0" />До 7 пассажиров</span>
            <span className="inline-flex items-center gap-1.5"><BabyIcon className="h-4 w-4 shrink-0" />Детское кресло бесплатно</span>
          </div>
          <a href="#trip-constructor" className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#245a43] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#183f2e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
            Собрать свою поездку <ArrowDown className="h-4 w-4" />
          </a>
          <p className="mt-3 text-xs text-[#536457]">Пассажиры, багаж и цена — в конструкторе ниже</p>
        </div>
        <div className="min-w-0 overflow-hidden rounded-[2rem]">
          <Image
            src="/images/heroes/family-journey-20260919.webp"
            alt="Семья с детьми и чемоданами собирается в путешествие на светлом минивэне — рисованная иллюстрация"
            width={1536} height={1024} sizes="(max-width: 1023px) 100vw, 680px"
            className="h-auto w-full" priority
          />
        </div>
      </div>
    </section>
    <PriceCalculator />
  </>;
}
