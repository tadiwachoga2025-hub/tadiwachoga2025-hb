"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, User, AlertCircle, Loader2, Check, X } from "lucide-react";
import { buttonAnimation } from "@/lib/motion";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: "", color: "" };

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 1) return { score, label: "Weak", color: "bg-red-500" };
    if (score <= 3) return { score, label: "Fair", color: "bg-yellow-500" };
    if (score <= 4) return { score, label: "Good", color: "bg-blue-500" };
    return { score, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    const result = await signup(name, email, password);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "Sign up failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#0F172A] to-slate-900 items-center justify-center p-12 relative overflow-hidden">
        {/* Abstract background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-500 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg text-white relative z-10"
        >
          <Shield className="h-16 w-16 mb-8 opacity-90" />
          <h2 className="text-4xl font-black mb-6 leading-tight tracking-tight">
            Join the Intelligence Layer for Modern Security
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            Manage your entire security operations from one powerful platform.
            Real-time insights, compliance automation, and team alignment.
          </p>
          <div className="space-y-4">
            {[
              "Enterprise-grade fleet tracking",
              "Automated compliance logs",
              "Unified incident command",
              "Advanced officer monitoring",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-yellow-500 text-slate-900 flex items-center justify-center flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                <p className="text-slate-100 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
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
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Create account</h1>
            <p className="text-slate-500">Professional security management starts here.</p>
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
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed transition"
                  placeholder="Officer Name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed transition"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed transition"
                  placeholder="Security credential"
                />
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-500">Security strength:</span>
                    <span className={`text-xs font-bold ${passwordStrength.score <= 1 ? "text-red-600" :
                      passwordStrength.score <= 3 ? "text-yellow-600" :
                        passwordStrength.score <= 4 ? "text-blue-600" : "text-green-600"
                      }`}>
                      {passwordStrength.label.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${i <= passwordStrength.score ? passwordStrength.color : "bg-slate-100"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed transition"
                  placeholder="Verify credential"
                />
                {confirmPassword && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {password === confirmPassword ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <X className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-offset-0"
                />
                <span className="text-xs text-slate-500 leading-normal">
                  I agree to the{" "}
                  <Link href="#" className="font-bold text-slate-900 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="font-bold text-slate-900 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? buttonAnimation.whileHover : undefined}
              whileTap={!isLoading ? buttonAnimation.whileTap : undefined}
              transition={buttonAnimation.transition}
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black shadow-[0_4px_20px_-4px_rgba(15,23,42,0.3)] focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-slate-500">
            Already registered?{" "}
            <Link href="/signin" className="font-bold text-slate-900 hover:underline transition">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
