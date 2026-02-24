"use server";

import { cookies } from "next/headers";
import { env } from "@/env";
import { sellerService } from "@/services/seller.service";

export const createOrder = async (orderData: {
  address: string;
  paymentMethod: string;
  orderItems: {
    medicineId: string;
    quantity: number;
    price: number;
  }[];
}) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: { message: data.message || "Order could not be placed" },
      };
    }

    return { data: data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong" },
    };
  }
};

export const updateOrderStatus = async (id: string, status: string) => {
  const res = await sellerService.updateOrderStatus(id, status);
  return res;
};
