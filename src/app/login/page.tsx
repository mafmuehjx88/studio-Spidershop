import { Header } from "@/components/layout/header";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center pt-16">
        <div className="w-full max-w-md p-4">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
