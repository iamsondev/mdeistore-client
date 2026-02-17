import { cookies } from "next/headers";
const AUTH_URL = process.env.AUTH_URL;
export const customerService = {
  getsession: async function () {
    try {
      const cookieStore = await cookies();
      console.log(cookieStore);
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();
      if (session === null) {
        return { data: null, error: { message: "session is missing" } };
      }
      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
