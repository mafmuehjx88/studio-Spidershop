import { products } from "@/lib/products";
import { ProductCard } from "@/components/home/product-card";

export function ProductGrid() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="text-center mb-8">
            <p className="text-muted-foreground">အသုံးပြုကြတဲ့ Users အားလုံး စိတ်ကျေနပ်မှုအပြည့်အဝရရှိစေရန်</p>
            <h2 className="mt-2 text-center font-headline text-3xl font-bold uppercase tracking-wider text-primary-foreground">
             Our Products
            </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
