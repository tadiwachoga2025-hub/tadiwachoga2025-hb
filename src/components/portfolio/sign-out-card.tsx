"use client";

import { LogOut, ShieldAlert } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export function SignOutCard() {
  const { logout } = useAuth();

  return (
    <div className="bg-white rounded-lg p-6 shadow-portfolio border border-portfolio-border">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-md bg-portfolio-bg">
          <ShieldAlert className="w-5 h-5 text-portfolio-risk" />
        </div>
        <h2 className="text-base font-semibold text-portfolio-text">Sign Out</h2>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-portfolio-text">End this session</p>
          <p className="text-xs text-portfolio-text-muted mt-1">
            Sign out from the current device. Use when leaving a secure site or shared workstation.
          </p>
        </div>
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 rounded-lg bg-portfolio-risk px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
