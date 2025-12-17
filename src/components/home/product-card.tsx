import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-xl border-border/20 bg-card shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2">
      <CardHeader className="relative p-0">
        <Image
          src={product.image.imageUrl}
          alt={product.image.description}
          width={400}
          height={300}
          className="h-48 w-full object-cover"
          data-ai-hint={product.image.imageHint}
        />
      </CardHeader>
      <CardContent className="flex flex-grow flex-col p-4">
        <CardTitle className="font-headline text-lg uppercase">
          {product.name}
        </CardTitle>
        <p className="mt-2 flex-grow text-sm text-muted-foreground">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-accent font-bold text-accent-foreground hover:bg-accent/90">
          Buy for {product.price}
        </Button>
      </CardFooter>
    </Card>
  );
}
