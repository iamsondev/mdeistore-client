import { adminService } from "@/services/admin.service";
import { Truck, MapPin, CheckCircle, Clock, Package, History, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

const statusStyles: Record<string, string> = {
  DELIVERED: "bg-emerald-100 text-emerald-700",
};

export default async function DeliveryHistoryPage() {
  const { data: historyRes } = await adminService.getDeliveryHistory();
  const historyOrders: any[] = historyRes?.data?.data || historyRes?.data || [];

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
            <History className="h-8 w-8 text-emerald-500" />
            Delivery History
          </h1>
          <p className="text-muted-foreground font-medium mt-1">
            Review your successful deliveries and completed tasks ({historyOrders.length})
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2 rounded-2xl flex items-center gap-3 border border-emerald-100 dark:border-emerald-900/30">
           <CheckCircle className="h-4 w-4 text-emerald-500" />
           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Mission Accomplished</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {historyOrders.map((order) => (
          <div
            key={order.id}
            className="group rounded-[2.5rem] border border-border/60 bg-card p-6 space-y-5 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
               <div className="flex items-start justify-between gap-4">
                 <div className="flex items-center gap-3">
                   <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600">
                     <Package className="h-6 w-6" />
                   </div>
                   <div>
                     <p className="font-black text-sm text-zinc-900 dark:text-white uppercase tracking-tight line-clamp-1">{order.customer?.name || "Customer"}</p>
                     <p className="text-[10px] font-bold text-muted-foreground/50 font-mono">#{order.id.slice(0, 12)}</p>
                   </div>
                 </div>
                 <div className="flex flex-col items-end gap-1">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border-none bg-emerald-100 text-emerald-700`}>
                      DELIVERED
                    </span>
                 </div>
               </div>

               <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm font-medium text-muted-foreground bg-muted/30 p-3 rounded-2xl">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-emerald-500" />
                    <p className="line-clamp-2 italic text-xs leading-relaxed">{order.address}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2 pl-1">
                     <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        <Clock className="h-3.5 w-3.5" /> Order: {new Date(order.createdAt).toLocaleDateString()}
                     </div>
                     <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 w-fit px-2 py-0.5 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                        <CheckCircle className="h-3.5 w-3.5" /> Delivered: {new Date(order.updatedAt).toLocaleDateString()}
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-border/40 mt-auto">
              <div>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Success Earned</p>
                 <span className="font-black text-xl text-emerald-600">৳{Number(order.totalAmount).toLocaleString()}</span>
              </div>
              
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <CheckCircle className="h-5 w-5" />
              </div>
            </div>
            
            {/* Design highlight */}
            <div className="absolute top-0 right-0 h-1 w-24 bg-emerald-500/20 rounded-bl-full" />
          </div>
        ))}
        {historyOrders.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-32 space-y-4 text-muted-foreground bg-zinc-50 dark:bg-zinc-900/40 rounded-[3rem] border-2 border-dashed border-border/60">
             <div className="bg-white dark:bg-zinc-800 p-6 rounded-full shadow-inner">
                <ShoppingBag className="h-10 w-10 opacity-20" />
             </div>
             <div className="text-center">
                <p className="text-[12px] font-black uppercase tracking-[0.3em]">No Histories Found</p>
                <p className="text-[10px] font-medium opacity-60 mt-1">Complete your first delivery to see it here</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
