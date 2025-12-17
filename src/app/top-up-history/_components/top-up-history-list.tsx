'use client';

import { useMemo } from 'react';
import { useCollection, useUser } from '@/firebase';
import { collection, query, orderBy, Timestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

type TopUpTransaction = {
  id: string;
  amount: number;
  status: 'Pending' | 'Completed' | 'Rejected';
  timestamp: Timestamp;
};

const StatusBadge = ({ status }: { status: TopUpTransaction['status'] }) => {
  const statusConfig = {
    Completed: {
      text: 'အောင်မြင်သည်',
      className: 'bg-green-600 hover:bg-green-700 text-white',
    },
    Pending: {
      text: 'စောင့်ဆိုင်းပါ',
      className: 'bg-yellow-500 hover:bg-yellow-600 text-black',
    },
    Rejected: {
      text: 'မအောင်မြင်',
      className: 'bg-red-600 hover:bg-red-700 text-white',
    },
  };

  const { text, className } = statusConfig[status] || statusConfig.Pending;

  return <Badge className={`rounded-full px-3 py-1 text-xs ${className}`}>{text}</Badge>;
};

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                    <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                    <TableHead><Skeleton className="h-5 w-20" /></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  </div>
);

export function TopUpHistoryList() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const transactionsQuery = useMemo(() => {
    if (!user) return null;
    return query(
      collection(firestore, `users/${user.uid}/topUpTransactions`),
      orderBy('timestamp', 'desc')
    );
  }, [user, firestore]);

  const { data: transactions, isLoading, error } = useCollection<TopUpTransaction>(
    transactionsQuery as any
  );

  if (isUserLoading || (isLoading && !transactions)) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <p className="py-10 text-center text-destructive">Error loading transaction history. Please try again later.</p>;
  }

  if (!transactions || transactions.length === 0) {
    return <p className="py-10 text-center text-muted-foreground">No transaction history found.</p>;
  }

  return (
    <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
       <h2 className="text-center text-lg font-bold mb-4 text-primary">ငွေဖြည့်မှတ်တမ်း</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-red-900/20">
            <TableRow>
              <TableHead className="text-red-400 font-semibold">ငွေပမာဏ</TableHead>
              <TableHead className="text-red-400 font-semibold">အချိန်</TableHead>
              <TableHead className="text-red-400 font-semibold">အခြေအနေ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium text-blue-400">{tx.amount.toLocaleString()} Ks</TableCell>
                <TableCell>{tx.timestamp.toDate().toLocaleString()}</TableCell>
                <TableCell>
                  <StatusBadge status={tx.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
