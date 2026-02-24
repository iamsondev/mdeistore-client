import { OrdersTable } from "@/components/modules/seller/order-req/OrdersTable";
import { sellerService } from "@/services/seller.service";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function OrderRequest() {
  const { data } = await sellerService.getSellerOrders();
  const orders = data?.data || [];

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Order Requests</h1>
      <OrdersTable orders={orders} />
    </div>
  );
}
