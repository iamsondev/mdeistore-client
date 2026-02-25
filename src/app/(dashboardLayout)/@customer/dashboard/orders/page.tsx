import { customerService } from "@/services/customer.service";
import Link from "next/link";

export default async function MyOrdersPage() {
  const { data } = await customerService.getMyOrders();
  const orders = data?.data || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders found.</p>
      ) : (
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Order ID</th>
                <th className="text-left p-4 font-semibold">Address</th>
                <th className="text-left p-4 font-semibold">Payment</th>
                <th className="text-left p-4 font-semibold">Items</th>
                <th className="text-left p-4 font-semibold">Total</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => {
                const total = order.orderItems?.reduce(
                  (acc: number, item: any) => acc + item.price * item.quantity,
                  0,
                );
                return (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4 text-zinc-500 text-xs">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="p-4">{order.address}</td>
                    <td className="p-4">{order.paymentMethod}</td>
                    <td className="p-4">{order.orderItems?.length} item(s)</td>
                    <td className="p-4 font-semibold">৳{total?.toFixed(2)}</td>
                    <td className="p-4">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="text-blue-600 hover:underline text-xs font-medium"
                      >
                        View Details →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
