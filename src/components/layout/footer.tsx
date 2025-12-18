import Link from 'next/link';
import { ShoppingCart, FileText, User } from 'lucide-react';

export function Footer() {
  return (
    <>
      {/* Non-fixed part with legal links, appears at the bottom of content */}
      <footer className="w-full bg-background pt-8 pb-24">
        <div className="container mx-auto flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms &amp; Conditions</Link>
        </div>
      </footer>

      {/* Fixed navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 w-full border-t bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto flex items-center justify-around w-full h-16 px-4 md:px-6">
            <Link href="/" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors gap-1">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-xs font-medium">SHOP</span>
            </Link>
            <Link href="/orders" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors gap-1">
              <FileText className="h-6 w-6" />
              <span className="text-xs font-medium">ORDER</span>
            </Link>
            <Link href="/account" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors gap-1">
              <User className="h-6 w-6" />
              <span className="text-xs font-medium">ACCOUNT</span>
            </Link>
        </div>
      </div>
    </>
  );
}
