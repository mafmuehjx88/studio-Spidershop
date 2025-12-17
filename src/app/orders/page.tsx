import { Header } from "@/components/layout/header";
import { OrderList } from "./_components/order-list";

export default function OrdersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <h1 className="text-2xl font-bold mb-6 text-primary">Order History</h1>
          <OrderList />
        </div>
      </main>
    </div>
  );
}
