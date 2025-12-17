import { notFound } from "next/navigation";
import Image from "next/image";

import { products } from "@/lib/products";
import { topUpOptions } from "@/lib/top-up-options";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Header } from "@/components/layout/header";

import { ProductDetailClient } from "./_components/product-detail-client";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.id === params.id);
  const categories = topUpOptions[params.id] || [];

  if (!product) {
    notFound();
  }

  const bannerImage = PlaceHolderImages.find((p) => p.id === `${product.id}-banner`);

  return (
    <div className="flex flex-col bg-background text-foreground">
      <Header />
      <main className="pt-16">
        {bannerImage && (
           <section className="relative w-full aspect-[16/9] bg-muted">
            <Image
              src={bannerImage.imageUrl}
              alt={bannerImage.description}
              fill
              className="object-cover"
              data-ai-hint={bannerImage.imageHint}
              priority
            />
             <div className="absolute inset-0 bg-black/30" />
          </section>
        )}
        <div className="container mx-auto px-4 py-8 md:px-6">
          <ProductDetailClient categories={categories} />
        </div>
      </main>
    </div>
  );
}
