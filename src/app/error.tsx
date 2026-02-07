"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50">
        <AlertTriangle className="h-10 w-10 text-red-600" />
      </div>
      <h1 className="mt-8 text-3xl font-bold text-black">Something went wrong</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        An unexpected error occurred. Our team has been notified.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90"
      >
        Try Again
      </button>
    </div>
  );
}
