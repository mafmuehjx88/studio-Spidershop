'use client';

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserProfileCard } from "./_components/user-profile-card";
import { Card, CardContent } from "@/components/ui/card";
import { FaViber, FaTelegramPlane } from 'react-icons/fa';
import { LogOut, UserCircle } from "lucide-react";
import { useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { TotalOrdersCard } from "./_components/total-orders-card";
import { TopBuyersCard } from "./_components/top-buyers-card";
import { TotalUsersCard } from "./_components/total-users-card";


const socialLinks = [
    { name: 'Viber', href: 'https://invite.viber.com', icon: FaViber },
    { name: 'Channel', href: 'https://t.me/SpiderGameShop11', icon: FaTelegramPlane },
    { name: 'Account', href: 'https://t.me/Spider_N112', icon: UserCircle },
    { name: 'Group', href: 'https://t.me', icon: FaTelegramPlane }
]

export default function AccountPage() {
    const auth = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        if (auth) {
            signOut(auth).then(() => {
                router.push('/login');
            });
        }
    };


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 bg-background text-foreground">
        <div className="container mx-auto px-4 py-8 md:px-6 space-y-6">
            <UserProfileCard />

            <div className="grid grid-cols-2 gap-4">
              <TotalOrdersCard />
              <TotalUsersCard />
            </div>

            <TopBuyersCard />
            
            <Card className="bg-card border-border">
                <CardContent className="p-4">
                    <p className="text-center text-sm text-muted-foreground">
                        မနက် 9 နာရီ မှ ည 9 နาရီ အတွင်း ငွေသွင်းပါက ၁၅ မိနစ်အတွင်းအကောင့်ထဲဝင်လာပါမည်။ (Event နေ့ဆိုကြာပါတယ် မြန်မြန်ရချင်ရင် Event မလာခင်ထဲက ကြိုထည့်ထားပါ) ❤️
                    </p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                {socialLinks.map(link => (
                    <Button key={link.name} asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-base">
                        <Link href={link.href}>
                             <link.icon className="mr-2 h-5 w-5" />
                            {link.name}
                        </Link>
                    </Button>
                ))}
            </div>

            <Button onClick={handleLogout} variant="destructive" className="w-full bg-red-800/80 hover:bg-red-800 text-white">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
            </Button>
        </div>
      </main>
    </div>
  );
}
