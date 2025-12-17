'use client';

import { useAdminStatus } from '@/hooks/use-admin-status';
import { useUser } from '@/firebase';
import { OrderManagement } from './_components/order-management';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/layout/header';

const LoadingSkeleton = () => (
    <div className="p-4 md:p-6 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
        <div className="space-y-4 pt-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-20" />
                    </div>
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-10 w-full" />
                </div>
            ))}
        </div>
    </div>
);


export default function AdminOrdersPage() {
  const { isUserLoading } = useUser();
  const { isAdmin, isAdminLoading } = useAdminStatus();

  const isLoading = isUserLoading || isAdminLoading;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <h1 className="text-2xl font-bold text-primary mb-2">Order Management</h1>
          <p className="text-muted-foreground mb-6">Review and approve pending user orders.</p>
          
          {isLoading ? (
            <LoadingSkeleton />
          ) : isAdmin ? (
            <OrderManagement />
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
