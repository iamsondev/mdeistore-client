import { adminService } from "@/services/admin.service";
import { Truck, MapPin, CheckCircle, Clock, Package, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { updateDeliveryOrderStatus } from "@/actions/admin.action";
import { DeliverOrderButton } from "@/components/modules/deliveryAgent/DeliverOrderButton";

export const dynamic = "force-dynamic";

const statusStyles: Record<string, string> = {
  PLACED: "bg-amber-100 text-amber-700",
  PENDING: "bg-amber-100 text-amber-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
};

export default async function AssignedOrdersPage() {
  const { data: assignmentsRes } = await adminService.getAssignedOrders();
  const allAssignments: any[] = assignmentsRes?.data?.data || assignmentsRes?.data || [];
  const assignedOrders = allAssignments.filter(order => order.status?.toUpperCase() !== "DELIVERED");

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
            <Truck className="h-8 w-8 text-indigo-500" />
            Delivery Queue
          </h1>
          <p className="text-muted-foreground font-medium mt-1">
            Manage and track your active assignments ({assignedOrders.length})
          </p>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-2xl flex items-center gap-3">
           <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Connected to Fleet</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {assignedOrders.map((order) => (
          <div
            key={order.id}
            className="group rounded-[2.5rem] border border-border/60 bg-card p-6 space-y-5 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
               <div className="flex items-start justify-between gap-4">
                 <div className="flex items-center gap-3">
                   <div className={`p-3 rounded-2xl ${statusStyles[order.status] || "bg-muted"}`}>
                     <Package className="h-6 w-6" />
                   </div>
                   <div>
                     <p className="font-black text-sm text-zinc-900 dark:text-white uppercase tracking-tight line-clamp-1">{order.customer?.name || "Customer"}</p>
                     <p className="text-[10px] font-bold text-muted-foreground/50 font-mono">#{order.id.slice(0, 12)}</p>
                   </div>
                 </div>
                 <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border-none ${statusStyles[order.status] || "bg-muted"}`}>
                   {order.status}
                 </span>
               </div>

               <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm font-medium text-muted-foreground bg-muted/30 p-3 rounded-2xl">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-indigo-500" />
                    <p className="line-clamp-2 italic text-xs leading-relaxed">{order.address}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-1">
                     <Clock className="h-3.5 w-3.5" /> Ordered {new Date(order.createdAt).toLocaleDateString()}
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-border/40 mt-auto">
              <div>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Total Amount</p>
                 <span className="font-black text-xl text-emerald-600">৳{Number(order.totalAmount).toLocaleString()}</span>
              </div>
              
              <div className="flex gap-2">
                   <DeliverOrderButton orderId={order.id} currentStatus={order.status} />
              </div>
            </div>
            
            {/* Design highlight */}
            <div className="absolute top-0 right-0 h-1 w-24 bg-indigo-500/20 rounded-bl-full" />
          </div>
        ))}
        {assignedOrders.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-32 space-y-4 text-muted-foreground bg-zinc-50 dark:bg-zinc-900/40 rounded-[3rem] border-2 border-dashed border-border/60">
             <div className="bg-white dark:bg-zinc-800 p-6 rounded-full shadow-inner">
                <ShoppingBag className="h-10 w-10 opacity-20" />
             </div>
             <div className="text-center">
                <p className="text-[12px] font-black uppercase tracking-[0.3em]">No Active Assignments</p>
                <p className="text-[10px] font-medium opacity-60 mt-1">Wait for Admin to assign new deliveries</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

