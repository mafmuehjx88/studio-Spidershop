import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotificationsPage() {
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
          <div className="bg-card p-8 rounded-lg border border-border shadow-sm text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">အသိပေးချက်များ</h1>
            <p className="text-muted-foreground">လက်ရှိတွင် အသိပေးချက်အသစ်များ မရှိသေးပါ။</p>
          </div>
        </div>
      </main>
    </div>
  );
}
