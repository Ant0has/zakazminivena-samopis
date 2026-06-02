// Hero-фон: тематическая иллюстрация. Мобильный и десктопный варианты
// разделяются нативно через <picture> + <source media>, без зависимости от
// Tailwind hidden/block (исключаем риск каскада / порядка применения).

import Image from "next/image";

interface HeroBackgroundProps {
  /** intensity тёмно-зелёного overlay'я (0..1). По умолчанию 0.7 — текст хорошо читается. */
  overlay?: number;
  /** Позиция мобильного фона. "top" — виден самолёт и машина сверху иллюстрации
   *  (для airport-страниц). По умолчанию "center". */
  mobilePosition?: "top" | "center" | "bottom";
}

export function HeroBackground({ overlay = 0.7, mobilePosition = "center" }: HeroBackgroundProps = {}) {
  // Для "top" прижимаем картинку к правому верхнему углу — там в композиции
  // bg-mobile.webp находится самолёт (airport-страницы хотят показать именно его).
  const mobileObjectPos =
    mobilePosition === "top" ? "object-right-top" : mobilePosition === "bottom" ? "object-bottom" : "object-center";
  return (
    <>
      {/* Фоновая картинка. <picture> сам подбирает источник по media-query. */}
      <picture aria-hidden className="absolute inset-0 -z-20 block">
        <source media="(min-width: 640px)" srcSet="/images/heroes/bg-desktop.webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/heroes/bg-mobile.webp"
          alt=""
          className={`h-full w-full object-cover ${mobileObjectPos}`}
        />
      </picture>

      {/* Тёмно-зелёный overlay для контраста */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to bottom right, oklch(0.25 0.07 162 / ${overlay}), oklch(0.18 0.05 162 / ${overlay + 0.1}))`,
        }}
      />
    </>
  );
}

// Контейнер для самого фото минивэна (используется на destination-страницах).
export function HeroVehicleImage({
  src,
  alt,
  captionLabel,
  captionValue,
  priority,
}: {
  src: string;
  alt: string;
  captionLabel: string;
  captionValue: string;
  priority?: boolean;
}) {
  return (
    <div className="relative isolate aspect-[16/9] w-full overflow-hidden rounded-3xl
                    ring-1 ring-black/5 shadow-2xl shadow-emerald/10 bg-muted">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover object-center"
      />

      {/* Caption внизу с лёгким градиентом для читаемости */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent p-6">
        <div className="text-xs uppercase tracking-wide text-white/85">{captionLabel}</div>
        <div className="text-xl font-semibold text-white sm:text-2xl drop-shadow-md">{captionValue}</div>
      </div>
    </div>
  );
}
