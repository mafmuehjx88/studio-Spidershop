'use client';

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

  // This is now the single source of truth for rendering logic.
  const isLoading = isUserLoading || isAdminLoading;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8 md:px-6">
          {/* STATE 1: LOADING */}
          {isLoading && <LoadingSkeleton />}

          {/* STATE 2: NOT LOADING AND IS ADMIN */}
          {!isLoading && isAdmin && (
            <>
              <h1 className="text-2xl font-bold mb-6 text-primary">သုံးစွဲသူများ စာရင်း</h1>
              <UserList />
            </>
          )}

          {/* STATE 3: NOT LOADING AND NOT ADMIN */}
          {!isLoading && !isAdmin && (
            <div className="flex flex-col items-center justify-center text-center py-10">
                <p className="text-2xl font-bold text-destructive">Access Denied</p>
                <p className="text-muted-foreground mt-2">You do not have permission to view this page.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
