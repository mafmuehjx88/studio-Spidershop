import { Header } from "@/components/layout/header";
import { OrderList } from "./_components/order-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 bg-background text-foreground">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <div className="mb-4">
             <Button asChild variant="ghost" className="bg-gray-700/50 hover:bg-gray-600/50">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
          </div>
          <OrderList />
        </div>
      </main>
    </div>
  );
}
