"use client";

import { useEffect, useState } from "react";
import { Menu, Wallet, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { useUserProfile } from "@/hooks/use-user-profile";
import Link from 'next/link';

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

  const balance = isProfileLoading ? "..." : `${userProfile?.balance ?? 0} Ks`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b-0">
      <ClientOnly>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
             <Button asChild variant="outline" className="bg-card border-border rounded-full h-10 px-4">
               <Link href="/top-up">
                <span className="text-sm font-semibold text-white">{balance}</span>
                <Plus className="h-4 w-4 text-white ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-full text-foreground bg-card">
              <Link href="/notifications">
                <Bell className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </ClientOnly>
    </header>
  );
}
