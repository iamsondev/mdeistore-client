import { adminService } from "@/services/admin.service";
import { TrendingUp, DollarSign, ShoppingBag, Package } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  const { data: statsData } = await adminService.getStatistics();
  const { data: ordersData } = await adminService.getAllOrders();

  const stats = statsData?.data;
  const orders: any[] = ordersData?.data || [];

  const totalRevenue = stats?.totalRevenue || 0;
  const deliveredOrders = orders.filter((o) => o.status === "DELIVERED");
  const pendingRevenue = orders
    .filter((o) => o.status === "PENDING" || o.status === "PROCESSING")
    .reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);

  const recentPayments = deliveredOrders.slice(0, 10);

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-purple-500" />
          Payment Overview
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Monitor revenue and payment status across the platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-purple-100">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-sm font-semibold text-purple-600">Total Revenue</p>
          </div>
          <p className="text-3xl font-black text-purple-700">৳{Number(totalRevenue).toFixed(2)}</p>
          <p className="text-xs text-purple-500 mt-1">All time earnings</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-emerald-100">
              <ShoppingBag className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="text-sm font-semibold text-emerald-600">Completed Payments</p>
          </div>
          <p className="text-3xl font-black text-emerald-700">{deliveredOrders.length}</p>
          <p className="text-xs text-emerald-500 mt-1">Delivered orders</p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 dark:bg-amber-950 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-amber-100">
              <Package className="h-5 w-5 text-amber-600" />
            </div>
            <p className="text-sm font-semibold text-amber-600">Pending Revenue</p>
          </div>
          <p className="text-3xl font-black text-amber-700">৳{pendingRevenue.toFixed(2)}</p>
          <p className="text-xs text-amber-500 mt-1">In processing orders</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold mb-4">Recent Successful Payments</h2>
        <div className="space-y-3">
          {recentPayments.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">No completed payments yet.</p>
          ) : (
            recentPayments.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/40 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{order.user?.name || "N/A"}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      #{order.id?.slice(0, 8)}...
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-emerald-600">
                    ৳{Number(order.totalAmount || 0).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">{order.address?.slice(0, 20)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
