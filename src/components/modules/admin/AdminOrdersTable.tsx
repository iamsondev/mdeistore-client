"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateAdminOrderStatus } from "@/actions/admin.action";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

const statusColors: Record<string, string> = {
  PLACED: "bg-amber-100 text-amber-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELED: "bg-red-100 text-red-700",
};

const ORDER_STATUSES = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"];

export function AdminOrdersTable({ orders, agents = [] }: { orders: any[]; agents?: any[] }) {
  const router = useRouter();

  const handleUpdateOrder = async (id: string, status: string, deliveryAgentId?: string) => {
    const toastId = toast.loading("Updating order details...");
    const res = await updateAdminOrderStatus(id, status, deliveryAgentId);
    if (res?.error) {
      toast.error(res.error.message || "Failed to update order", { id: toastId });
      return;
    }
    toast.success("Order updated successfully!", { id: toastId });
    router.refresh();
  };

  return (
    <div className="border border-border/50 rounded-[2.5rem] overflow-hidden bg-card/30 backdrop-blur-sm shadow-xl shadow-black/5">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 border-b border-border/40 hover:bg-muted/30">
            <TableHead className="py-6 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Order</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Customer Info</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Financials</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Logistics State</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Assign Agent</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-right pr-8 text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, i) => {
             const assignedAgent = agents.find(a => a.id === order.deliveryAgentId);
             
             return (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group border-b border-border/40 last:border-0 hover:bg-muted/20 transition-all"
              >
                <TableCell className="py-5 px-6">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] font-black text-primary/60">#{order.id?.slice(0, 8)}</span>
                    <span className="text-[10px] font-bold text-muted-foreground/60 mt-1 uppercase tracking-tighter">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-black text-sm text-zinc-900 tracking-tight">
                      {order.customer?.name || "Anonymous User"}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground max-w-[140px] truncate">
                      {order.address}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                   <div className="flex flex-col">
                      <span className="text-sm font-black text-emerald-600">৳{Number(order.totalAmount || 0).toLocaleString()}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                         {order.paymentStatus || "PENDING"}
                      </span>
                   </div>
                </TableCell>

                <TableCell>
                  <Badge variant="secondary" className={cn(
                    "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border-none",
                    statusColors[order.status] || "bg-zinc-100 text-zinc-600"
                  )}>
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1">
                    <select
                      className="text-[10px] font-black uppercase border-2 border-border/50 rounded-xl px-2 py-1.5 bg-background focus:ring-2 focus:ring-primary/20 transition-all w-full max-w-[140px]"
                      value={order.deliveryAgentId || ""}
                      onChange={(e) => handleUpdateOrder(order.id, order.status, e.target.value)}
                    >
                      <option value="">Unassigned</option>
                      {agents.map((agent: any) => (
                        <option key={agent.id} value={agent.id}>
                          {agent.name || agent.email}
                        </option>
                      ))}
                    </select>
                    {assignedAgent && (
                      <span className="text-[9px] font-bold text-indigo-500 italic pl-1">
                         Currently with Agent
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-right pr-8">
                  <select
                    className="text-[10px] font-black uppercase border-2 border-border/50 rounded-xl px-3 py-1.5 bg-zinc-900 text-white hover:bg-zinc-800 transition-all cursor-pointer"
                    value={order.status}
                    onChange={(e) => handleUpdateOrder(order.id, e.target.value, order.deliveryAgentId)}
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </TableCell>
              </motion.tr>
             )
          })}
        </TableBody>
      </Table>
      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
           <div className="bg-muted p-4 rounded-full mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground/40" />
           </div>
           <p className="text-sm font-bold uppercase tracking-[0.2em] animate-pulse">Warehouse Empty</p>
        </div>
      )}
    </div>
  );
}
