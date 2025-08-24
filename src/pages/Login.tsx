"use client";

import LoginForm from "@/components/login-form";
import RedirectIfLoggedIn from "@/context/RedirectIfLoggedIn";

export default function LoginPage() {
  return (
    <RedirectIfLoggedIn>
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* LEFT: IMAGE / ART */}
        <div className="hidden md:block md:w-1/2 h-64 md:h-auto">
          <img
            src="https://www.aluron.pl/wp-content/uploads/2024/05/for-individual-clients-big.webp"
            alt="Southwold Beach House"
            className="object-cover w-full h-full"
          />
        </div>

        {/* RIGHT: LOGIN FORM */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 min-h-screen">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-semibold mb-6">Log in</h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </RedirectIfLoggedIn>
  );
}
