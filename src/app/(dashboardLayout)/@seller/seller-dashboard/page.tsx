import { sellerService } from "@/services/seller.service";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function SellerDashboardPage() {
  const cookieStore = await cookies();

  const sessionRes = await fetch(
    "https://medistore-server-fawn.vercel.app/api/auth/get-session",
    {
      headers: { Cookie: cookieStore.toString() },
    },
  );
  const session = await sessionRes.json();

  const { data: medicineData } = await sellerService.getSellerMedicine(
    { sellerId: session?.user?.id },
    { cache: "no-store" },
  );

  const { data: orderData } = await sellerService.getSellerOrders();

  const medicines = medicineData?.data || [];
  const orders = orderData?.data || [];

  const totalMedicines = medicines.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o: any) => o.status === "PLACED").length;
  const deliveredOrders = orders.filter(
    (o: any) => o.status === "DELIVERED",
  ).length;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-8">Seller Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Total Medicines</p>
          <p className="text-3xl font-bold mt-2">{totalMedicines}</p>
        </div>
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="text-3xl font-bold mt-2">{totalOrders}</p>
        </div>
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Pending Orders</p>
          <p className="text-3xl font-bold mt-2 text-yellow-500">
            {pendingOrders}
          </p>
        </div>
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Delivered Orders</p>
          <p className="text-3xl font-bold mt-2 text-green-500">
            {deliveredOrders}
          </p>
        </div>
      </div>

      <div className="bg-card rounded-lg border shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-muted-foreground">No orders yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Order ID</th>
                <th className="text-left py-2">Items</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order: any) => (
                <tr key={order.id} className="border-b">
                  <td className="py-2 font-mono">{order.id.slice(0, 8)}...</td>
                  <td className="py-2">
                    {order.orderItems.map((item: any) => (
                      <div key={item.id}>
                        {item.medicine.name} x{item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="py-2">
                    ৳
                    {order.orderItems.reduce(
                      (sum: number, item: any) =>
                        sum + item.price * item.quantity,
                      0,
                    )}
                  </td>
                  <td className="py-2">
                    <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
