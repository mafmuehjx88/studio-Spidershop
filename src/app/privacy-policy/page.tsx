import { Header } from "@/components/layout/header";

export default function PrivacyPolicyPage() {
  const effectiveDate = new Date().toLocaleDateString('en-CA');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 bg-background text-foreground">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy for Spider Game Shop</h1>
            
            <p className="text-muted-foreground">Effective Date: {effectiveDate}</p>

            <p>Welcome to Spider Game Shop. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">1. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Application includes:</p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-foreground">Personal Data:</strong> Personally identifiable information, such as your username, email address, and demographic information, that you voluntarily give to us when you register with the Application.</li>
                <li><strong className="text-foreground">Financial Data:</strong> We do not directly store financial information. All payments are processed through secure third-party payment gateways. We only store transaction history and order details required for service delivery.</li>
                <li><strong className="text-foreground">Data From Social Networks:</strong> User information from social networking sites, such as your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Create and manage your account.</li>
                <li>Process your transactions and deliver the products and services you request.</li>
                <li>Email you regarding your account or order.</li>
                <li>Notify you of updates to the Application.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Application.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. Security of Your Information</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. Policy for Children</h2>
            <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>
            
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">5. Contact Us</h2>
            <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
            <p>Spider Game Shop Admin</p>
            <p>Phone: <strong>09256184317</strong></p>
            <p>Email: <a href="mailto:support@spidergameshop.com" className="text-accent hover:underline">support@spidergameshop.com</a></p>
          </article>
        </div>
      </main>
    </div>
  );
}
