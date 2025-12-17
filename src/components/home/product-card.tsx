import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative overflow-hidden rounded-lg shadow-md">
        <Image
          src={product.image.imageUrl}
          alt={product.image.description}
          width={400}
          height={400}
          className="aspect-square w-full object-cover"
          data-ai-hint={product.image.imageHint}
        />
        {product.tag && (
          <div
            className={`absolute top-2 right-2 rounded-md px-2 py-1 text-xs font-bold text-white ${
              product.tagColor || "bg-red-600"
            }`}
          >
            {product.tag}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center text-center gap-2">
        <p className="w-full text-[10px] font-medium text-muted-foreground h-10 flex items-center justify-center whitespace-nowrap">
          {product.name}
        </p>
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          Buy Now
        </Button>
      </div>
    </div>
  );
}
