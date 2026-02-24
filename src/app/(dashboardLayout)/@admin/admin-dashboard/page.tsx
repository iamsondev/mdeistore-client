import { adminService } from "@/services/admin.service";
import { Users, ShoppingBag, Package, Tag, TrendingUp } from "lucide-react";
import { customerService } from "@/services/customer.service";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { data: sessionData } = await customerService.getsession();
  const { data: statsData } = await adminService.getStatistics();

  const userName = sessionData?.user?.name;
  const stats = statsData?.data;

  const totalUsers = stats?.totalUsers || 0;
  const totalSellers = stats?.totalSellers || 0;
  const totalOrders = stats?.totalOrders || 0;
  const totalMedicines = stats?.totalMedicines || 0;
  const totalRevenue = stats?.totalRevenue || 0;

  return (
    <div className="space-y-8 p-2">
      <div className="rounded-2xl bg-rose-600 dark:bg-rose-800 p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome, {userName}! 👑</h1>
        <p className="text-rose-200 mt-1">Manage your platform</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-extrabold text-blue-700 dark:text-blue-300">
                {totalUsers}
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
                Customers
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 rounded-xl p-3">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-extrabold text-amber-700 dark:text-amber-300">
                {totalOrders}
              </p>
              <p className="text-amber-600 dark:text-amber-400 text-sm mt-1">
                Total Orders
              </p>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900 rounded-xl p-3">
              <ShoppingBag className="h-6 w-6 text-amber-600 dark:text-amber-300" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
                {totalMedicines}
              </p>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm mt-1">
                Medicines
              </p>
            </div>
            <div className="bg-emerald-100 dark:bg-emerald-900 rounded-xl p-3">
              <Package className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-extrabold text-purple-700 dark:text-purple-300">
                ৳{totalRevenue.toFixed(2)}
              </p>
              <p className="text-purple-600 dark:text-purple-400 text-sm mt-1">
                Total Revenue
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 rounded-xl p-3">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
