"use client";

import { useMemo } from "react";
import { useUser, useDoc, useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  balance: number;
};

export function useUserProfile() {
  const { user } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemo(() => {
    if (!user) return null;
    return doc(firestore, `users/${user.uid}`);
  }, [user, firestore]);

  const { data: userProfile, isLoading, error } = useDoc<UserProfile>(userDocRef);

  return { userProfile, isLoading, error };
}
