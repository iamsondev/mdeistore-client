import { env } from "@/env";
import { cookies } from "next/headers";

// Sanitize API_URL to remove trailing slashes
const API_URL = env.API_URL?.replace(/\/$/, "");

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  return allCookies.map((c) => `${c.name}=${c.value}`).join("; ");
};

export const adminService = {
  getAllUsers: async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/users`, {
        headers: { Cookie: await getCookieHeader() },
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
      const res = await fetch(`${API_URL}/api/orders/admin/all`, {
        headers: { Cookie: await getCookieHeader() },
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
        headers: { Cookie: await getCookieHeader() },
        cache: "no-store",
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateUserStatus: async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: await getCookieHeader(),
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateUserRole: async (id: string, role: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: await getCookieHeader(),
        },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getStatistics: async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/statistics`, {
        headers: { Cookie: await getCookieHeader() },
        cache: "no-store",
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // ─── Seller Management ───────────────────────────────────────────────────
  getAllSellers: async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/users?role=SELLER`, {
        headers: { Cookie: await getCookieHeader() },
        cache: "no-store",
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateOrderStatus: async (id: string, status: string, deliveryAgentId?: string) => {
    try {
      const body: any = { status };
      if (deliveryAgentId) body.deliveryAgentId = deliveryAgentId;

      const res = await fetch(`${API_URL}/api/orders/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: await getCookieHeader(),
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: { message: data?.message || "Failed to update order status" } };
      }
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getDeliveryAgents: async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/delivery-agents`, {
        headers: { Cookie: await getCookieHeader() },
        cache: "no-store",
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // ─── Review Management (for Moderator via Admin API) ─────────────────────
  getAllReviews: async () => {
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        headers: { Cookie: await getCookieHeader() },
        cache: "no-store",
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  deleteReview: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/reviews/${id}`, {
        method: "DELETE",
        headers: { Cookie: await getCookieHeader() },
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // ─── Categories ───────────────────────────────────────────────────────────
  createCategory: async (name: string, description: string, image: string) => {
    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: await getCookieHeader(),
        },
        body: JSON.stringify({ name, description, image }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: { message: data?.message || "Failed" } };
      }
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateCategory: async (id: string, name: string, description: string) => {
    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: await getCookieHeader(),
        },
        body: JSON.stringify({ name, description }),
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  deleteCategory: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "DELETE",
        headers: { Cookie: await getCookieHeader() },
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getAssignedOrders: async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders/delivery/my-orders`, {
        headers: { Cookie: await getCookieHeader() },
        cache: "no-store",
        next: { tags: ["assigned-orders"] },
      });
      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: { message: data?.message || "Failed to fetch assigned orders" } };
      }
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getDeliveryHistory: async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders/delivery/history`, {
        headers: { Cookie: await getCookieHeader() },
        cache: "no-store",
        next: { tags: ["assigned-orders"] },
      });
      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: { message: data?.message || "Failed to fetch delivery history" } };
      }
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // ─── AI Service ──────────────────────────────────────────────────────────
  generateAIDescription: async (name: string, category: string) => {
    try {
      const res = await fetch(`${API_URL}/api/ai/generate-description`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Cookie: await getCookieHeader() 
        },
        body: JSON.stringify({ name, category }),
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "AI Service is currently unavailable" } };
    }
  },

  chatWithAI: async (message: string) => {
    try {
      const res = await fetch(`${API_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "MediBot is sleeping right now" } };
    }
  },
};
