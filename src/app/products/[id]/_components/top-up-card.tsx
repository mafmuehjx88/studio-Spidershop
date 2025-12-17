'use client';

import Image from 'next/image';
import { type TopUpOption } from '@/lib/top-up-options';
import { cn } from '@/lib/utils';

interface TopUpCardProps {
  option: TopUpOption;
}

export function TopUpCard({ option }: TopUpCardProps) {
  return (
    <div className="relative flex cursor-pointer flex-col gap-2 overflow-hidden rounded-lg border bg-card p-3 text-center text-card-foreground shadow-md transition-transform hover:scale-105">
      
      {option.inStockTag && (
        <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-bl-lg rounded-tr-md">
          {option.inStockTag}
        </div>
      )}

      {option.quantity && (
         <div className="absolute top-0 left-0 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg rounded-tl-md flex items-center gap-1">
            <Image src="/gift.png" alt="gift" width={10} height={10} />
            <span>{option.quantity}</span>
         </div>
      )}

       {option.discountTag && (
         <div className="absolute top-6 left-0 bg-purple-600 text-white text-[9px] font-bold px-1 py-0.5 rounded-r-sm">
            <span>{option.discountTag}</span>
         </div>
      )}


      <div className='pt-8'>
        <Image
          src={option.image.imageUrl}
          alt={option.image.description}
          width={100}
          height={100}
          className="mx-auto aspect-square object-contain"
          data-ai-hint={option.image.imageHint}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-sm font-semibold">{option.name}</p>
        <p className="text-xs text-muted-foreground">{option.price} ကျပ်</p>
      </div>

       {option.rechargeTag && (
         <div className="absolute top-6 right-0 bg-red-600 text-white text-[9px] font-bold px-1 py-0.5 rounded-l-sm">
            <span>{option.rechargeTag}</span>
         </div>
      )}
    </div>
  );
}
