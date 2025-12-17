import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="flex flex-col gap-2 group">
      <div className="relative overflow-hidden rounded-lg shadow-md transition-transform group-hover:scale-105">
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
        <p className="w-full h-10 flex items-center justify-center text-[10px] font-medium text-green-400">
          {product.name}
        </p>
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          Buy Now
        </Button>
      </div>
    </Link>
  );
}
