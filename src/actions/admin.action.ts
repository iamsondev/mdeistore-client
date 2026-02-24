"use server";

import { adminService } from "@/services/admin.service";
import { revalidateTag } from "next/cache";

export const updateUserStatus = async (id: string, status: string) => {
  const res = await adminService.updateUserStatus(id, status);
  revalidateTag("users");
  return res;
};
