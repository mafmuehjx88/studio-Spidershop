'use client';

import { useMemo } from 'react';
import { useCollectionGroup, useFirestore, useUser } from '@/firebase';
import { collectionGroup, query } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipboardList } from 'lucide-react';

const LoadingSkeleton = () => (
    <Card className="bg-card border-border">
        <CardContent className="p-4 flex items-center gap-4">
            <Skeleton className="h-10 w-10" />
            <div className="space-y-1">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
            </div>
        </CardContent>
    </Card>
);

export function TotalOrdersCard() {
    const firestore = useFirestore();
    const { user, isUserLoading } = useUser();

    const allOrdersQuery = useMemo(() => {
        // Only run the query if the user is signed in.
        if (!firestore || !user) return null;
        return query(collectionGroup(firestore, 'orders'));
    }, [firestore, user]);

    const { data: orders, isLoading: isOrdersLoading, error } = useCollectionGroup(allOrdersQuery);

    const isLoading = isUserLoading || isOrdersLoading;

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        // Don't show an aggressive error, just log it and show a fallback.
        console.error("Error loading total orders:", error);
        return (
             <Card className="bg-card border-destructive/50">
                <CardContent className="p-4">
                    <p className="text-center text-sm text-destructive">Could not load total orders.</p>
                </CardContent>
            </Card>
        );
    }
    
    const totalOrderCount = orders?.length ?? 0;

    return (
        <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                     <div className="bg-blue-500/20 p-3 rounded-full">
                        <ClipboardList className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-primary">စုစုပေါင်းအော်ဒါ အရေအတွက်</h3>
                        <p className="text-muted-foreground text-sm">All user orders</p>
                    </div>
                </div>
                <p className="text-2xl font-bold text-primary">{totalOrderCount.toLocaleString()}</p>
            </CardContent>
        </Card>
    );
}