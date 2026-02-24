import { adminService } from "@/services/admin.service";

export const dynamic = "force-dynamic";

export default async function AllOrdersPage() {
  const { data } = await adminService.getAllOrders();
  const orders = data?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold">Order ID</th>
              <th className="text-left p-4 font-semibold">Customer</th>
              <th className="text-left p-4 font-semibold">Address</th>
              <th className="text-left p-4 font-semibold">Items</th>
              <th className="text-left p-4 font-semibold">Total</th>
              <th className="text-left p-4 font-semibold">Status</th>
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
                  <td className="p-4 font-mono text-xs">
                    {order.id.slice(0, 8)}...
                  </td>
                  <td className="p-4">{order.user?.name || "N/A"}</td>
                  <td className="p-4 text-xs">{order.address}</td>
                  <td className="p-4">{order.orderItems?.length} item(s)</td>
                  <td className="p-4 font-semibold">৳{total?.toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        order.status === "DELIVERED"
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : order.status === "PLACED"
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                            : order.status === "SHIPPED"
                              ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                              : order.status === "CANCELLED"
                                ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                                : "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
}
