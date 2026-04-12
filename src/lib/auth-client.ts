import { createAuthClient } from "better-auth/react";

/**
 * Auth client — baseURL points to the Next.js CLIENT's own /api/auth proxy,
 * NOT directly to the backend server.
 *
 * This is intentional: by routing through the same domain, the OAuth "state"
 * cookie is set on medistore-client-bice.vercel.app, which the browser keeps
 * consistently across the entire OAuth flow (initiation → Google → callback).
 *
 * Pointing directly at the backend (different domain) causes the browser to
 * drop the cross-domain cookie → "state_mismatch" error.
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },
});
