"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Registration failed.");
      }

      router.push("/dashboard");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05050a] text-white">
      {/* Background Glow */}
      <div className="animate-auth-glow pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

      <div className="animate-auth relative flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo / Branding */}
          <div
            className="animate-auth mb-8 text-center"
            style={{ animationDelay: "60ms" }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-bold"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-600/20">
                <Sparkles className="h-5 w-5" />
              </div>

              <span>
                HireSense{" "}
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  AI
                </span>
              </span>
            </Link>

            <h1 className="mt-8 text-3xl font-bold tracking-tight">
              Create your account
            </h1>

            <p className="mt-3 text-sm text-gray-400">
              Start improving your resume with AI-powered career intelligence.
            </p>
          </div>

          {/* Signup Card */}
          <div
            className="animate-auth rounded-3xl border border-white/10 bg-white/[0.05] p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8"
            style={{ animationDelay: "120ms" }}
          >
            <form onSubmit={handleSignup} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-violet-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/10"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-violet-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/10"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 pr-12 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-violet-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {/* Error Message */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Signup Button */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 font-semibold shadow-xl shadow-violet-600/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-violet-600/30"
              >
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && (
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                )}
              </button>
            </form>

            {/* Login */}
            <p className="mt-7 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-violet-400 transition hover:text-violet-300"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Footer text */}
          <p className="mt-6 text-center text-xs leading-5 text-gray-600">
            By creating an account, you agree to use HireSense AI responsibly.
          </p>
        </div>
      </div>
    </main>
  );
}
