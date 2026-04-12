import { adminService } from "@/services/admin.service";
import { AdminSellersTable } from "@/components/modules/admin/AdminSellersTable";
import { Store, CheckCircle, XCircle, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminSellersPage() {
  const { data } = await adminService.getAllSellers();
  const sellers: any[] = data?.data || [];

  const active = sellers.filter((s) => s.status === "ACTIVE").length;
  const blocked = sellers.filter((s) => s.status === "BLOCKED").length;
  const pending = sellers.filter((s) => s.status === "PENDING").length;

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Store className="h-6 w-6 text-amber-500" />
          Seller Management
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Approve or block sellers on the platform
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950 p-5">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-emerald-500" />
            <div>
              <p className="text-2xl font-black text-emerald-700">{active}</p>
              <p className="text-sm text-emerald-600">Active Sellers</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 dark:bg-amber-950 p-5">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-amber-500" />
            <div>
              <p className="text-2xl font-black text-amber-700">{pending}</p>
              <p className="text-sm text-amber-600">Pending</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-950 p-5">
          <div className="flex items-center gap-3">
            <XCircle className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-2xl font-black text-red-700">{blocked}</p>
              <p className="text-sm text-red-600">Blocked</p>
            </div>
          </div>
        </div>
      </div>

      <AdminSellersTable sellers={sellers} />
    </div>
  );
}
