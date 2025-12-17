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
