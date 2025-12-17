'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from "@/components/layout/header";
import { UserTopUpList, LoadingSkeleton } from "./_components/user-top-up-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useUser } from '@/firebase';
import { useAdminStatus } from '@/hooks/use-admin-status';

export default function AdminTopUpPage() {
  const { isUserLoading } = useUser();
  const { isAdmin, isAdminLoading } = useAdminStatus();
  const router = useRouter();

  useEffect(() => {
    // This is now the single source of truth for redirection.
    // It waits for ALL loading to be complete before deciding to redirect.
    if (!isUserLoading && !isAdminLoading && !isAdmin) {
      router.push('/');
    }
  }, [isUserLoading, isAdmin, isAdminLoading, router]);

  const renderContent = () => {
    // 1. Centralized Loading Check: Wait for auth and admin status to be fully resolved.
    if (isUserLoading || isAdminLoading) {
      return (
        <div className="mt-8">
            <h1 className="text-2xl font-bold text-center mb-6 text-primary">User Top-Up Management</h1>
            <LoadingSkeleton />
        </div>
      );
    }
  
    // 2. Definitive Access Check: After loading, if the user is not an admin, show nothing.
    // The useEffect hook above will handle the actual redirection.
    if (!isAdmin) {
      return (
          <div className="text-center py-10">
              <p className="text-destructive">Access Denied. You are not an admin.</p>
              <p className="text-muted-foreground">Redirecting...</p>
          </div>
      );
    }
    
    // 3. Render Content: Finally, if all checks pass, render the actual content for the admin.
    return (
        <>
            <h1 className="text-2xl font-bold text-center mb-6 text-primary">User Top-Up Management</h1>
            <UserTopUpList />
        </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 bg-background text-foreground sparkle-bg">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <div className="mb-4">
             <Button asChild variant="ghost" className="bg-gray-700/50 hover:bg-gray-600/50">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
