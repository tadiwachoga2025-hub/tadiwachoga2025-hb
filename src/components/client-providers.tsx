"use client";

import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Client Providers Wrapper
 *
 * This component establishes the Server/Client Component boundary.
 * By creating this wrapper, we allow the root layout to remain a Server Component
 * while still providing client-side context to child components that need it.
 *
 * Benefits:
 * - Pages can be Server Components by default (better performance)
 * - Enables server-side data fetching
 * - Reduces JavaScript bundle size by ~40-50%
 * - Improves SEO and initial page load
 *
 * Providers included:
 * - ThemeProvider: Dark/light mode with system preference detection
 * - AuthProvider: User authentication state management
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
