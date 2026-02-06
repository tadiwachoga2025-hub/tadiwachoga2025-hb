"use client";

import { forwardRef, useState } from "react";
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon: LucideIcon;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, icon: Icon, error, type = "text", className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-dark"
        >
          {label}
        </label>
        <div className="relative">
          <Icon
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-muted"
            aria-hidden="true"
          />
          <input
            ref={ref}
            id={id}
            type={inputType}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              "w-full rounded-lg border border-slate-border px-4 py-3 pl-12 text-dark",
              "placeholder:text-slate-light-muted",
              "transition-colors duration-150",
              "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              isPassword && "pr-12",
              error && "border-danger focus:border-danger focus:ring-danger/20",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-muted hover:text-dark focus:outline-none focus-visible:text-dark"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p id={`${id}-error`} className="text-sm text-danger" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
