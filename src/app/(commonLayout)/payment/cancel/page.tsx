"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle, RefreshCcw, ShoppingBag, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="max-w-lg w-full rounded-[3rem] border-none shadow-2xl shadow-red-500/10 overflow-hidden bg-white">
          <CardContent className="p-12 text-center space-y-8">
            <div className="relative inline-block">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="bg-red-100 p-6 rounded-full relative z-10"
              >
                <XCircle className="h-20 w-20 text-red-500" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter text-zinc-900">Payment Cancelled</h1>
              <p className="text-zinc-500 font-medium">No worries! Your payment was not processed and no funds were deducted.</p>
            </div>

            <div className="flex items-center gap-3 bg-red-50 p-4 rounded-2xl border border-red-100 text-left">
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
              <p className="text-xs font-bold text-red-600 leading-tight">
                If this was a mistake, you can try again from your cart or continue shopping.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4">
              <Button
                onClick={() => router.push("/cart")}
                className="h-16 rounded-2xl text-lg font-black bg-red-500 hover:bg-red-600 text-white shadow-xl shadow-red-200 transition-all hover:scale-[1.02]"
              >
                Go Back to Cart <RefreshCcw className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/shop")}
                className="h-16 rounded-2xl text-lg font-black border-2 border-zinc-100 hover:bg-zinc-50 text-zinc-600 transition-all hover:scale-[1.02]"
              >
                Continue Shopping <ShoppingBag className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
