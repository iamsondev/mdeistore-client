import { adminService } from "@/services/admin.service";
import { AdminOrdersTable } from "@/components/modules/admin/AdminOrdersTable";
import { ShoppingBag, Clock, CheckCircle, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const [{ data: ordersData }, { data: agentsData }] = await Promise.all([
    adminService.getAllOrders(),
    adminService.getDeliveryAgents()
  ]);
  
  const orders: any[] = ordersData?.data || [];
  const agents: any[] = agentsData?.data || [];

  const pending = orders.filter((o) => o.status === "PENDING").length;
  const delivered = orders.filter((o) => o.status === "DELIVERED").length;
  const cancelled = orders.filter((o) => o.status === "CANCELLED").length;
  const totalRevenue = orders
    .filter((o) => o.status === "DELIVERED")
    .reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-indigo-500" />
          Order Monitor
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          View and manage all platform orders
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 dark:bg-blue-950 p-5">
          <p className="text-2xl font-black text-blue-700">{orders.length}</p>
          <p className="text-sm text-blue-600 mt-1 flex items-center gap-1">
            <ShoppingBag className="h-4 w-4" /> Total Orders
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 dark:bg-amber-950 p-5">
          <p className="text-2xl font-black text-amber-700">{pending}</p>
          <p className="text-sm text-amber-600 mt-1 flex items-center gap-1">
            <Clock className="h-4 w-4" /> Pending
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950 p-5">
          <p className="text-2xl font-black text-emerald-700">{delivered}</p>
          <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
            <CheckCircle className="h-4 w-4" /> Delivered
          </p>
        </div>
        <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-950 p-5">
          <p className="text-2xl font-black text-red-700">{cancelled}</p>
          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
            <XCircle className="h-4 w-4" /> Cancelled
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-purple-200 bg-purple-50 dark:bg-purple-950 p-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-purple-600 font-semibold">Total Revenue (Delivered)</p>
          <p className="text-3xl font-black text-purple-700">৳{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="text-5xl">💰</div>
      </div>

      <AdminOrdersTable orders={orders} agents={agents} />
    </div>
  );
}
