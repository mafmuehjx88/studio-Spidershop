import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-xl border-border/20 bg-card shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1">
      <CardHeader className="relative p-0">
        <Image
          src={product.image.imageUrl}
          alt={product.image.description}
          width={400}
          height={400}
          className="aspect-square w-full object-cover"
          data-ai-hint={product.image.imageHint}
        />
        {product.tag && (
          <div className={`absolute top-2 right-2 rounded-md px-2 py-1 text-xs font-bold text-white ${product.tagColor || 'bg-red-600'}`}>
            {product.tag}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-grow flex-col p-4 text-center">
        <p className="mt-2 flex-grow text-base text-muted-foreground">
          {product.name}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-accent text-lg font-bold text-accent-foreground hover:bg-accent/90">
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
