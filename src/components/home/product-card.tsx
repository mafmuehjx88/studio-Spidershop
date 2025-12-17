import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-xl border-border/20 shadow-lg">
        <Image
          src={product.image.imageUrl}
          alt={product.image.description}
          width={400}
          height={400}
          className="aspect-square w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
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
      <div className="flex flex-col items-center text-center">
        <p className="w-full truncate text-base text-muted-foreground">
          {product.name}
        </p>
        <Button className="mt-2 w-full max-w-xs bg-accent text-lg font-bold text-accent-foreground hover:bg-accent/90">
          Buy Now
        </Button>
      </div>
    </div>
  );
}
