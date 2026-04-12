import { Route } from "@/types";
import { 
  Home, 
  LayoutDashboard, 
  Users, 
  Store, 
  ShoppingBag, 
  CreditCard, 
  Tags 
} from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Dashboard",
        url: "/admin-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "User Management",
        url: "/admin-dashboard/users",
        icon: Users,
      },
      {
        title: "Seller Approval",
        url: "/admin-dashboard/sellers",
        icon: Store,
      },
      {
        title: "All Orders",
        url: "/admin-dashboard/orders",
        icon: ShoppingBag,
      },
      {
        title: "Payments",
        url: "/admin-dashboard/payments",
        icon: CreditCard,
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
        icon: Tags,
      },
    ],
  },
];
