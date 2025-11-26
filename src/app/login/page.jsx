"use client";

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../src/Firebase/firebase.config"; 


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter your email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      window.location.href = "/";
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Login successful");
      window.location.href = "/";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-neutral-900 to-black p-10 rounded-2xl shadow-2xl border border-white/10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-wide">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Sign in to continue to{" "}
            <span className="text-primary font-semibold">QuantumGear</span>
          </p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-primary"
              placeholder="your@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-primary"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-primary/30"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-purple-600 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-purple-700/30 flex items-center justify-center gap-2"
          >
            <FcGoogle size={24} /> Sign In with Google
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400 text-sm">
          Don’t have an account?
          <Link href="/register" className="text-primary hover:text-secondary">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
