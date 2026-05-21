// Карточка справа от формы: фото минивэна на стоянке аэропорта + подпись + рейтинг.
// Пока фото placeholder («ЗДЕСЬ ФОТО»). После присылания реальных фото — подставить src.

import { CameraIcon, StarIcon } from "lucide-react";

interface AirportPhotoCardProps {
  /** Например: "Минивэн Mercedes V-class у терминала B Шереметьево" */
  caption: string;
  /** Описание под подписью (атмосфера, ракурс) */
  description: string;
  /** Альтернатива (что показать на втором фото) */
  alternative?: string;
  /** Рейтинг для соц.доказательства */
  rating?: { stars: number; count: string };
  /** Фактическое фото, если уже есть; иначе placeholder. */
  imageSrc?: string;
  imageAlt?: string;
}

export function AirportPhotoCard({
  caption,
  description,
  alternative,
  rating = { stars: 4.9, count: "2 000+ поездок" },
  imageSrc,
  imageAlt = "Минивэн в аэропорту",
}: AirportPhotoCardProps) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-emerald/40 bg-emerald/10 p-5 backdrop-blur sm:p-6">
      {/* Placeholder или фото */}
      <div className="relative mb-4 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl bg-emerald/20">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-emerald">
            <CameraIcon className="h-10 w-10 opacity-60" />
            <span className="rounded-full bg-emerald px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-foreground">
              ЗДЕСЬ ФОТО
            </span>
          </div>
        )}
      </div>

      {/* Caption */}
      <h3 className="mb-2 text-lg font-bold leading-tight text-slate-900 sm:text-xl">
        {caption}
      </h3>

      {/* Description */}
      <p className="mb-3 text-sm leading-6 text-slate-700">{description}</p>

      {alternative && (
        <p className="mb-3 text-xs leading-5 text-slate-600">
          <span className="font-semibold">Альтернатива:</span> {alternative}
        </p>
      )}

      {/* Rating */}
      {rating && (
        <div className="flex items-center gap-2 border-t border-emerald/30 pt-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i <= Math.floor(rating.stars)
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm">
            <span className="font-bold text-slate-900">{rating.stars} / 5</span>{" "}
            <span className="text-slate-600">— {rating.count}</span>
          </div>
        </div>
      )}
    </div>
  );
}
