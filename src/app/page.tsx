import { Header } from "@/components/layout/header";
import { HeroBanner } from "@/components/home/hero-banner";
import { ProductGrid } from "@/components/home/product-grid";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="pt-16">
        <HeroBanner />
        <ProductGrid />
      </main>
    </div>
  );
}
