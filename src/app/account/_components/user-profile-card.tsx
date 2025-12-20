'use client';

import { useUserProfile } from '@/hooks/use-user-profile';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@/firebase';

const UserProfileSkeleton = () => (
    <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-5 w-16" />
        </div>
    </div>
);

const GuestPrompt = () => (
    <Card className="bg-card border border-border p-4 text-center space-y-3">
        <p className="text-destructive font-semibold">အကောင့်ဝင်ပြီးမှသာ ဝန်ဆောင်မှုများကို အပြည့်အဝ အသုံးပြုနိုင်မှာဖြစ်ပါတယ်။</p>
        <div className="flex gap-3 justify-center">
            <Button asChild className="bg-gray-600 hover:bg-gray-700 text-white w-full">
                <Link href="/login">အကောင့်ဝင်ရန်</Link>
            </Button>
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white w-full">
                <Link href="/register">အကောင့်သစ်ဖွင့်ရန်</Link>
            </Button>
        </div>
    </Card>
);


export function UserProfileCard() {
  const { isUserLoading } = useUser();
  const { userProfile, isLoading: isProfileLoading } = useUserProfile();
  const logo = PlaceHolderImages.find((p) => p.id === 'logo');

  const isLoading = isUserLoading || isProfileLoading;

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (!userProfile) {
    return <GuestPrompt />;
  }

  return (
    <div className="flex items-center gap-4">
        {logo && (
             <div className="bg-white rounded-full p-1">
                <Image
                    src={logo.imageUrl}
                    alt={`${userProfile.username}'s avatar`}
                    width={64}
                    height={64}
                    className="rounded-full"
                />
            </div>
        )}
      <div>
        <p className="text-xl font-bold">{userProfile.username}</p>
        <p className="text-lg font-semibold text-primary">{userProfile.balance.toLocaleString()} ကျပ်</p>
      </div>
    </div>
  );
}
