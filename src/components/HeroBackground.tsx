// Hero-фон: отдельная картинка для десктопа (16:9) и мобайла (9:16).
// PNG-исходники сконвертированы в WebP (~52 KB каждый).

export function HeroBackground() {
  return (
    <>
      {/* Desktop background — виден от sm: и выше */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden sm:block bg-no-repeat bg-cover bg-center
                   [background-image:url('/images/heroes/bg-desktop.webp')]"
      />
      {/* Mobile background — виден до sm: */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 sm:hidden bg-no-repeat bg-cover bg-center
                   [background-image:url('/images/heroes/bg-mobile.webp')]"
      />
      {/* Мягкая маска снизу, чтобы фон плавно переходил в background ниже Hero */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-background"
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
