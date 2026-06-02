// Карточка справа от формы: фото минивэна + рейтинг.

import { CameraIcon, StarIcon } from "lucide-react";

interface AirportPhotoCardProps {
  rating?: { stars: number; count: string };
  imageSrc?: string;
  imageAlt?: string;
  /** Лишние пропы игнорируются — оставлены для обратной совместимости с местами вызова. */
  caption?: string;
  description?: string;
  alternative?: string;
}

export function AirportPhotoCard({
  rating = { stars: 4.9, count: "2 000+ поездок" },
  imageSrc,
  imageAlt = "Минивэн в аэропорту",
}: AirportPhotoCardProps) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-emerald/40 bg-emerald/10 p-5 backdrop-blur sm:p-6">
      {/* Фото — пропорция 16:9 (1344×768 / 1792×1024) */}
      <div className="relative mb-4 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl bg-emerald/20">
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

      {/* Рейтинг */}
      {rating && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i <= Math.floor(rating.stars)
                    ? "fill-amber-300 text-amber-300"
                    : "text-white/40"
                }`}
              />
            ))}
          </div>
          <div className="text-sm">
            <span className="font-bold text-white">{rating.stars} / 5</span>{" "}
            <span className="text-white/80">— {rating.count}</span>
          </div>
        </div>
      )}
    </div>
  );
}
