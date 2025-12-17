import { products } from "@/lib/products";
import { topUpOptions } from "@/lib/top-up-options";
import { Header } from "@/components/layout/header";
import { ProductDetailClient } from "./_components/product-detail-client";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.id === params.id);
  const options = topUpOptions[params.id] || [];

  if (!product) {
    return (
      <div className="flex flex-col">
        <Header />
        <main className="pt-16 text-center">
          <h1 className="mt-8 text-2xl">Product not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header />
      <main className="pt-16">
        <ProductDetailClient product={product} options={options} />
      </main>
    </div>
  );
}
