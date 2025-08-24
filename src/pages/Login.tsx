"use client";

import type React from "react";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password });
  };

  return (
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alvar@example.com"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Log in
            </button>
            <p className="text-center text-sm mt-4">
              Don't have a Pro account?{" "}
              <a href="#" className="text-blue-500 underline">
                Get one here
              </a>
            </p>
            <p className="text-center text-sm">
              <a href="#" className="text-gray-500 underline">
                Reset password
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
