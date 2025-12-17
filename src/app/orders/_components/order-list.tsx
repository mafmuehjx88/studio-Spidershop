"use client";

import { useMemo } from "react";
import { useCollection, useUser } from "@/firebase";
import { collection, query, orderBy, where } from "firebase/firestore";
import { useFirestore } from "@/firebase/provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type Order = {
  id: string;
  productName: string;
  optionName: string;
  price: string;
  status: "Completed" | "Pending" | "Failed";
  timestamp: {
    seconds: number;
  };
  gameId: string;
  serverId?: string;
};

const StatusBadge = ({ status }: { status: Order["status"] }) => {
  const variant = {
    Completed: "default",
    Pending: "secondary",
    Failed: "destructive",
  }[status];

  const className = {
    Completed: "bg-green-600 text-white",
    Pending: "bg-yellow-500 text-black",
    Failed: "bg-red-600 text-white",
  }[status];

  return (
    <Badge variant={variant as any} className={className}>
      {status}
    </Badge>
  );
};

const OrderCard = ({ order }: { order: Order }) => (
    <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between p-4">
            <div className="flex flex-col">
                <CardTitle className="text-base font-bold">{order.productName}</CardTitle>
                <CardDescription className="text-xs">{order.optionName}</CardDescription>
            </div>
            <StatusBadge status={order.status} />
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span>{order.price}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span>{new Date(order.timestamp.seconds * 1000).toLocaleDateString()}</span>
            </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">Game ID:</span>
                <span>{order.gameId}{order.serverId ? ` (${order.serverId})` : ''}</span>
            </div>
        </CardContent>
    </Card>
);

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <Card key={i} className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    ))}
  </div>
);

export function OrderList() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const ordersQuery = useMemo(() => {
    if (!user) return null;
    return query(
      collection(firestore, `users/${user.uid}/orders`),
      orderBy("timestamp", "desc")
    );
  }, [user, firestore]);

  const { data: orders, isLoading, error } = useCollection<Order>(ordersQuery as any);

  if (isUserLoading || (isLoading && !orders)) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <p className="text-destructive text-center">Error loading orders.</p>;
  }

  if (!orders || orders.length === 0) {
    return <p className="text-center text-muted-foreground">No orders found.</p>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
