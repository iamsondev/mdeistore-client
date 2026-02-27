// app/(dashboardLayout)/@customer/dashboard/page.tsx
import { customerService } from "@/services/customer.service";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default async function CustomerDashboardPage() {
  try {
    const { data } = await customerService.getMyOrders();
    const orders = data?.data || [];
    const totalOrders = orders.length;

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
          <p className="text-muted-foreground">
            Here's your dashboard overview
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalOrders}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <Star className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Reviews</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link
              href="/dashboard/orders"
              className="text-blue-600 text-sm hover:underline"
            >
              View All →
            </Link>
          </div>
          {orders.slice(0, 3).map((order: any) => (
            <div
              key={order.id}
              className="border rounded-xl p-4 mb-3 flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium">
                  Order #{order.id.slice(0, 8)}...
                </p>
                <p className="text-xs text-muted-foreground">{order.address}</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">Error: {String(error)}</p>
      </div>
    );
  }
}
