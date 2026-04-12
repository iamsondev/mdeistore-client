import { Route } from "@/types";
import { 
  Home, 
  LayoutDashboard, 
  Star, 
  Flag, 
  ShieldAlert 
} from "lucide-react";

export const moderatorRoutes: Route[] = [
  {
    title: "Moderator Panel",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Dashboard",
        url: "/moderator-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Manage Reviews",
        url: "/moderator-dashboard/reviews",
        icon: Star,
      },
      {
        title: "User Reports",
        url: "/moderator-dashboard/reports",
        icon: Flag,
      },
      {
        title: "Fake Products",
        url: "/moderator-dashboard/products",
        icon: ShieldAlert,
      },
    ],
  },
];
