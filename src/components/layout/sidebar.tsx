import {
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  Gamepad2,
  Home,
  Mail,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "#", label: "ငွေသွင်းရန်", icon: CircleDollarSign },
  { href: "#", label: "အသိပေးချက်များ", icon: Mail },
  { href: "#", label: "အော်ဒါများ", icon: ClipboardList },
  { href: "#", label: "ကံစမ်းရန်", icon: Gamepad2 },
  { href: "#", label: "Account", icon: User },
];

export function Sidebar() {
  return (
    <div className="h-full flex flex-col bg-[#1a1a1a] text-white sparkle-bg">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <SheetClose asChild>
          <Button variant="ghost" size="icon" className="text-white">
            <X className="h-6 w-6" />
          </Button>
        </SheetClose>
        <h2 className="text-lg font-semibold">Zenith Harrai Shop</h2>
        <Button variant="ghost" size="icon" className="text-white">
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex flex-col items-center p-6 space-y-4">
        <div className="relative">
          <div className="bg-white p-2 rounded-lg">
            <Image
              src="/logo.png"
              alt="Zenith Harrai Logo"
              width={64}
              height={64}
              className="h-16 w-16"
            />
          </div>
        </div>
        <h3 className="text-xl font-bold">Zenith Harrai</h3>
      </div>

      <nav className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.label}>
                <Button
                  variant="outline"
                  className="w-full h-14 bg-white text-black font-semibold text-base justify-center gap-2 border-none hover:bg-gray-200"
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
