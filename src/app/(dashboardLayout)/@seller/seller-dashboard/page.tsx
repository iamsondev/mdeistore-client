import { sellerService } from "@/services/seller.service";
import { customerService } from "@/services/customer.service";
import { 
  Package, 
  ShoppingCart, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function SellerDashboardPage() {
  const { data: session } = await customerService.getsession();

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

  const stats = [
    { label: "Total Medicines", value: totalMedicines, icon: Package, color: "text-blue-600", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { label: "Total Orders", value: totalOrders, icon: ShoppingCart, color: "text-purple-600", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { label: "Pending Orders", value: pendingOrders, icon: Clock, color: "text-amber-600", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { label: "Delivered", value: deliveredOrders, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 md:p-10 space-y-10"
    >
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-8 md:p-12 text-white shadow-2xl shadow-primary/20">
        <div className="relative z-10 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-5xl font-black tracking-tight"
          >
            Welcome, {session?.user?.name || "Partner"}! 👋
          </motion.h1>
          <p className="mt-4 text-primary-foreground/80 text-lg font-medium">
            Your store is performing well today. Check your latest orders and manage your inventory here.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/seller-dashboard/add-medicine">
              <Button className="bg-white text-primary hover:bg-white/90 rounded-2xl h-12 px-8 font-bold shadow-lg transition-all hover:scale-105">
                Add New Product
              </Button>
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-card rounded-[2rem] border ${item.border} p-6 shadow-xl shadow-black/5 hover:scale-[1.02] transition-all`}
          >
            <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-4`}>
              <item.icon className={`h-7 w-7 ${item.color}`} />
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
            <p className="text-4xl font-black mt-2 tracking-tighter">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-card rounded-[2.5rem] border border-border/50 shadow-2xl shadow-black/5 overflow-hidden">
        <div className="p-8 border-b border-border/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
             <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600">
               <TrendingUp className="h-6 w-6" />
             </div>
             <div>
               <h2 className="text-2xl font-black tracking-tight">Recent Sales</h2>
               <p className="text-sm text-muted-foreground font-medium">Monitoring your latest transactions</p>
             </div>
          </div>
          <Link href="/seller-dashboard/orders-req">
            <Button variant="ghost" className="font-bold hover:bg-primary/5 hover:text-primary rounded-xl">
              View All Orders <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          {orders.length === 0 ? (
            <div className="p-20 text-center space-y-4">
               <div className="inline-flex p-5 rounded-full bg-muted text-muted-foreground">
                 <ShoppingCart className="h-8 w-8" />
               </div>
               <p className="text-lg font-bold text-muted-foreground">No orders recorded yet.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left py-6 px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Identity</th>
                  <th className="text-left py-6 px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Composition</th>
                  <th className="text-left py-6 px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Valuation</th>
                  <th className="text-right py-6 px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {orders.slice(0, 5).map((order: any, idx: number) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    key={order.id} 
                    className="hover:bg-muted/20 transition-colors group"
                  >
                    <td className="py-6 px-8">
                      <span className="font-mono text-xs font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
                        #{order.id.slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td className="py-6 px-8">
                      <div className="space-y-1">
                        {order.orderItems.map((item: any) => (
                          <div key={item.id} className="text-sm font-bold flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                             {item.medicine.name} <span className="text-muted-foreground text-xs font-normal">× {item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <span className="text-lg font-black tracking-tighter">
                        ৳{order.orderItems.reduce(
                          (sum: number, item: any) => sum + item.price * item.quantity,
                          0,
                        )}
                      </span>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                        order.status === "PLACED" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : 
                        order.status === "DELIVERED" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                        "bg-primary/10 text-primary border-primary/20"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </motion.div>
  );
}
