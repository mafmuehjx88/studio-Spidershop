import { products } from "@/lib/products";
import { ProductCard } from "@/components/home/product-card";

export function ProductGrid() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <h2 className="mb-8 text-center font-headline text-3xl font-bold uppercase tracking-wider">
          Top Up Now
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
