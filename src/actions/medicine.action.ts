"use server";

import { sellerService } from "@/services/seller.service";
import { revalidatePath } from "next/cache";

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
  revalidatePath("/seller/medicines");
  return res;
};

export const deleteMedicine = async (id: string) => {
  const res = await sellerService.deleteMedicine(id);
  revalidatePath("/seller/medicines");
  return res;
};

export const updateMedicine = async (
  id: string,
  data: Partial<MedicineData>,
) => {
  const res = await sellerService.updateMedicine(id, data);
  revalidatePath("/seller/medicines");
  return res;
};
