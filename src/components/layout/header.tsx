"use client";

import { useEffect, useState } from "react";
import { Menu, Shield, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useAdminStatus } from "@/hooks/use-admin-status";
import { useUser } from "@/firebase";
import { AdminSidebar } from "./admin-sidebar";

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}


export function Header() {
  const { userProfile, isLoading: isProfileLoading } = useUserProfile();
  const { isAdmin } = useAdminStatus();
  const { user } = useUser();

  const balance = isProfileLoading ? "..." : `${userProfile?.balance ?? 0} Ks`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b">
      <ClientOnly>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-lg text-foreground bg-gray-700/50 hover:bg-gray-600/50"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="p-4 bg-transparent border-0">
                <SheetTitle className="sr-only">Sidebar Menu</SheetTitle>
                <Sidebar />
              </SheetContent>
            </Sheet>
            
            {user && isAdmin && (
              <Sheet>
                <SheetTrigger asChild>
                   <Button
                    size="icon"
                    className="h-10 w-10 bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                  >
                    <Shield className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-80 bg-transparent border-0">
                   <SheetTitle className="sr-only">Admin Menu</SheetTitle>
                   <AdminSidebar />
                </SheetContent>
              </Sheet>
            )}

          </div>
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-lg font-bold text-primary-foreground">
              Spider Game Shop
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-white" />
            <span className="text-sm font-semibold text-white">{balance}</span>
          </div>
        </div>
      </ClientOnly>
    </header>
  );
}
