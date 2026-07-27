import { customerService } from "@/services/customer.service";
import Link from "next/link";
import { ShoppingBag, Star, Package, ArrowRight, Clock, CheckCircle2, MapPin } from "lucide-react";
import * as motion from "framer-motion/client";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

function getStatusStyle(status: string) {
  switch (status) {
    case "PLACED":     return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case "DELIVERED":  return "bg-primary/10 text-primary border-primary/20";
    case "SHIPPED":    return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "CANCELLED":  return "bg-red-500/10 text-red-600 border-red-500/20";
    default:           return "bg-muted text-muted-foreground border-border";
  }
}

export default async function CustomerDashboardPage() {
  try {
    const { data: sessionData } = await customerService.getsession();
    const { data } = await customerService.getMyOrders();
    const orders = data?.data || [];
    const userName = sessionData?.user?.name || "Customer";

    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o: any) => o.status === "PLACED").length;
    const delivered = orders.filter((o: any) => o.status === "DELIVERED").length;

    const stats = [
      { label: "Total Orders",    value: totalOrders,   icon: ShoppingBag,  border: "border-primary/20",  bg: "bg-primary/10",      color: "text-primary" },
      { label: "Pending",          value: pendingOrders, icon: Clock,        border: "border-amber-500/20",bg: "bg-amber-500/10",    color: "text-amber-600" },
      { label: "Delivered",        value: delivered,     icon: CheckCircle2, border: "border-emerald-500/20", bg: "bg-emerald-500/10", color: "text-emerald-600" },
      { label: "Reviews Given",    value: 0,             icon: Star,         border: "border-orange-500/20", bg: "bg-orange-500/10",  color: "text-orange-500" },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-4 md:p-8 space-y-10"
      >
        {/* ── Welcome Hero ── */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary/90 to-[#1B4D3E] p-8 md:p-12 text-white shadow-2xl shadow-primary/20">
          <div className="relative z-10 max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-5xl font-black tracking-tight"
            >
              Welcome back, {userName}! 👋
            </motion.h1>
            <p className="mt-4 text-primary-foreground/80 text-lg font-medium">
              Track your orders, manage your profile, and explore new medicines tailored for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/shop">
                <Button className="bg-white text-primary hover:bg-white/90 rounded-2xl h-12 px-8 font-bold shadow-lg transition-all hover:scale-105">
                  Browse Medicines
                </Button>
              </Link>
              <Link href="/dashboard/orders">
                <Button variant="ghost" className="text-white border border-white/20 hover:bg-white/10 rounded-2xl h-12 px-8 font-bold">
                  View All Orders
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-card rounded-[2rem] border ${item.border} p-6 shadow-xl shadow-black/5 hover:scale-[1.02] transition-all duration-300`}
            >
              <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center mb-4`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">{item.label}</p>
              <p className="text-3xl font-black mt-1 tracking-tighter">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Recent Orders ── */}
        <div className="bg-card rounded-[2.5rem] border border-border/50 shadow-2xl shadow-black/5 overflow-hidden">
          <div className="p-8 border-b border-border/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">Recent Orders</h2>
                <p className="text-sm text-muted-foreground font-medium">Your latest purchase history</p>
              </div>
            </div>
            <Link href="/dashboard/orders">
              <Button variant="ghost" className="font-bold hover:bg-primary/5 hover:text-primary rounded-xl">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="divide-y divide-border/40">
            {orders.length === 0 ? (
              <div className="p-16 text-center space-y-4">
                <div className="inline-flex p-5 rounded-full bg-muted text-muted-foreground">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <p className="text-lg font-bold text-muted-foreground">No orders yet. Start shopping!</p>
                <Link href="/shop">
                  <Button className="mt-2 rounded-xl">Browse Medicines</Button>
                </Link>
              </div>
            ) : (
              orders.slice(0, 5).map((order: any, idx: number) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className="flex items-center justify-between px-8 py-5 hover:bg-muted/20 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
                      #{order.id.slice(-8).toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="truncate max-w-[200px]">{order.address || "No address"}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    );
  } catch (error) {
    return (
      <div className="p-8 rounded-[2rem] bg-red-50 border border-red-100 text-red-600 font-bold">
        Error loading dashboard: {String(error)}
      </div>
    );
  }
}
