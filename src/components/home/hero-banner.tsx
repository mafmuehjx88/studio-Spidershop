import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function HeroBanner() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero-banner");

  return (
    <section className="relative w-full aspect-video">
      <Image
        src={heroImage?.imageUrl || "https://picsum.photos/seed/hero/1280/720"}
        alt={heroImage?.description || "Promotional banner"}
        fill
        className="object-cover"
        data-ai-hint={heroImage?.imageHint || "blue lightning character"}
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center text-primary-foreground">
        <div className="absolute top-4 left-4 rounded-md bg-black/50 p-2 text-xs backdrop-blur-sm">
          zenith harrai shop
        </div>
        <div className="absolute top-14 left-4 rounded-lg bg-black/50 p-2 text-sm backdrop-blur-sm">
          Application
        </div>
        <div className="absolute top-28 left-4 rounded-lg bg-black/50 p-2 text-sm backdrop-blur-sm">
          ငွေဖြည့်ထားရုံဖြင့်
        </div>
        <div className="absolute top-16 right-4 rounded-lg bg-black/50 p-2 text-sm backdrop-blur-sm">
          24 Hour
        </div>
        <div className="absolute bottom-16 right-4 rounded-lg bg-black/50 p-2 text-sm backdrop-blur-sm">
          Diamond & UC
        </div>
        <h1 className="font-headline text-5xl font-bold uppercase tracking-tighter text-cyan-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] md:text-7xl">
          ခယ်မိုင်ဒိုင်း
        </h1>
        <Image
          src="/logo-small.png"
          alt="Zenith Logo"
          width={60}
          height={60}
          className="absolute bottom-4 right-4"
        />
      </div>
    </section>
  );
}
