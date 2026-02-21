import { Route } from "@/types";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Management",
    items: [
      {
        title: "Dashboard",
        url: "/seller-dashboard",
      },
      {
        title: "My Inventory",
        url: "/seller-dashboard/my-inventory",
      },
      {
        title: "Add New Medicine",
        url: "/seller-dashboard/medicines/add-medicine",
      },
      {
        title: "Order Requests",
        url: "/seller/orders",
      },
    ],
  },
];
