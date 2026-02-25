import { env } from "@/env";
import { Medicine } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface serviceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface getMedicineParams {
  search?: string;
  page?: string;
  limit?: string;
  categoryId?: string;
  sellerId?: string;
}

export const sellerService = {
  getSellerMedicine: async function (
    params?: getMedicineParams,
    options?: serviceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/api/medicines`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const config: RequestInit = {
        method: "GET",
      };

      if (options?.cache) {
        config.cache = options.cache;
      } else if (options?.revalidate) {
        config.next = { revalidate: options.revalidate, tags: ["medicines"] };
      } else {
        config.next = { revalidate: 60, tags: ["medicines"] };
      }

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: data.message || "Failed to fetch medicines",
            status: res.status,
          },
        };
      }

      return { data: data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: {
          message: err.message || "Network error occurred",
          status: 500,
        },
      };
    }
  },

  getMedicineById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/api/medicines/${id}`, {
        next: { revalidate: 60, tags: ["medicines"] },
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  createMedicine: async (medicineData: Partial<Medicine>) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: data.message || "Error: Medicine could not be created",
            status: res.status,
          },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Server connection failed", status: 500 },
      };
    }
  },
  deleteMedicine: async (id: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/medicines/${id}`, {
        method: "DELETE",
        headers: { Cookie: cookieStore.toString() },
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateMedicine: async (id: string, medicineData: Partial<Medicine>) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/medicines/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getSellerOrders: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/orders/seller`, {
        method: "GET",
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateOrderStatus: async (id: string, status: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/orders/${id}/status`, {
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
};
