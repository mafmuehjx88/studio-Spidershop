import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-lg text-foreground"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-lg text-foreground"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
        <Link href="/" className="flex items-center">
           <Image
            src="/logo.png"
            alt="Zenith Harrai Logo"
            width={36}
            height={36}
            className="h-9 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
