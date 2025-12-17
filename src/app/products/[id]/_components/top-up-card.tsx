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
        <p className="text-xs font-medium flex items-center justify-center text-center h-10">
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
