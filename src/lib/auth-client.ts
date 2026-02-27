import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://medistore-server-fawn.vercel.app",
});
