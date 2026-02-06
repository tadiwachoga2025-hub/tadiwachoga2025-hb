"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { buttonAnimation } from "@/lib/motion";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "Sign in failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="inline-block mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-black">SUBURBAN</p>
                <p className="text-xs font-extrabold tracking-widest text-slate-muted">SECURITY</p>
              </div>
            </div>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-dark mb-2">Welcome back</h1>
            <p className="text-slate-muted">Sign in to access your security dashboard</p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 rounded-lg bg-primary/10 border border-primary/30 p-4">
            <p className="text-sm font-semibold text-dark mb-2">Demo Credentials:</p>
            <p className="text-xs text-slate-text font-mono">admin@suburban.com / admin123</p>
            <p className="text-xs text-slate-text font-mono">demo@suburban.com / demo123</p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              role="alert"
              aria-live="assertive"
              className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 flex items-start gap-3"
            >
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-dark mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-muted" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-border rounded-lg text-dark placeholder:text-slate-light-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-slate-light-bg disabled:cursor-not-allowed transition"
                  placeholder="your.email@company.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-dark mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-muted" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-border rounded-lg text-dark placeholder:text-slate-light-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-slate-light-bg disabled:cursor-not-allowed transition"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm text-slate-text">Remember me</span>
              </label>
              <Link href="#" className="text-sm font-semibold text-teal hover:text-teal-dark transition">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? buttonAnimation.whileHover : undefined}
              whileTap={!isLoading ? buttonAnimation.whileTap : undefined}
              transition={buttonAnimation.transition}
              className="w-full py-3.5 bg-black text-white font-semibold rounded-lg hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-slate-muted">
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-teal hover:text-teal-dark transition">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Brand */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#1E1E4D] to-slate-900 items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg text-white"
        >
          <Shield className="h-16 w-16 mb-8 opacity-90" />
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Enterprise Security Management Platform
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-8">
            Manage your entire security operations from one powerful dashboard. Scheduling, payroll,
            fleet tracking, compliance, and incident management — all in one place.
          </p>
          <div className="space-y-4">
            {[
              "Real-time fleet tracking with GPS",
              "Automated compliance monitoring",
              "Mobile apps for guards and supervisors",
              "Comprehensive incident reporting",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary/80" />
                <p className="text-white/90">{feature}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
