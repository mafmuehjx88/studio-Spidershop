import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NotificationList } from "./_components/notification-list";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 bg-background text-foreground">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <div className="flex justify-between items-center mb-6">
             <Button asChild variant="ghost" className="bg-gray-700/50 hover:bg-gray-600/50">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <h1 className="text-xl font-bold text-primary">အသိပေးချက်များ</h1>
            {/* Placeholder for potential actions like "Mark all as read" */}
            <div></div>
          </div>
          <NotificationList />
        </div>
      </main>
    </div>
  );
}
