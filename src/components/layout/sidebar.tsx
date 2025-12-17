'use client';

import {
  CircleDollarSign,
  ClipboardList,
  FileText,
  Gamepad2,
  Home,
  LogIn,
  Mail,
  Shield,
  User,
  UserPlus,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@/firebase/provider";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminStatus } from "@/hooks/use-admin-status";

const baseMenuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "#", label: "ငွေသွင်းရန်", icon: CircleDollarSign },
  { href: "#", label: "အသိပေးချက်များ", icon: Mail },
  { href: "/orders", label: "အော်ဒါများ", icon: ClipboardList },
  { href: "#", label: "ကံစမ်းရန်", icon: Gamepad2 },
  { href: "#", label: "Account", icon: User },
];

const GuestSidebar = () => (
  <div className="h-full flex flex-col bg-[#1a1a1a] text-white rounded-lg">
    <div className="flex flex-col items-center p-4 space-y-2">
      <div className="relative">
        <div className="bg-white p-1 rounded-lg">
          <Image
            src="/logo.png"
            alt="Zenith Harrai Logo"
            width={48}
            height={48}
            className="h-12 w-12"
          />
        </div>
      </div>
      <h3 className="text-lg font-bold">Zenith Harrai</h3>
    </div>

    <nav className="flex-1 p-4 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Link href="/register">
          <Button
            variant="outline"
            className="w-full h-auto py-3 bg-white text-black font-semibold text-sm justify-center gap-2 border-none hover:bg-gray-200"
          >
            <UserPlus className="h-5 w-5" />
            <span>Register Account</span>
          </Button>
        </Link>
        <Link href="/login">
          <Button
            variant="outline"
            className="w-full h-auto py-3 bg-white text-black font-semibold text-sm justify-center gap-2 border-none hover:bg-gray-200"
          >
            <LogIn className="h-5 w-5" />
            <span>Login Account</span>
          </Button>
        </Link>
      </div>

      <div className="text-center text-sm text-gray-400 mt-4">
        <p>သင် App အသုံးပြုနည်းကို အရင်ဆုံး ကြည့်ပေးပါဗျ..</p>
      </div>

      <div className="space-y-3">
        <Link href="#" className="block">
          <div className="bg-gray-800/50 p-3 rounded-lg flex items-center gap-4">
             <div className="bg-white/10 p-2 rounded-md">
                <FileText className="h-6 w-6 text-yellow-400" />
             </div>
             <div>
                <p className="font-bold text-white">Users</p>
                <p className="text-xs text-gray-300">ဖတ်ထားသင့်သော App စည်းမျဉ်းများ</p>
             </div>
          </div>
        </Link>
        <Link href="#" className="block">
          <div className="bg-gray-800/50 p-3 rounded-lg flex items-center gap-4">
            <div className="bg-white/10 p-2 rounded-md">
              <Youtube className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="font-bold text-white">App အသုံးပြုနည်း</p>
              <p className="text-xs text-gray-300">အသုံးပြုနည်း Video များ</p>
            </div>
          </div>
        </Link>
      </div>
    </nav>
  </div>
);

const AuthenticatedSidebar = () => {
    const { isAdmin, isAdminLoading } = useAdminStatus();

    const menuItems = [...baseMenuItems];
    if (isAdmin) {
        menuItems.push({ href: "#", label: "Admin Panel", icon: Shield });
    }

    if (isAdminLoading) {
      return (
        <div className="h-full flex flex-col bg-[#1a1a1a] text-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-3">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-md bg-gray-700" />
                ))}
            </div>
        </div>
      )
    }

    return (
        <div className="h-full flex flex-col bg-[#1a1a1a] text-white rounded-lg">
          <nav className="flex-1 p-4">
            <div className="grid grid-cols-2 gap-3">
              {menuItems.map((item) => (
                <Link href={item.href} key={item.label}>
                    <Button
                      variant="outline"
                      className="w-full h-auto py-3 bg-white text-black font-semibold text-sm justify-center gap-2 border-none hover:bg-gray-200"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Button>
                </Link>
              ))}
            </div>
          </nav>
        </div>
    );
}

const LoadingSidebar = () => (
    <div className="h-full flex flex-col bg-[#1a1a1a] text-white rounded-lg p-4 space-y-4">
        <div className="flex flex-col items-center space-y-2">
            <Skeleton className="h-14 w-14 rounded-lg bg-gray-700" />
            <Skeleton className="h-6 w-32 rounded-md bg-gray-700" />
        </div>
        <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-12 w-full rounded-md bg-gray-700" />
            <Skeleton className="h-12 w-full rounded-md bg-gray-700" />
        </div>
         <div className="space-y-3 pt-4">
            <Skeleton className="h-16 w-full rounded-lg bg-gray-700" />
            <Skeleton className="h-16 w-full rounded-lg bg-gray-700" />
        </div>
    </div>
);


export function Sidebar() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return <LoadingSidebar />;
  }

  return user ? <AuthenticatedSidebar /> : <GuestSidebar />;
}
