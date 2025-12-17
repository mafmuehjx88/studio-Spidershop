'use client';

import { useMemo, useState } from 'react';
import { useCollectionGroup, useFirestore, useUser } from '@/firebase';
import { collectionGroup, doc, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { updateDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { collection } from 'firebase/firestore';
import { useAdminStatus } from '@/hooks/use-admin-status';

type Order = {
  id: string;
  userId: string;
  productName: string;
  optionName: string;
  price: string;
  status: 'Completed' | 'Pending' | 'Failed';
  timestamp: string;
  gameId: string;
  serverId?: string;
  username?: string; // Add username to display
};

const LoadingSkeleton = () => (
    <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
            <Card key={i} className="bg-card border-border">
                <CardContent className="p-4 flex justify-between items-center">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-10 w-24 rounded-md" />
                </CardContent>
            </Card>
        ))}
    </div>
);


export function OrderManagement() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const { isAdmin } = useAdminStatus();
    
    // Query for pending orders across all users only if the current user is an admin.
    const pendingOrdersQuery = useMemo(() => {
        if (!isAdmin) return null; // Prevent non-admins from making this query
        const ordersCollection = collectionGroup(firestore, 'orders');
        return query(ordersCollection, where('status', '==', 'Pending'), orderBy('timestamp', 'desc'));
    }, [firestore, isAdmin]);

    const { data: orders, isLoading, error } = useCollectionGroup<Order>(pendingOrdersQuery as any);

    const handleApprove = (order: Order) => {
        if (!order.userId || !order.id) {
            toast({ variant: 'destructive', title: 'Error', description: 'Invalid order data.' });
            return;
        }

        const orderDocRef = doc(firestore, `users/${order.userId}/orders`, order.id);

        // 1. Update order status to "Completed"
        updateDocumentNonBlocking(orderDocRef, { status: 'Completed' });
        
        // 2. Send notification to the user
        const notificationMessage = `Order ${order.id.slice(0, 6)} အား အောင်မြင်စွာပြီးဆုံးပါပြီ`;
        const notificationData = {
          userId: order.userId,
          message: notificationMessage,
          timestamp: new Date().toISOString(),
          isRead: false,
        };
        addDocumentNonBlocking(collection(firestore, `users/${order.userId}/notifications`), notificationData);

        toast({
            title: 'Order Approved',
            description: `Order #${order.id.slice(0,6)} has been marked as completed.`,
            variant: 'success'
        });
    };

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <p className="py-10 text-center text-destructive">Error loading orders: {error.message}</p>;
    }
    
    if (!orders || orders.length === 0) {
        return (
             <div className="flex flex-col items-center justify-center text-center py-10 bg-card rounded-lg">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <p className="text-xl font-bold text-primary">No Pending Orders</p>
                <p className="text-muted-foreground mt-2">All caught up! There are no pending orders to review.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <Card key={order.id} className="bg-card border-border">
                    <CardHeader className="p-4 border-b border-border/50">
                       <CardTitle className="text-base flex justify-between items-center">
                            <span>Order #{order.id.slice(0,6).toUpperCase()}</span>
                             <Badge className="bg-yellow-500 text-black font-bold">
                                <Clock className="mr-1 h-3 w-3" />
                                Pending
                            </Badge>
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                         <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <p><strong className="text-muted-foreground">User:</strong></p><p className="text-right font-semibold text-primary">{order.username || order.userId}</p>
                            <p><strong className="text-muted-foreground">Game:</strong></p><p className="text-right">{order.productName}</p>
                            <p><strong className="text-muted-foreground">Item:</strong></p><p className="text-right">{order.optionName}</p>
                            <p><strong className="text-muted-foreground">Game ID:</strong></p><p className="text-right font-mono bg-muted px-2 py-1 rounded-sm">{order.gameId}{order.serverId ? ` (${order.serverId})` : ''}</p>
                            <p><strong className="text-muted-foreground">Price:</strong></p><p className="text-right">{order.price}</p>
                            <p><strong className="text-muted-foreground">Time:</strong></p><p className="text-right text-xs">{new Date(order.timestamp).toLocaleString()}</p>
                         </div>
                         <Button 
                            onClick={() => handleApprove(order)} 
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                            အတည်ပြုမည် (Approve)
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
