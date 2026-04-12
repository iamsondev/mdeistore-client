import { Route } from "@/types";
import { Home, LayoutDashboard, ClipboardList, CheckCircle } from "lucide-react";

export const deliveryAgentRoutes: Route[] = [
  {
    title: "Delivery Panel",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Dashboard",
        url: "/delivery-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Assigned Orders",
        url: "/delivery-dashboard/assigned-orders",
        icon: ClipboardList,
      },
      {
        title: "Delivered History",
        url: "/delivery-dashboard/history",
        icon: CheckCircle,
      },
    ],
  },
];
