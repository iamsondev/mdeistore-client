"use server";

import { adminService } from "@/services/admin.service";

export const getAllCategories = async () => {
  const res = await adminService.getCategories();
  return res;
};
