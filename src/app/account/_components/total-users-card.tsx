'use client';

import { useMemo } from 'react';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users } from 'lucide-react';
import type { UserProfile } from '@/hooks/use-user-profile';

const LoadingSkeleton = () => (
    <Card className="bg-card border-border h-full">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <Skeleton className="h-8 w-8 mb-2" />
            <Skeleton className="h-6 w-20" />
        </CardContent>
    </Card>
);

export function TotalUsersCard() {
    const firestore = useFirestore();
    const { user, isUserLoading } = useUser();
    const BASE_USER_COUNT = 35; // Starting count

    const usersQuery = useMemo(() => {
        // Only run the query if the user is logged in
        if (!firestore || !user) return null;
        return query(collection(firestore, 'users'));
    }, [firestore, user]);

    const { data: users, isLoading: isUsersLoading, error } = useCollection<UserProfile>(usersQuery);

    const isLoading = isUserLoading || (user && isUsersLoading);

    if (isLoading && user) { // Only show skeleton if a user is logged in and loading
        return <LoadingSkeleton />;
    }

    if (error) {
        console.error("Error loading total users:", error);
         // Don't show an error card for guests, just show 0
        if (user) {
            return (
                 <Card className="bg-card border-destructive/50 h-full">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                        <p className="text-xs text-destructive">Could not load users.</p>
                    </CardContent>
                </Card>
            );
        }
    }
    
    // If logged in, show the live count. Otherwise, show 0.
    const totalUserCount = user ? (users?.length ?? 0) + BASE_USER_COUNT : 0;

    return (
        <Card className="bg-card border-border h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full space-y-1">
                <Users className="h-8 w-8 text-green-400" />
                <p className="font-bold text-xl text-primary">{totalUserCount.toLocaleString()}</p>
                <h3 className="font-semibold text-sm text-muted-foreground">အသုံးပြုသူများ</h3>
            </CardContent>
        </Card>
    );
}
