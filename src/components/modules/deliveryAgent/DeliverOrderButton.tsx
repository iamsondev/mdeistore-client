"use client";

import { updateDeliveryOrderStatus } from "@/actions/admin.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface DeliverOrderButtonProps {
  orderId: string;
  currentStatus?: string;
}

export function DeliverOrderButton({ orderId, currentStatus }: DeliverOrderButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleDeliver = async () => {
    setIsPending(true);
    const toastId = toast.loading("Finalizing delivery...");
    
    try {
      if (currentStatus?.toUpperCase() === "PENDING" || currentStatus?.toUpperCase() === "PLACED") {
        await updateDeliveryOrderStatus(orderId, "SHIPPED");
      }

      const res = await updateDeliveryOrderStatus(orderId, "DELIVERED");
      if (res?.error) {
        toast.error(res.error.message || "Failed to update order", { id: toastId });
      } else {
        toast.success("Order Delivered Successfully! 📦", { id: toastId });
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={handleDeliver}
      disabled={isPending}
      className="h-12 px-6 text-[10px] font-black uppercase tracking-widest rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-zinc-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {isPending && <Loader2 className="h-3 w-3 animate-spin" />}
      {isPending ? "Processing..." : "Deliver"}
    </button>
  );
}
