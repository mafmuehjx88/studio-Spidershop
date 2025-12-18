
import { products } from "@/lib/products";
import { ProductCard } from "@/components/home/product-card";
import { Marquee } from "@/components/ui/marquee";

export function ProductGrid() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <h2 className="mb-8 text-center font-headline text-2xl font-bold uppercase tracking-normal text-primary">
          OUR PRODUCTS
        </h2>
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
