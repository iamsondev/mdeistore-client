const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

import { sellerService } from "@/services/seller.service";
import MedicineCard from "@/components/modules/homePage/MedicineCard";
import { Medicine } from "@/types";

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  const { data, error } = await sellerService.getSellerMedicine({
    searchTerm: params.searchTerm,
    page: params.page,
  });

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <h2 className="text-xl font-semibold text-red-500">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  const medicineList = data?.data || data || [];
  await delay(1000);

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">All Medicines</h1>

      {medicineList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {medicineList.map((medicine: Medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">
            No medicines found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
