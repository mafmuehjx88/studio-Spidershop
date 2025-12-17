'use client';

import Image from 'next/image';
import { type TopUpOption } from '@/lib/top-up-options';

interface TopUpCardProps {
  option: TopUpOption;
}

export function TopUpCard({ option }: TopUpCardProps) {
  return (
    <div className="relative flex cursor-pointer flex-col justify-start gap-2 overflow-hidden rounded-lg border bg-card p-3 text-center text-card-foreground shadow-md transition-transform hover:scale-105">
      <div className="flex-grow">
        <Image
          src={option.image.imageUrl}
          alt={option.image.description}
          width={100}
          height={100}
          className="mx-auto aspect-square object-contain"
          data-ai-hint={option.image.imageHint}
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm font-semibold">{option.name}</p>
        <p className="text-xs text-muted-foreground">{option.price} ကျပ်</p>
      </div>
    </div>
  );
}
