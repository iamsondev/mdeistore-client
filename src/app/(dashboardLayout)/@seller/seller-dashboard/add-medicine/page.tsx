// add-medicine/page.tsx
import { customerService } from "@/services/customer.service";
import { AddMedicineFormClient } from "@/components/modules/seller/medicine/addMedicineFormClient";

export default async function AddMedicinePage() {
  const { data } = await customerService.getCategories();
  const categories = data?.data || [];

  return (
    <div className="flex justify-center w-full p-4">
      <AddMedicineFormClient categories={categories} />
    </div>
  );
}
