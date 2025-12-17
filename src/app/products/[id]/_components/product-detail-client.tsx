'use client';

import Image from 'next/image';
import { type Product } from '@/lib/products';
import { type TopUpCategory } from '@/lib/top-up-options';
import { TopUpCard } from './top-up-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductDetailClientProps {
  product: Product;
  categories: TopUpCategory[];
}

export function ProductDetailClient({ product, categories }: ProductDetailClientProps) {
    const detailBanner = PlaceHolderImages.find(p => p.id === `${product.id}-banner`);

  return (
    <div>
      <section className="relative w-full aspect-[16/9]">
        <Image
          src={detailBanner?.imageUrl || "https://picsum.photos/seed/pubg-banner/1280/720"}
          alt={detailBanner?.description || `${product.name} Banner`}
          fill
          className="object-cover"
          data-ai-hint={detailBanner?.imageHint || "game character action"}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </section>
      <section className="container mx-auto px-4 -mt-12 md:-mt-20 space-y-8 pb-8">
        {categories.map((category, index) => (
          <div key={category.id}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary-foreground">
              <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-sm">{index + 1}</span>
              {category.title}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {category.options.map((option) => (
                <TopUpCard key={option.id} option={option} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
