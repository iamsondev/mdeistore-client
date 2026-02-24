import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const customerService = {
  getsession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: { Cookie: cookieStore.toString() },
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
      const res = await fetch(`${API_URL}/categories`, {
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
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/orders`, {
        headers: { Cookie: cookieStore.toString() },
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
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/orders/${id}`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
