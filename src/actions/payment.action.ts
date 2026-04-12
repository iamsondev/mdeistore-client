"use server";

import { cookies } from "next/headers";
import { env } from "@/env";

export const createCheckoutSession = async (orderId: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/api/payment/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join("; "),
      },
      body: JSON.stringify({ orderId }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: { message: data.message || "Could not create checkout session" },
      };
    }

    return { data: data.data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong" },
    };
  }
};

export const verifyPayment = async (sessionId: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/api/payment/verify?sessionId=${sessionId}`, {
      method: "GET",
      headers: {
        Cookie: cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join("; "),
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: { message: data.message || "Payment verification failed" },
      };
    }

    return { data: data.data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong" },
    };
  }
};
export const createPaymentIntent = async (amount: number) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/api/payment/create-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join("; "),
      },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: { message: data.message || "Could not create payment intent" },
      };
    }

    return { data: data.data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong" },
    };
  }
};
