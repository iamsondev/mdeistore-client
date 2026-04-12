import MedicineCardSkeleton from "@/components/modules/homePage/MedicineCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-8 lg:px-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-12 w-64 rounded-2xl" />
          <Skeleton className="h-4 w-96 rounded-lg" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
           <Skeleton className="hidden lg:block w-64 xl:w-72 h-[600px] rounded-[2rem]" />
           
           <div className="flex-1 w-full flex flex-col gap-6">
              <div className="hidden lg:flex justify-between items-center mb-4">
                <Skeleton className="h-6 w-32 rounded-lg" />
                <Skeleton className="h-10 w-48 rounded-xl" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <MedicineCardSkeleton key={i} />
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
