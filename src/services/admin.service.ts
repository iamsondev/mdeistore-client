import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const adminService = {
  getAllUsers: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admin/users`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getAllOrders: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getCategories: async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        next: { revalidate: 60, tags: ["categories"] },
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateUserStatus: async (id: string, status: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getStatistics: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admin/statistics`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
