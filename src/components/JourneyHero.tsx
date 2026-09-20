import Image from 'next/image';
import { ArrowDown, Baby, Users, ShieldCheck } from 'lucide-react';
import type { JourneyIllustration } from '@/lib/journey-illustrations';

interface JourneyHeroProps {
  image: JourneyIllustration;
  title: string;
  description: string;
  eyebrow?: string;
  price?: string;
  distance?: number;
  duration?: string;
}

export function JourneyHero({ image, title, description, eyebrow = 'Вместе — удобнее', price, distance, duration }: JourneyHeroProps) {
  return <section data-route-hero data-journey-hero className="overflow-hidden bg-[#f6f4e9] text-[#203e32]">
    <div className="mx-auto grid max-w-7xl items-center gap-5 px-4 py-7 sm:gap-7 sm:px-6 sm:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:px-8 lg:py-12">
      <div className="contents lg:block lg:min-w-0">
        <div className="order-1">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">{eyebrow}</p>
        <h1 className="text-[2rem] font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.8rem]">{title}</h1>
        </div>
        <div className="order-3">
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#536457] sm:text-lg">{description}</p>
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#345843] sm:text-sm">
          <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 shrink-0" />До 7 пассажиров</span>
          <span className="inline-flex items-center gap-1.5"><Baby className="h-4 w-4 shrink-0" />Детские кресла по запросу</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 shrink-0" />Цену согласуем заранее</span>
        </div>
        {(price || distance || duration) && <dl className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-3 border-t border-[#dce2d4] pt-5">
          {price && <div><dt className="text-xs text-[#536457]">За весь минивэн</dt><dd className="mt-1 text-2xl font-bold text-[#245a43]">От {price} ₽</dd></div>}
          {distance && <div><dt className="text-xs text-[#536457]">Расстояние</dt><dd className="mt-1 text-lg font-semibold">≈ {distance} км</dd></div>}
          {duration && <div><dt className="text-xs text-[#536457]">В пути</dt><dd className="mt-1 text-lg font-semibold">{duration}</dd></div>}
        </dl>}
        <a href="#trip-constructor" className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#245a43] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#183f2e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">Собрать свою поездку <ArrowDown className="h-4 w-4" /></a>
        <p className="mt-3 max-w-md text-xs leading-relaxed text-[#536457]">Выберите пассажиров и багаж ниже. Конкретную машину, размещение вещей и итоговую цену подтвердим до заказа.</p>
        </div>
      </div>
      <figure className="order-2 min-w-0 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 1023px) 100vw, 680px" className="h-auto w-full" priority />
      </figure>
    </div>
  </section>;
}
