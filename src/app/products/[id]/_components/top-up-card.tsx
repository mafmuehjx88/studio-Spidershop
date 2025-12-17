import Image from 'next/image';
import { type TopUpOption } from '@/lib/top-up-options';
import { Badge } from '@/components/ui/badge';

interface TopUpCardProps {
  option: TopUpOption;
}

export function TopUpCard({ option }: TopUpCardProps) {
  return (
    <div className="relative flex cursor-pointer flex-col items-center justify-start gap-2 overflow-hidden rounded-lg border bg-card p-3 text-center text-card-foreground shadow-md transition-transform hover:scale-105">
      {option.badgeText && (
        <div className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-br-lg bg-gray-200 text-xs font-bold text-gray-800">
         {option.badgeIcon && <Image src={option.badgeIcon} alt="Badge Icon" width={12} height={12} className="mr-1" />}
          {option.badgeText}
        </div>
      )}
       {option.promoTag && (
        <Badge variant="destructive" className="absolute top-0 right-0 rounded-bl-md rounded-tr-none text-[10px] font-semibold">
          {option.promoTag}
        </Badge>
      )}
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
