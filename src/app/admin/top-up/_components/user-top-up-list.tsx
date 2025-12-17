'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { useAdminStatus } from '@/hooks/use-admin-status';
import { collection, doc } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import type { UserProfile } from '@/hooks/use-user-profile';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';


const LoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead><Skeleton className="h-5 w-24" /></TableHead>
            <TableHead><Skeleton className="h-5 w-20" /></TableHead>
            <TableHead><Skeleton className="h-5 w-64" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell className="flex items-center gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-10 w-16" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);


export function UserTopUpList() {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const { isAdmin, isAdminLoading } = useAdminStatus();

  // state to hold the amount for each user
  const [amounts, setAmounts] = useState<Record<string, string>>({});

  const usersQuery = useMemo(() => {
    if (!firestore || !isAdmin) return null;
    return collection(firestore, 'users');
  }, [isAdmin, firestore]);

  const { data: users, isLoading: areUsersLoading, error } = useCollection<UserProfile>(usersQuery as any);

  useEffect(() => {
    // Wait until loading is done, then check if user is not an admin
    if (!isUserLoading && !isAdminLoading && !isAdmin) {
      router.push('/');
    }
  }, [isUserLoading, isAdmin, isAdminLoading, router]);

  const handleAmountChange = (userId: string, value: string) => {
    // only allow numbers
    if (/^\d*$/.test(value)) {
        setAmounts(prev => ({ ...prev, [userId]: value }));
    }
  };

  const handleBalanceUpdate = (userId: string, operation: 'add' | 'deduct') => {
    const amountStr = amounts[userId];
    if (!amountStr) {
      toast({ variant: 'destructive', title: 'Invalid Amount', description: 'Please enter a valid amount.' });
      return;
    }
    
    const amount = parseInt(amountStr, 10);
    if (isNaN(amount) || amount <= 0) {
      toast({ variant: 'destructive', title: 'Invalid Amount', description: 'Amount must be a positive number.' });
      return;
    }

    const userToUpdate = users?.find(u => u.id === userId);
    if (!userToUpdate) return;
    
    const currentBalance = userToUpdate.balance ?? 0;
    const newBalance = operation === 'add'
      ? currentBalance + amount
      : currentBalance - amount;

    if (newBalance < 0) {
      toast({ variant: 'destructive', title: 'Operation Failed', description: "User balance cannot be negative." });
      return;
    }

    const userDocRef = doc(firestore, 'users', userId);
    updateDocumentNonBlocking(userDocRef, { balance: newBalance });

    toast({
      title: 'Balance Updated',
      description: `${userToUpdate.username}'s balance has been updated to ${newBalance}.`
    });

    // Clear the input field for that user
    setAmounts(prev => ({...prev, [userId]: ''}));
  };

  // Wait for auth and admin status to be resolved
  if (isUserLoading || isAdminLoading) {
    return <LoadingSkeleton />;
  }

  // If not an admin, show an access denied message while redirecting.
  if (!isAdmin) {
    return (
        <div className="text-center py-10">
            <p className="text-destructive">Access Denied. You are not an admin.</p>
            <p className="text-muted-foreground">Redirecting...</p>
        </div>
    );
  }
  
  if (areUsersLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <p className="py-10 text-center text-destructive">Error loading users. Please try again later.</p>;
  }

  if (!users || users.length === 0) {
    return <p className="py-10 text-center text-muted-foreground">No users found.</p>;
  }

  return (
    <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-red-900/20">
            <TableRow>
              <TableHead className="text-red-400 font-semibold">Username</TableHead>
              <TableHead className="text-red-400 font-semibold">Balance</TableHead>
              <TableHead className="text-red-400 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{(user.balance ?? 0).toLocaleString()} Ks</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Amount"
                      className="w-24 h-9 bg-input"
                      value={amounts[user.id] || ''}
                      onChange={(e) => handleAmountChange(user.id, e.target.value)}
                    />
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleBalanceUpdate(user.id, 'add')}>Add</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleBalanceUpdate(user.id, 'deduct')}>Deduct</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
