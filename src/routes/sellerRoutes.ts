import { Route } from "@/types";
import { 
  Home, 
  LayoutDashboard, 
  PlusSquare, 
  Package, 
  ShoppingCart 
} from "lucide-react";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Management",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Dashboard",
        url: "/seller-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Add New Medicine",
        url: "/seller-dashboard/add-medicine",
        icon: PlusSquare,
      },
      {
        title: "My Inventory",
        url: "/seller-dashboard/my-inventory",
        icon: Package,
      },
      {
        title: "Order Requests",
        url: "/seller-dashboard/orders-req",
        icon: ShoppingCart,
      },
    ],
  },
];
