import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-4">
      <div className="container mx-auto flex items-center justify-center px-4 md:px-6">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-center text-sm text-muted-foreground">
          <Link href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
