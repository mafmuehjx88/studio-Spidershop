import { Header } from "@/components/layout/header";
import { RegisterForm } from "./_components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center pt-16">
        <div className="w-full max-w-md p-4">
          <RegisterForm />
        </div>
      </main>
    </div>
  );
}
