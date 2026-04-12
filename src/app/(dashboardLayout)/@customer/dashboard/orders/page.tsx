import { customerService } from "@/services/customer.service";
import Link from "next/link";
import { ShoppingBag, ChevronRight, Star, Clock, MapPin, CreditCard, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default async function MyOrdersPage() {
  const { data } = await customerService.getMyOrders();
  const orders = data?.data || [];

  const statusMap: Record<string, { label: string, color: string }> = {
    PLACED: { label: "Order Placed", color: "bg-blue-100 text-blue-700" },
    PROCESSING: { label: "Processing", color: "bg-amber-100 text-amber-700" },
    SHIPPED: { label: "Out for Delivery", color: "bg-indigo-100 text-indigo-700" },
    DELIVERED: { label: "Delivered", color: "bg-emerald-100 text-emerald-700" },
    CANCELED: { label: "Canceled", color: "bg-red-100 text-red-700" },
  };

  return (
    <div className="space-y-10 p-4 md:p-8">
      {/* ── Header Section ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-4">
             <ShoppingBag className="h-10 w-10 text-rose-500" />
             My Orders
          </h1>
          <p className="text-muted-foreground font-medium mt-2">
             Track your recent purchases and manage deliveries
          </p>
        </div>
        <div className="bg-rose-50 dark:bg-rose-950/20 px-6 py-3 rounded-2xl flex items-center gap-4 border border-rose-100 dark:border-rose-900/50">
           <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">Total Spent</p>
              <p className="text-xl font-black text-rose-600">৳{orders.reduce((acc: number, o: any) => acc + Number(o.totalAmount || 0), 0).toLocaleString()}</p>
           </div>
           <div className="h-10 w-[1px] bg-rose-200 dark:bg-rose-800" />
           <div className="text-3xl">💊</div>
        </div>
      </div>

      {/* ── Orders List ── */}
      <div className="grid grid-cols-1 gap-6">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-zinc-50 dark:bg-zinc-900/40 rounded-[3rem] border-2 border-dashed">
             <ShoppingBag className="h-16 w-16 text-muted-foreground opacity-20 mb-4" />
             <p className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">You haven&apos;t ordered anything yet</p>
          </div>
        ) : (
          orders.map((order: any) => {
             const status = statusMap[order.status] || { label: order.status, color: "bg-zinc-100 text-zinc-600" };
             
             return (
               <div key={order.id} className="group relative overflow-hidden rounded-[2.5rem] bg-card border border-border/60 p-6 md:p-8 hover:border-rose-500/40 hover:shadow-2xl hover:shadow-rose-500/5 transition-all duration-500">
                  <div className="flex flex-col lg:flex-row gap-8">
                     {/* Left: Info */}
                     <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-4">
                           <div className={cn("px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]", status.color)}>
                              {status.label}
                           </div>
                           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                              <Clock className="h-3.5 w-3.5" /> Ordered on {new Date(order.createdAt).toLocaleDateString()}
                           </span>
                        </div>
                        
                        <div className="space-y-4">
                           <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                              Order <span className="text-rose-500">#{order.id.slice(0, 8).toUpperCase()}</span>
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                                 <MapPin className="h-4 w-4 text-rose-400" /> {order.address}
                              </div>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium uppercase tracking-tight">
                                 <CreditCard className="h-4 w-4 text-rose-400" /> {order.paymentMethod}
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Middle: Items Preview */}
                     <div className="lg:w-48 flex -space-x-4 overflow-hidden items-center justify-center lg:justify-start">
                        {order.orderItems?.slice(0, 3).map((item: any, idx: number) => (
                           <div key={idx} className="h-14 w-14 rounded-2xl border-4 border-card bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center relative group-hover:scale-110 transition-transform shadow-lg shadow-black/5">
                              {item.medicine?.image ? (
                                 <img src={item.medicine.image} alt="med" className="h-full w-full object-cover rounded-xl" />
                              ) : (
                                 <Package className="h-6 w-6 text-zinc-400" />
                              )}
                           </div>
                        ))}
                        {order.orderItems?.length > 3 && (
                           <div className="h-14 w-14 rounded-2xl border-4 border-card bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-black z-10 shadow-lg shadow-black/5">
                              +{order.orderItems.length - 3}
                           </div>
                        )}
                     </div>

                     {/* Right: Actions */}
                     <div className="flex flex-col items-center lg:items-end justify-center gap-4 shrink-0">
                        <div className="text-right">
                           <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-60">Amount Paid</p>
                           <p className="text-3xl font-black text-zinc-900 dark:text-white leading-none">৳{Number(order.totalAmount || 0).toLocaleString()}</p>
                        </div>
                        
                        <div className="flex gap-2 w-full lg:w-auto mt-2">
                           <Link href={`/dashboard/orders/${order.id}`} className="flex-1 lg:flex-none h-12 px-6 flex items-center justify-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-black/10">
                              Details <ChevronRight className="h-4 w-4" />
                           </Link>
                           
                           {order.status === "DELIVERED" && (
                              <Link href={`/shop`} className="h-12 px-6 flex items-center justify-center gap-2 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all active:scale-95 shadow-xl shadow-rose-500/20">
                                 <Star className="h-4 w-4" /> Review
                              </Link>
                           )}
                        </div>
                     </div>
                  </div>
                  
                  {/* Decorative dot */}
                  <div className="absolute top-8 right-8 h-2 w-2 rounded-full bg-rose-100/30 dark:bg-rose-900/30 group-hover:bg-rose-500 transition-colors" />
               </div>
             );
          })
        )}
      </div>
    </div>
  );
}
