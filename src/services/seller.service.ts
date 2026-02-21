import { env } from "@/env";
import { Medicine } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface serviceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface getMedicineParams {
  searchTerm?: string;
  page?: string;
  limit?: string;
  category?: string;
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
        next: options?.revalidate
          ? { revalidate: options.revalidate, tags: ["medicines"] }
          : { revalidate: 60, tags: ["medicines"] },
      };

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
      const token = cookieStore.get("accessToken")?.value;

      if (!token) {
        return {
          data: null,
          error: { message: "Unauthorized: Please login first", status: 401 },
        };
      }

      const res = await fetch(`${API_URL}/api/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
            details: data.errors || null,
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
};
