import { Header } from "@/components/layout/header";
import { HeroBanner } from "@/components/home/hero-banner";
import { ProductGrid } from "@/components/home/product-grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WelcomeDialog } from "@/components/home/welcome-dialog";

export default function Home() {
  return (
    <div className="flex flex-col">
      <WelcomeDialog />
      <Header />
      <main className="pt-16">
        <HeroBanner />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 gap-4">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-sm">
              <Link href="/top-up">ငွေဖြည့်မည်</Link>
            </Button>
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 text-sm">
              <Link href="/orders">အော်ဒါများ</Link>
            </Button>
          </div>
        </div>
        <ProductGrid />
      </main>
    </div>
  );
}
