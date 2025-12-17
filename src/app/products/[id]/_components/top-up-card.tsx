import Image from "next/image";
import type { TopUpOption } from "@/lib/top-up-options";
import { cn } from "@/lib/utils";

interface TopUpCardProps {
  option: TopUpOption;
}

export function TopUpCard({ option }: TopUpCardProps) {
  return (
    <div className="relative flex flex-col cursor-pointer group bg-[#2d2d2d] rounded-2xl p-3 text-center text-white transition-all hover:ring-2 hover:ring-green-500">
      {option.inStockTag && (
        <div className="absolute top-2 right-2 badge-instock text-white text-[10px] font-bold px-2 py-0.5 rounded-md z-10">
          {option.inStockTag}
        </div>
      )}

      {option.discountTag && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm z-10">
          {option.discountTag}
        </div>
      )}
      
      {option.rechargeTag && (
          <div className="absolute top-0 left-0 z-10">
              <div className="relative h-6 w-20">
                <div className="absolute inset-0 bg-red-600 clip-recharge-tag"></div>
                 <p className="absolute inset-0 text-[10px] text-white flex items-center justify-center font-semibold pr-2">
                    {option.rechargeTag}
                 </p>
              </div>
          </div>
      )}


      <div className="relative w-full aspect-square mb-2 flex items-center justify-center">
        <Image
          src={option.image.imageUrl}
          alt={option.name}
          width={80}
          height={80}
          className="object-contain"
          data-ai-hint={option.image.imageHint}
        />
      </div>

      <div className="flex flex-col items-center">
        <p className="text-xs font-medium flex items-center justify-center text-center">
          {option.name}
        </p>
        <p className="text-xs font-semibold text-gray-300">{option.price}</p>
      </div>
    </div>
  );
}

// Helper CSS clip-path, which is hard to do with tailwind.
const RechargeTagClipPath = () => (
  <style jsx global>{`
    .clip-recharge-tag {
      clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
    }
  `}</style>
);
