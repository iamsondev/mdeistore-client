import { customerService } from "@/services/customer.service";
import { NextRequest, NextResponse } from "next/server";

const ROLE_DASHBOARDS: Record<string, string> = {
  ADMIN: "/admin-dashboard",
  SELLER: "/seller-dashboard",
  CUSTOMER: "/dashboard",
  MODERATOR: "/moderator-dashboard",
  DELIVERY_AGENT: "/delivery-dashboard",
};

const PROTECTED_PREFIXES = [
  "/admin-dashboard",
  "/seller-dashboard",
  "/moderator-dashboard",
  "/delivery-dashboard",
  "/dashboard",
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ─── 1. Fetch session ─────────────────────────────────────────────────────
  let role: string | null = null;
  try {
    const { data } = await customerService.getsession();
    role = data?.user?.role ?? null;
  } catch {
    role = null;
  }

  // ─── 2. Not authenticated → redirect to login ──────────────────────────────
  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const correctDashboard = ROLE_DASHBOARDS[role] ?? "/";

  // ─── 3. Check if user is on the WRONG dashboard ───────────────────────────
  // e.g. MODERATOR hitting /admin-dashboard → redirect to /moderator-dashboard
  const wrongDashboard = PROTECTED_PREFIXES.find(
    (prefix) =>
      pathname.startsWith(prefix) && !pathname.startsWith(correctDashboard)
  );

  if (wrongDashboard) {
    return NextResponse.redirect(new URL(correctDashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/seller-dashboard",
    "/seller-dashboard/:path*",
    "/moderator-dashboard",
    "/moderator-dashboard/:path*",
    "/delivery-dashboard",
    "/delivery-dashboard/:path*",
  ],
};
