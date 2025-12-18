
"use client";

import { useEffect, useState, useMemo } from "react";
import { Menu, Wallet, Bell, Plus, Shield } from "lucide-react";
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
import { useUser, useFirestore, useCollection } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import { useAdminStatus } from "@/hooks/use-admin-status";

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
  const { user } = useUser();
  const firestore = useFirestore();
  const { isAdmin, isAdminLoading } = useAdminStatus();

  const notificationsQuery = useMemo(() => {
    if (!user) return null;
    return query(
      collection(firestore, `users/${user.uid}/notifications`),
      where('isRead', '==', false)
    );
  }, [user, firestore]);

  const { data: unreadNotifications } = useCollection<{ isRead: boolean }>(notificationsQuery as any);

  const notificationCount = unreadNotifications?.length ?? 0;

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
            {!isAdminLoading && isAdmin && (
                <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-full text-foreground bg-card">
                    <Link href="/admin/users">
                        <Shield className="h-5 w-5 text-yellow-400" />
                    </Link>
                </Button>
            )}
            <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-full text-foreground bg-card relative">
              <Link href="/notifications">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center pointer-events-none">
                    {notificationCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </ClientOnly>
    </header>
  );
}
