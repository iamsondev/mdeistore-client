import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MedicineCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden border-border/40 shadow-xl shadow-black/5 flex flex-col rounded-[2rem] bg-card/50">
      {/* ── Image Skeleton ── */}
      <Skeleton className="h-56 w-full rounded-none" />

      {/* ── Header Skeleton ── */}
      <CardHeader className="p-6 pb-2 space-y-3">
        <div className="flex justify-between items-center">
           <Skeleton className="h-3 w-16" />
           <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-6 w-3/4 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-full rounded-md" />
          <Skeleton className="h-3 w-5/6 rounded-md" />
        </div>
      </CardHeader>

      {/* ── Meta Section Skeleton ── */}
      <CardContent className="p-6 pt-2 flex-grow">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-8 w-24 rounded-xl" />
            </div>
            <Skeleton className="h-8 w-24 rounded-xl" />
          </div>

          <div className="flex items-center gap-4 py-4 border-y border-border/40">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
        </div>
      </CardContent>

      {/* ── Actions Skeleton ── */}
      <CardFooter className="p-6 pt-0 gap-3">
        <Skeleton className="h-12 flex-1 rounded-[1.25rem]" />
        <Skeleton className="h-12 flex-[1.5] rounded-[1.25rem]" />
      </CardFooter>
    </Card>
  );
}
