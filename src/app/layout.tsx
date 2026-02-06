import type { Metadata, Viewport } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/client-providers";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Suburban Security | Enterprise Security Management",
  description:
    "Complete security workforce management platform with scheduling, payroll, fleet tracking, and compliance — purpose-built for security companies.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Suburban Security",
    description:
      "Complete security workforce management platform — scheduling, payroll, fleet tracking, and compliance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-primary antialiased bg-background-DEFAULT dark:bg-slate-950 text-text dark:text-slate-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:rounded-lg focus:bg-black focus:p-4 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Skip to main content
        </a>
        <ClientProviders>
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  );
}
