import { sellerService } from "@/services/seller.service";
import { Button } from "@/components/ui/button";
import { MedicineTable } from "@/components/modules/seller/medicine/MedicineTable";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function MyInventoryPage() {
  const cookieStore = await cookies();

  const sessionRes = await fetch("http://localhost:3000/api/auth/get-session", {
    headers: { Cookie: cookieStore.toString() },
  });
  const session = await sessionRes.json();

  const { data } = await sellerService.getSellerMedicine(
    { sellerId: session?.user?.id },
    { cache: "no-store" },
  );

  const medicineList = data?.data || data || [];

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Inventory</h1>
        <Button size="sm">Add New Medicine</Button>
      </div>
      <MedicineTable medicines={medicineList} />
    </div>
  );
}
