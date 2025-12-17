'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStatus } from '@/hooks/use-admin-status';
import { useUser } from '@/firebase';
import { UserList } from './_components/user-list';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/layout/header';

const LoadingSkeleton = () => (
    <div className="p-4 md:p-6 space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-4">
                <Skeleton className="h-96 w-full" />
            </div>
        </div>
    </div>
);


export default function AdminUsersPage() {
  const { isUserLoading } = useUser();
  const { isAdmin, isAdminLoading } = useAdminStatus();
  const router = useRouter();

  useEffect(() => {
    // Wait until both loading states are resolved
    if (!isUserLoading && !isAdminLoading) {
      // If, after loading, the user is not an admin, redirect them
      if (!isAdmin) {
        router.push('/');
      }
    }
  }, [isUserLoading, isAdminLoading, isAdmin, router]);

  // While loading, show a skeleton UI
  if (isUserLoading || isAdminLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">
            <LoadingSkeleton />
        </main>
      </div>
    );
  }

  // If the user is definitively not an admin (and not loading), they will be redirected by the useEffect.
  // We can show a simple message while that happens.
  if (!isAdmin) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-16 flex items-center justify-center">
                <p>Access Denied. Redirecting...</p>
            </main>
      </div>
    );
  }

  // If loading is done and the user is an admin, show the UserList
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8 md:px-6">
            <h1 className="text-2xl font-bold mb-6 text-primary">သုံးစွဲသူများ စာရင်း</h1>
            <UserList />
        </div>
      </main>
    </div>
  );
}
