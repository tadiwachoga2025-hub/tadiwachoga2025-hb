import Link from "next/link";
import { ShieldOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/15">
        <ShieldOff className="h-10 w-10 text-teal" />
      </div>
      <h1 className="mt-8 text-5xl font-bold text-black">404</h1>
      <p className="mt-3 text-lg text-dark">Page not found</p>
      <p className="mt-2 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-slate-border px-6 py-3 text-sm font-semibold text-dark transition hover:bg-background-light"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
