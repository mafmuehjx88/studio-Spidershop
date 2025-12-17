import { products } from "@/lib/products";
import { ProductCard } from "@/components/home/product-card";
import { Marquee } from "@/components/ui/marquee";

export function ProductGrid() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 overflow-hidden whitespace-nowrap">
           <Marquee>
              အသုံးပြုကြတဲ့ Users အားလုံး စိတ်ကျေနပ်မှုအပြည့်အဝရရှိစေရန်
           </Marquee>
        </div>
        <h2 className="mb-8 text-center font-headline text-3xl font-bold uppercase tracking-wider text-primary">
          Our Products
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
