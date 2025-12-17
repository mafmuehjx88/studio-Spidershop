'use client';

import { useMemo } from 'react';
import { useCollection, useUser } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { BellRing, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type Notification = {
  id: string;
  message: string;
  timestamp: string;
  isRead: boolean;
};

const LoadingSkeleton = () => (
  <div className="space-y-3">
    {[...Array(3)].map((_, i) => (
      <Card key={i} className="bg-card border-border">
        <CardContent className="p-4 flex items-start gap-4">
          <Skeleton className="h-8 w-8 rounded-full mt-1" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/4 mt-1" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export function NotificationList() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const notificationsQuery = useMemo(() => {
    if (!user) return null;
    return query(
      collection(firestore, `users/${user.uid}/notifications`),
      orderBy('timestamp', 'desc')
    );
  }, [user, firestore]);

  const { data: notifications, isLoading, error } = useCollection<Notification>(
    notificationsQuery as any
  );

  if (isUserLoading || (isLoading && !notifications)) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <p className="py-10 text-center text-destructive">
        Error loading notifications. Please try again later.
      </p>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className="bg-card p-8 rounded-lg border border-border shadow-sm text-center">
        <p className="text-muted-foreground">လက်ရှိတွင် အသိပေးချက်အသစ်များ မရှိသေးပါ။</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`bg-card border-border transition-colors ${
            notification.isRead ? 'border-border/30' : 'border-primary/50'
          }`}
        >
          <CardContent className="p-4 flex items-start gap-4">
            <div className={`mt-1 h-8 w-8 flex-shrink-0 rounded-full flex items-center justify-center ${notification.isRead ? 'bg-muted' : 'bg-primary/20'}`}>
                <BellRing className={`h-5 w-5 ${notification.isRead ? 'text-muted-foreground' : 'text-primary'}`} />
            </div>
            <div className="flex-1">
              <p className={`text-sm ${notification.isRead ? 'text-muted-foreground' : 'text-foreground'}`}>
                {notification.message}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
              </p>
            </div>
             {/* Optional: Add a button to mark as read */}
             {!notification.isRead && (
                 <button className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-transparent hover:bg-muted transition-colors">
                    <Check className="h-5 w-5 text-green-500" />
                 </button>
             )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
