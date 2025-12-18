'use client';

import { useUserProfile } from '@/hooks/use-user-profile';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const UserProfileSkeleton = () => (
    <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-5 w-16" />
        </div>
    </div>
);

export function UserProfileCard() {
  const { userProfile, isLoading } = useUserProfile();
  const logo = PlaceHolderImages.find((p) => p.id === 'logo');

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (!userProfile) {
    return (
        <div className="flex items-center gap-4">
             {logo && (
                <div className="bg-white rounded-full p-1">
                    <Image
                        src={logo.imageUrl}
                        alt="Default Avatar"
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                </div>
            )}
            <div>
                <p className="text-xl font-bold">Guest</p>
                <p className="text-muted-foreground">Please log in</p>
            </div>
        </div>
    );
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
