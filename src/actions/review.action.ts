"use server";

import { cookies } from "next/headers";
import { env } from "@/env";
import { revalidateTag } from "next/cache";

export const createReview = async (data: {
  medicineId: string;
  rating: number;
  comment: string;
}) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidateTag("reviews");
    return { data: result, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went wrong" } };
  }
};
