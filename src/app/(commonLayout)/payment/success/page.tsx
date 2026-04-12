"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyPayment } from "@/actions/payment.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Package, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (sessionId) {
      verifyPayment(sessionId)
        .then((res) => {
          if (res.data?.success) {
            setStatus("success");
          } else {
            setStatus("error");
          }
        })
        .catch(() => setStatus("error"));
    }
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <p className="text-xl font-bold text-muted-foreground animate-pulse">Verifying Payment...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="max-w-lg w-full rounded-[3rem] border-none shadow-2xl shadow-primary/10 overflow-hidden bg-white">
          <CardContent className="p-12 text-center space-y-8">
            <div className="relative inline-block">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="bg-green-100 p-6 rounded-full relative z-10"
              >
                <CheckCircle2 className="h-20 w-20 text-green-500" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter text-zinc-900">Payment Successful!</h1>
              <p className="text-zinc-500 font-medium">Your order has been placed and is being processed.</p>
            </div>

            <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100 space-y-4">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-zinc-400 uppercase tracking-widest">Order ID</span>
                <span className="text-zinc-900 font-mono truncate ml-4">#{orderId?.slice(-12)}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-zinc-400 uppercase tracking-widest">Status</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">PAID</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4">
              <Button
                onClick={() => router.push("/shop")}
                className="h-16 rounded-2xl text-lg font-black bg-zinc-900 hover:bg-zinc-800 text-white shadow-xl shadow-zinc-200 transition-all hover:scale-[1.02]"
              >
                Continue Shopping <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/orders")}
                className="h-16 rounded-2xl text-lg font-black border-2 border-zinc-100 hover:bg-zinc-50 text-zinc-600 transition-all hover:scale-[1.02]"
              >
                View My Orders <Package className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <p className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-300 pt-4">
              A confirmation email has been sent to you
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
