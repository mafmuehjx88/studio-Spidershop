
import { products } from "@/lib/products";
import { ProductCard } from "@/components/home/product-card";
import { Marquee } from "@/components/ui/marquee";

export function ProductGrid() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 space-y-4">
            <div className="mb-4">
                <Marquee>
                    <span className="text-green-400 font-bold drop-shadow-[0_0_5px_theme('colors.green.400')]">
                        Spider Game Shop မှကြိုဆိုပါသည်
                    </span>
                </Marquee>
            </div>
          <h2 className="text-center font-headline text-2xl font-bold uppercase tracking-normal text-primary">
            OUR PRODUCTS
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
