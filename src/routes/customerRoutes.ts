import { Route } from "@/types";

export const customerRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "🏠 Home",
        url: "/",
      },
      {
        title: "📦 My Orders",
        url: "/dashboard/orders",
      },
      {
        title: "👤 Profile",
        url: "/dashboard/profile",
      },
    ],
  },
];
