import { Header } from "@/components/layout/header";
import { HeroBanner } from "@/components/home/hero-banner";
import { ProductGrid } from "@/components/home/product-grid";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <HeroBanner />
        <ProductGrid />
      </main>
    </div>
  );
}
