"use server";

import { sellerService } from "@/services/seller.service";
import { revalidateTag } from "next/cache";

export interface MedicineData {
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  image: string;
  categoryId: string;
}

export const createMedicine = async (data: MedicineData) => {
  const res = await sellerService.createMedicine(data);
  revalidateTag("medicines", "max");
  return res;
};

export const deleteMedicine = async (id: string) => {
  console.log("Deleting medicine with id:", id);
  const res = await sellerService.deleteMedicine(id);
  console.log("Delete response:", res);
  return res;
};

export const updateMedicine = async (
  id: string,
  data: Partial<MedicineData>,
) => {
  console.log("Action updateMedicine called:", id, data);
  const res = await sellerService.updateMedicine(id, data);
  console.log("Update response:", res);
  return res;
};
