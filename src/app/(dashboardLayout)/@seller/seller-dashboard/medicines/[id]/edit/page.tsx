import { EditMedicineFormClient } from "@/components/modules/seller/medicine/EditMedicineFormClient";
import { customerService } from "@/services/customer.service";
import { sellerService } from "@/services/seller.service";

export default async function EditMedicinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: categoryData } = await customerService.getCategories();
  const categories = categoryData?.data || [];

  const { data: medicineData } = await sellerService.getMedicineById(id);
  const medicine = medicineData?.data || medicineData;

  return (
    <div className="flex justify-center w-full p-4">
      <EditMedicineFormClient categories={categories} medicine={medicine} />
    </div>
  );
}
