import { Route } from "@/types";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Management",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Dashboard",
        url: "/seller-dashboard",
      },
      {
        title: "Add New Medicine",
        url: "/seller-dashboard/add-medicine",
      },
      {
        title: "My Inventory",
        url: "/seller-dashboard/my-inventory",
      },

      {
        title: "Order Requests",
        url: "/seller-dashboard/orders-req",
      },
    ],
  },
];
