import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* 1. Hero Skeleton - Matching h-[65vh] */}
      <div className="relative w-full h-[65vh] bg-muted/20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-16 flex items-center h-full">
          <div className="max-w-lg space-y-6 flex-1">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-6 w-48 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-full md:w-[90%] rounded-xl" />
              <Skeleton className="h-12 w-3/4 rounded-xl" />
            </div>
            <Skeleton className="h-4 w-2/3 rounded-full" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-14 w-40 rounded-full" />
              <Skeleton className="h-14 w-40 rounded-full" />
            </div>
          </div>
          <div className="hidden md:block w-[38%] h-[80%]">
             <Skeleton className="w-full h-full rounded-[2.5rem]" />
          </div>
        </div>
      </div>

      {/* 2. Statistics Skeleton */}
      <div className="py-12 bg-muted/10 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="h-8 w-20 rounded-lg" />
                <Skeleton className="h-3 w-24 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Featured Medicines Grid Skeleton (Desktop 4 cards) */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center space-y-4 mb-16">
            <Skeleton className="h-12 w-64 rounded-xl" />
            <Skeleton className="h-4 w-96 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-background rounded-[2.5rem] p-8 border border-border space-y-6"
              >
                <div className="relative aspect-square">
                  <Skeleton className="w-full h-full rounded-2xl" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-3 w-20 rounded-full" />
                  <Skeleton className="h-6 w-full rounded-lg" />
                  <Skeleton className="h-3 w-1/2 rounded-full" />
                </div>
                <div className="pt-4 border-t flex justify-between items-center">
                  <div className="space-y-2">
                    <Skeleton className="h-2 w-10 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-lg" />
                  </div>
                  <Skeleton className="h-10 w-24 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
