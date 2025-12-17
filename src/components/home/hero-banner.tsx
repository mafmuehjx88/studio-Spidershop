import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function HeroBanner() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero-banner");

  return (
    <section className="relative flex h-[50vh] w-full items-center justify-center">
      <Image
        src={heroImage?.imageUrl || "https://picsum.photos/seed/hero/1920/1080"}
        alt={heroImage?.description || "Promotional banner"}
        fill
        className="object-cover"
        data-ai-hint={heroImage?.imageHint || "abstract gaming"}
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center text-primary-foreground">
        <h1 className="font-headline text-4xl font-bold uppercase tracking-tighter drop-shadow-lg md:text-6xl">
          Summer Sale Splash
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-300 drop-shadow-md">
          Get up to 50% off on Diamond packs and UC bundles. Limited time offer!
        </p>
        <Button
          className="mt-6 bg-accent text-accent-foreground shadow-lg hover:bg-accent/90"
          size="lg"
        >
          Shop Now
        </Button>
      </div>
    </section>
  );
}
