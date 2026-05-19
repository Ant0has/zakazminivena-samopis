// Декоративный фон для Hero-секций v3-страниц.
// Mesh: два размытых цветных blob'а в углах + базовый вертикальный градиент + dot grid с маской.

export function HeroBackground() {
  return (
    <>
      {/* Базовый вертикальный градиент */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald/8 via-background to-background" />

      {/* Цветные blob'ы для глубины */}
      <div
        aria-hidden
        className="absolute -top-32 -left-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-emerald/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute top-24 right-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-amber-400/15 blur-[140px] lg:right-[-6rem]"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-1/3 -z-10 h-72 w-72 rounded-full bg-sky-400/10 blur-[100px]"
      />

      {/* Тонкая сетка из точек, плавно затухает книзу */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[600px]
                   [background-image:radial-gradient(rgba(16,185,129,0.18)_1px,transparent_1px)]
                   [background-size:22px_22px]
                   [mask-image:linear-gradient(to_bottom,white,transparent_85%)]
                   opacity-60"
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
