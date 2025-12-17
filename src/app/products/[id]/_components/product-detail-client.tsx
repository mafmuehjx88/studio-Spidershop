'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { type Product } from '@/lib/products';
import { type TopUpOption } from '@/lib/top-up-options';
import { TopUpCard } from './top-up-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductDetailClientProps {
  product: Product;
  options: TopUpOption[];
}

export function ProductDetailClient({ product, options }: ProductDetailClientProps) {
    const detailBanner = PlaceHolderImages.find(p => p.id === `${product.id}-banner`);

  return (
    <div>
      <section className="relative w-full aspect-[16/7] md:aspect-[16/5]">
        <Image
          src={detailBanner?.imageUrl || "https://picsum.photos/seed/pubg-banner/1280/400"}
          alt={detailBanner?.description || `${product.name} Banner`}
          fill
          className="object-cover"
          data-ai-hint={detailBanner?.imageHint || "game character action"}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </section>
      <section className="container mx-auto px-4 -mt-12 md:-mt-20">
        <div className="mb-6 flex justify-center">
          <Button variant="outline" className="bg-card text-card-foreground">
            မြန်မာကျပ် <Image src="https://picsum.photos/seed/myanmar-flag/24/16" width={24} height={16} alt="Myanmar Flag" className="ml-2" data-ai-hint="myanmar flag" />
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {options.map((option) => (
            <TopUpCard key={option.id} option={option} />
          ))}
        </div>
      </section>
    </div>
  );
}
