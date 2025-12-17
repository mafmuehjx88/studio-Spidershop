import Image from 'next/image';
import { type TopUpOption } from '@/lib/top-up-options';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TopUpCardProps {
  option: TopUpOption;
}

export function TopUpCard({ option }: TopUpCardProps) {
  return (
    <div className="relative flex cursor-pointer flex-col justify-start gap-2 overflow-hidden rounded-lg border bg-card p-3 text-center text-card-foreground shadow-md transition-transform hover:scale-105">
      
      {option.quantity && (
        <div className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-br-lg bg-gray-900 text-xs font-bold text-white">
          {option.quantity}
        </div>
      )}

      {option.inStockTag && (
         <Badge className={cn("absolute top-0 right-0 rounded-bl-md rounded-tr-none text-[10px] font-semibold", 
            option.rechargeTag ? "rounded-bl-none" : "rounded-bl-md"
         )}>
          {option.inStockTag}
        </Badge>
      )}

      {option.rechargeTag && (
         <Badge variant="destructive" className="absolute top-[18px] right-0 rounded-bl-md rounded-tr-none text-[10px] font-semibold">
          {option.rechargeTag}
        </Badge>
      )}
      
      {option.discountTag && (
        <div className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-br-lg bg-red-600 text-xs font-bold text-white transform -rotate-45 -translate-x-3 -translate-y-3">
         <span className='mt-1'>{option.discountTag}</span>
        </div>
      )}
      
      <div className="flex-grow pt-8">
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
