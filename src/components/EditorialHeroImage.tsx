import Image from "next/image";
import { getJourneyIllustration } from "@/lib/journey-illustrations";

type Props = {
  path: string;
  className?: string;
  priority?: boolean;
};

/** A real first-screen illustration, not a claim of a photographed vehicle or client. */
export function EditorialHeroImage({ path, className = "mt-8", priority = true }: Props) {
  const image = getJourneyIllustration(path);
  if (!image) return null;

  return (
    <figure className={`overflow-hidden rounded-3xl border border-emerald/10 bg-[#f0f5ec] shadow-sm ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 1100px"
        className="aspect-[16/9] w-full object-cover"
      />
    </figure>
  );
}
