"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme Provider Component
 *
 * Wraps the application with next-themes provider for dark/light mode support.
 * Features:
 * - Persists theme preference in localStorage
 * - Respects system preference by default
 * - Uses class-based dark mode (compatible with Tailwind)
 * - Prevents flash on page load with attribute
 *
 * @param children - React children to wrap
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="suburban-security-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
