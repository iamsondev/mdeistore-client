"use server";

import { adminService } from "@/services/admin.service";
import { revalidateTag } from "next/cache";

export const updateUserStatus = async (id: string, status: string) => {
  const res = await adminService.updateUserStatus(id, status);
  revalidateTag("users");
  return res;
};

export const createCategory = async (
  name: string,
  description: string,
  image: string,
) => {
  const res = await adminService.createCategory(name, description, image);
  revalidateTag("categories");
  return res;
};

export const updateCategory = async (
  id: string,
  name: string,
  description: string,
) => {
  const res = await adminService.updateCategory(id, name, description);
  revalidateTag("categories");
  return res;
};

export const deleteCategory = async (id: string) => {
  const res = await adminService.deleteCategory(id);

  return res;
};
