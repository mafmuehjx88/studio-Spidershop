"use client";

import { useMemo } from "react";
import { useUser, useDoc, useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";

export function useAdminStatus() {
  const { user } = useUser();
  const firestore = useFirestore();

  const adminDocRef = useMemo(() => {
    if (!user) return null;
    return doc(firestore, `admins/${user.uid}`);
  }, [user, firestore]);

  const { data: adminDoc, isLoading } = useDoc(adminDocRef);

  const isAdmin = !!adminDoc;

  return { isAdmin, isAdminLoading: isLoading };
}
