import Image from "next/image";
import { CarFront } from "lucide-react";

// Универсальная обёртка для фото машины.
// Пока src не передан — отрисовывает аккуратный placeholder с иконкой авто и
// подписью «Фото · {model}». Когда AI-картинки готовы, достаточно передать src.

interface VehiclePlaceholderProps {
  src?: string;
  alt?: string;
  modelName?: string;
  /** "card" — на тёмном фоне (для тарифных карточек), "light" — на белом */
  variant?: "card" | "light";
  /** Tailwind-класс под aspect-ratio. По умолчанию 16:9 */
  className?: string;
  /** При карточной вёрстке убирает фон/рамку — для прозрачного PNG поверх card. */
  bare?: boolean;
  priority?: boolean;
  sizes?: string;
}

export function VehiclePlaceholder({
  src,
  alt = "Минивэн",
  modelName,
  variant = "light",
  className = "aspect-[16/9]",
  bare = false,
  priority,
  sizes = "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw",
}: VehiclePlaceholderProps) {
  const isDark = variant === "card";
  const wrapperBg = bare
    ? ""
    : isDark
    ? "bg-gradient-to-br from-slate-800/60 to-slate-900/60 ring-1 ring-white/5"
    : "bg-gradient-to-br from-slate-100 to-slate-200 ring-1 ring-slate-200/80";

  return (
    <div className={`relative w-full overflow-hidden rounded-xl ${wrapperBg} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain p-2 sm:p-3"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <CarFront
            className={`h-14 w-14 sm:h-16 sm:w-16 ${
              isDark ? "text-white/15" : "text-slate-300"
            }`}
            strokeWidth={1.25}
          />
        </div>
      )}
      {modelName && (
        <div
          className={`absolute bottom-1.5 left-2 text-[10px] font-medium tracking-wide ${
            isDark ? "text-white/35" : "text-slate-400"
          }`}
        >
          {modelName}
        </div>
      )}
    </div>
  );
}
