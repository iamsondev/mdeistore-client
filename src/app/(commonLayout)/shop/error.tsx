"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

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
    <div className="container mx-auto px-4 h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="bg-destructive/10 p-4 rounded-full mb-6">
        <AlertCircle className="h-12 w-12 text-destructive" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
        Something went wrong!
      </h2>

      <p className="text-muted-foreground max-w-md mb-8">
        We encountered an error while loading the medicine list. Please try
        again or return to the homepage.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={() => reset()} className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </Button>

        <Button variant="outline" asChild className="flex items-center gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
