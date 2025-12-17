'use client';

import { useAdminStatus } from '@/hooks/use-admin-status';
import { useUser } from '@/firebase';
import { UserList } from './_components/user-list';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/layout/header';

const LoadingSkeleton = () => (
    <div className="p-4 md:p-6 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-10 w-full rounded-md" />
        <div className="space-y-4 pt-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-20" />
                    </div>
                     <Skeleton className="h-4 w-40" />
                    <div className="grid grid-cols-3 gap-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);


export default function AdminUsersPage() {
  const { isUserLoading } = useUser();
  const { isAdmin, isAdminLoading } = useAdminStatus();

  const isLoading = isUserLoading || isAdminLoading;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8 md:px-6">
          {isLoading ? (
             <LoadingSkeleton />
          ) : isAdmin ? (
            <>
              <h1 className="text-2xl font-bold text-primary">Manual Wallet Adjustment</h1>
              <p className="text-muted-foreground mb-6">Find users to add or deduct funds from their wallets.</p>
              <UserList />
            </>
          ) : (
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
