import { Route } from "@/types";
import { Home, ShoppingBag, User } from "lucide-react";

export const customerRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "My Orders",
        url: "/dashboard/orders",
        icon: ShoppingBag,
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: User,
      },
    ],
  },
];
