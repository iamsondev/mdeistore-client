"use server";

import { adminService } from "@/services/admin.service";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateUserStatus = async (id: string, status: string) => {
  const res = await adminService.updateUserStatus(id, status);
  revalidatePath("/admin-dashboard/users");
  return res;
};

export const updateUserRole = async (id: string, role: string) => {
  const res = await adminService.updateUserRole(id, role);
  revalidatePath("/admin-dashboard/users");
  return res;
};

export const updateAdminOrderStatus = async (id: string, status: string, deliveryAgentId?: string) => {
  const res = await adminService.updateOrderStatus(id, status, deliveryAgentId);
  revalidatePath("/admin-dashboard/orders");
  revalidatePath("/delivery-dashboard");
  revalidatePath("/delivery-dashboard/assigned-orders");
  return res;
};

export const updateDeliveryOrderStatus = async (id: string, status: string) => {
  const res = await adminService.updateOrderStatus(id, status);
  revalidatePath("/delivery-dashboard");
  revalidatePath("/delivery-dashboard");
  revalidatePath("/delivery-dashboard/assigned-orders");
  return res;
};

export const deleteReviewAction = async (id: string) => {
  const res = await adminService.deleteReview(id);
  revalidatePath("/moderator-dashboard/reviews");
  return res;
};

export const createCategory = async (
  name: string,
  description: string,
  image: string,
) => {
  const res = await adminService.createCategory(name, description, image);
  revalidatePath("/admin-dashboard/categories");
  return res;
};

export const updateCategory = async (
  id: string,
  name: string,
  description: string,
) => {
  const res = await adminService.updateCategory(id, name, description);
  revalidatePath("/admin-dashboard/categories");
  return res;
};

export const deleteCategory = async (id: string) => {
  const res = await adminService.deleteCategory(id);
  revalidatePath("/admin-dashboard/categories");
  return res;
};

export const generateAIDescriptionAction = async (name: string, category: string) => {
  return await adminService.generateAIDescription(name, category);
};

export const chatWithAIAction = async (message: string) => {
  return await adminService.chatWithAI(message);
};
