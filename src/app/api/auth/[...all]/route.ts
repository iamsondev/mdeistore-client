import { toNextJsHandler } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

const BACKEND_AUTH_URL =
  process.env.AUTH_URL ?? `${process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`;

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:5000";

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  const targetPath = url.pathname.replace(/^\/api\/auth/, "");
  const targetUrl = `${BACKEND_AUTH_URL}${targetPath}${url.search}`;

  const headers = new Headers(req.headers);
  // Prevent ERR_CONTENT_DECODING_FAILED by removing compression headers
  headers.delete("accept-encoding");
  
  headers.set("x-forwarded-host", req.headers.get("host") ?? "");
  headers.set("x-forwarded-proto", url.protocol.replace(":", ""));
  headers.set("x-original-origin", FRONTEND_URL);

  const proxyResponse = await fetch(targetUrl, {
    method: req.method,
    headers,
    body:
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.arrayBuffer()
        : undefined,
    redirect: "manual",
  });

  const responseHeaders = new Headers(proxyResponse.headers);
  // Remove these to let Next.js/Vercel recalculate them for the proxied body
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");

  const location = responseHeaders.get("location");
  
  if (location) {
    console.log("Original Redirect Location:", location);
    
    // Hardcoded logic to force redirect back to frontend if it points to backend port
    let rewrittenLocation = location;
    
    const backendOrigin = new URL(BACKEND_AUTH_URL).origin;
    if (rewrittenLocation.startsWith(backendOrigin)) {
      rewrittenLocation = rewrittenLocation.replace(backendOrigin, FRONTEND_URL);
    }
    
    // Also catch cases where it specifically uses localhost:3000
    if (rewrittenLocation.includes("localhost:3000")) {
      rewrittenLocation = rewrittenLocation.replace("localhost:3000", "localhost:5000");
    }

    console.log("Rewritten Redirect Location:", rewrittenLocation);
    responseHeaders.set("location", rewrittenLocation);
  }

  // Read body as arrayBuffer to avoid decoding issues with streams in some environments
  const body = await proxyResponse.arrayBuffer();

  return new Response(body, {
    status: proxyResponse.status,
    statusText: proxyResponse.statusText,
    headers: responseHeaders,
  });
}

export const GET = handler;
export const POST = handler;
