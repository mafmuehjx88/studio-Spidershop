import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function HeroBanner() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero-banner");

  return (
    <section className="relative w-full aspect-[16/9] bg-muted">
      <Image
        src={heroImage?.imageUrl || "https://picsum.photos/seed/hero/1280/720"}
        alt={heroImage?.description || "Promotional banner"}
        fill
        className="object-cover"
        data-ai-hint={heroImage?.imageHint || "blue lightning character"}
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center text-primary-foreground">
        {/* All text and logo elements have been removed as requested */}
      </div>
    </section>
  );
}
