'use client';

import { useMemo, useState } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, doc, query, orderBy } from 'firebase/firestore';
import { addDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { UserProfile } from '@/hooks/use-user-profile';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { useAdminStatus } from '@/hooks/use-admin-status';

const LoadingSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="h-12 w-full rounded-md" />
        {[...Array(3)].map((_, i) => (
             <Card key={i} className="bg-card">
                <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-6 w-20" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-16 mb-2" />
                        <div className="flex items-center gap-2">
                             <Skeleton className="h-10 flex-grow" />
                             <Skeleton className="h-10 w-20" />
                             <Skeleton className="h-10 w-20" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
);


export function UserList() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const { isAdmin, isAdminLoading } = useAdminStatus();

    const [adjustmentAmounts, setAdjustmentAmounts] = useState<Record<string, string>>({});
    const [searchTerm, setSearchTerm] = useState('');

    const usersQuery = useMemo(() => {
        if (!firestore || !isAdmin) return null;
        return query(collection(firestore, 'users'), orderBy('username'));
    }, [firestore, isAdmin]);

    const { data: users, isLoading: areUsersLoading, error } = useCollection<UserProfile>(usersQuery as any);
    
    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [users, searchTerm]);

    const handleAmountChange = (userId: string, value: string) => {
        setAdjustmentAmounts(prev => ({ ...prev, [userId]: value }));
    };

    const handleAdjustment = (user: UserProfile, type: 'top-up' | 'deduct') => {
        const amountStr = adjustmentAmounts[user.id];
        if (!amountStr) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please enter an amount.' });
            return;
        }

        const amount = parseInt(amountStr, 10);
        if (isNaN(amount) || amount <= 0) {
            toast({ variant: 'destructive', title: 'Invalid Amount', description: 'Please enter a valid positive number.' });
            return;
        }

        const currentBalance = user.balance || 0;
        let newBalance: number;

        if (type === 'top-up') {
            newBalance = currentBalance + amount;
            
            // Create notification for top-up
            const notificationData = {
              userId: user.id,
              message: `မင်္ဂလာပါ ${user.username} သင်ဝယ်ယူထားသော ငွေဖြည့်ပမာဏ ${amount} အား ဖြည့်သွင်းပေးပြီးပါပြီ...`,
              timestamp: new Date().toISOString(),
              isRead: false,
            };
            addDocumentNonBlocking(collection(firestore, `users/${user.id}/notifications`), notificationData);

        } else {
            if (currentBalance < amount) {
                toast({ variant: 'destructive', title: 'Deduction Failed', description: 'Insufficient balance.' });
                return;
            }
            newBalance = currentBalance - amount;
        }
        
        const userDocRef = doc(firestore, 'users', user.id);
        updateDocumentNonBlocking(userDocRef, { balance: newBalance });

        toast({
            title: 'Success',
            description: `Successfully ${type === 'top-up' ? 'added' : 'deducted'} ${amount} Ks ${type === 'top-up' ? 'to' : 'from'} ${user.username}.`,
        });

        // Clear the input field after saving
        setAdjustmentAmounts(prev => ({...prev, [user.id]: ''}));
    };

    if (areUsersLoading || isAdminLoading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <p className="py-10 text-center text-destructive">Error loading users: {error.message}</p>;
    }

    if (!isAdmin) {
        return <p className="py-10 text-center text-muted-foreground">You do not have permission to view this page.</p>;
    }
    
    return (
        <div className="space-y-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search by username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-card border-border"
                />
            </div>

            {filteredUsers.length === 0 ? (
                 <p className="py-10 text-center text-muted-foreground">No users found.</p>
            ): (
                <div className="space-y-4">
                    {filteredUsers.map((user) => (
                        <Card key={user.id} className="bg-card border-border">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-lg text-primary">{user.username}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                    <p className="font-semibold text-lg text-primary">{user.balance.toFixed(2)} Ks</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm font-medium mb-2 text-muted-foreground">Main Wallet</p>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="number"
                                            placeholder="Amount"
                                            value={adjustmentAmounts[user.id] || ''}
                                            onChange={(e) => handleAmountChange(user.id, e.target.value)}
                                            className="bg-background border-border"
                                        />
                                        <Button onClick={() => handleAdjustment(user, 'top-up')} className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-4">
                                            Top Up
                                        </Button>
                                        <Button onClick={() => handleAdjustment(user, 'deduct')} variant="destructive" className="bg-red-700 hover:bg-red-800 text-white h-10 px-4">
                                            Deduct
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
