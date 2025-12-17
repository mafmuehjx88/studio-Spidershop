'use client';

import {
  Users,
  MessageSquare,
  Upload,
  Settings,
  X
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SheetClose } from "@/components/ui/sheet";

const adminMenuItems = [
  { href: "#", label: "သုံးစွဲသူများ", icon: Users },
  { href: "#", label: "Order comments", icon: MessageSquare },
  { href: "#", label: "Top up", icon: Upload },
  { href: "#", label: "Admin settings", icon: Settings },
];

export function AdminSidebar() {
  return (
    <div className="h-full flex flex-col bg-background text-white rounded-r-lg shadow-lg">
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-md">
                 <Image
                    src="/logo.png"
                    alt="Spider Game Shop Logo"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                />
            </div>
          <h3 className="text-lg font-bold">Spider Game Shop</h3>
        </div>
         <SheetClose asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </SheetClose>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          {adminMenuItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-12 text-base bg-white/90 text-black hover:bg-white"
                >
                  <item.icon className="h-6 w-6 mr-3" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
