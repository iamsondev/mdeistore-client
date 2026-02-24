import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Dashboard",
        url: "/admin-dashboard",
      },
      {
        title: "Customer Management",
        url: "/admin-dashboard/users",
      },
      {
        title: "All Orders",
        url: "/admin-dashboard/orders",
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
      },
    ],
  },
];
