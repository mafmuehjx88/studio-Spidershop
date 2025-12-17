'use client';

import { useMemo, useState } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, doc, query, orderBy } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { UserProfile } from '@/hooks/use-user-profile';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const LoadingSkeleton = () => (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                    <TableHead><Skeleton className="h-5 w-48" /></TableHead>
                    <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                    <TableHead><Skeleton className="h-5 w-48" /></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-20" />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
);


export function UserList() {
    const firestore = useFirestore();
    const { toast } = useToast();

    // Local state to manage the input for each user's new balance
    const [balanceInputs, setBalanceInputs] = useState<Record<string, string>>({});

    const usersQuery = useMemo(() => {
        return query(collection(firestore, 'users'), orderBy('username'));
    }, [firestore]);

    const { data: users, isLoading: areUsersLoading, error } = useCollection<UserProfile>(usersQuery as any);

    const handleBalanceChange = (userId: string, value: string) => {
        setBalanceInputs(prev => ({ ...prev, [userId]: value }));
    };

    const handleSaveBalance = (userId: string) => {
        const newBalanceStr = balanceInputs[userId];
        if (newBalanceStr === undefined || newBalanceStr.trim() === '') {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Please enter a balance amount.',
            });
            return;
        }

        const newBalance = parseInt(newBalanceStr, 10);
        if (isNaN(newBalance) || newBalance < 0) {
            toast({
                variant: 'destructive',
                title: 'Invalid Amount',
                description: 'Please enter a valid non-negative number.',
            });
            return;
        }
        
        const userDocRef = doc(firestore, 'users', userId);
        updateDocumentNonBlocking(userDocRef, { balance: newBalance });

        toast({
            title: 'Success',
            description: `Successfully updated balance for user ${userId.slice(0, 6)}...`,
        });

        // Clear the input field after saving
        setBalanceInputs(prev => ({...prev, [userId]: ''}));
    };

    if (areUsersLoading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <p className="py-10 text-center text-destructive">Error loading users: {error.message}</p>;
    }

    if (!users || users.length === 0) {
        return <p className="py-10 text-center text-muted-foreground">No users found.</p>;
    }

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Current Balance</TableHead>
                        <TableHead>Update Balance</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.balance} Ks</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Enter new balance"
                                        value={balanceInputs[user.id] || ''}
                                        onChange={(e) => handleBalanceChange(user.id, e.target.value)}
                                        className="max-w-xs"
                                    />
                                    <Button onClick={() => handleSaveBalance(user.id)} size="sm">
                                        Save
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
