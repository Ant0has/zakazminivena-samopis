// Hero-фон: тематическая иллюстрация для десктопа (16:9) и мобайла (9:16) +
// тёмно-зелёный overlay для контрастного белого текста.

interface HeroBackgroundProps {
  /** intensity тёмно-зелёного overlay'я (0..1). По умолчанию 0.7 — текст хорошо читается. */
  overlay?: number;
}

export function HeroBackground({ overlay = 0.7 }: HeroBackgroundProps = {}) {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 -z-20 hidden sm:block bg-no-repeat bg-cover bg-center
                   [background-image:url('/images/heroes/bg-desktop.webp')]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 sm:hidden bg-no-repeat bg-cover bg-center
                   [background-image:url('/images/heroes/bg-mobile.webp')]"
      />
      {/* Тёмно-зелёный overlay для контраста */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to bottom right, oklch(0.25 0.07 162 / ${overlay}), oklch(0.18 0.05 162 / ${overlay + 0.1}))`,
        }}
      />
      {/* Плавный переход к background ниже Hero */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-background"
      />
    </>
  );
}

// Контейнер для самого фото минивэна.
// Тематические фото минивэна в контексте локации — object-cover на всю плашку,
// caption-наложение снизу.
import Image from "next/image";

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
