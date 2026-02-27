import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
};

export const customerService = {
  getsession: async function () {
    try {
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: { Cookie: await getCookieHeader() },
        cache: "no-store",
      });
      const session = await res.json();
      if (session === null) {
        return { data: null, error: { message: "session is missing" } };
      }
      return { data: session, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getCategories: async function () {
    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        next: { revalidate: 60, tags: ["categories"] },
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getMyOrders: async function () {
    try {
      const res = await fetch(`${env.API_URL}/api/orders`, {
        headers: { Cookie: await getCookieHeader() },
        cache: "no-store",
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getOrderById: async function (id: string) {
    try {
      const res = await fetch(`${env.API_URL}/api/orders/${id}`, {
        headers: { Cookie: await getCookieHeader() },
        cache: "no-store",
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  checkOrderedMedicine: async (medicineId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: { Cookie: await getCookieHeader() },
        cache: "no-store",
      });
      const data = await res.json();
      const orders = data?.data || [];
      const hasOrdered = orders.some((order: any) =>
        order.orderItems?.some((item: any) => item.medicineId === medicineId),
      );
      return { hasOrdered };
    } catch (err) {
      return { hasOrdered: false };
    }
  },

  getMedicineReviews: async (medicineId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/reviews/${medicineId}`, {
        cache: "no-store",
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
