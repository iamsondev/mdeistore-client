"use server";

import { adminService } from "@/services/admin.service";
import { revalidatePath } from "next/cache";

export const updateUserStatus = async (id: string, status: string) => {
  const res = await adminService.updateUserStatus(id, status);
  revalidatePath("/admin/users");
  return res;
};

export const createCategory = async (
  name: string,
  description: string,
  image: string,
) => {
  const res = await adminService.createCategory(name, description, image);
  revalidatePath("/admin/categories");
  return res;
};

export const updateCategory = async (
  id: string,
  name: string,
  description: string,
) => {
  const res = await adminService.updateCategory(id, name, description);
  revalidatePath("/admin/categories");
  return res;
};

export const deleteCategory = async (id: string) => {
  const res = await adminService.deleteCategory(id);
  revalidatePath("/admin/categories");
  return res;
};
