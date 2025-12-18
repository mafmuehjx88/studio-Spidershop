import { Header } from "@/components/layout/header";

export default function TermsAndConditionsPage() {
  const lastUpdatedDate = new Date().toLocaleDateString('en-CA');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 bg-background text-foreground">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-primary mb-6">Terms and Conditions</h1>
            <p className="text-muted-foreground">Last Updated: {lastUpdatedDate}</p>

            <p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the Spider Game Shop mobile application (the "Service") operated by Spider Game Shop ("us", "we", or "our").</p>
            <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>
            
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">1. Accounts</h2>
            <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
            <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. Service Provision</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>Our Service provides a platform for purchasing in-game currency ("Top-Ups") for various mobile games.</li>
                <li>Wallet top-up requests made between 9 AM and 9 PM will be processed within 15 minutes. Requests outside these hours, or during high-traffic event days, may experience delays.</li>
                <li>Direct game top-ups using your wallet balance are processed instantly, 24/7.</li>
                <li>You are responsible for providing the correct in-game User ID and any other required information. We are not liable for Top-Ups sent to an incorrect ID provided by you.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. Payments and Refunds</h2>
            <p>All purchases are final. Once a Top-Up is successfully delivered to the game account, no refunds will be issued. If a transaction fails due to a system error on our part, your balance will be automatically refunded to your in-app wallet.</p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. Prohibited Activities</h2>
            <p>You are expressly prohibited from using the Service for any fraudulent activities, including but not limited to, using stolen payment information or attempting to manipulate the service. Any such activity will result in immediate account termination and may be reported to law enforcement.</p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">5. Termination</h2>
            <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">6. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms and Conditions on this page.</p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">7. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact our support team:</p>
            <p>Admin Phone: <strong>09256184317</strong></p>
             <p>Telegram: <a href="https://t.me/Spider_N112" className="text-accent hover:underline">@Spider_N112</a></p>
          </article>
        </div>
      </main>
    </div>
  );
}
