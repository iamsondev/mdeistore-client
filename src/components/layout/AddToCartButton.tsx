"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, Check, LucideIcon, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Medicine } from "@/types";
import { authClient } from "@/lib/auth-client";
import { useCartStore } from "@/store/cartStore/cartStore";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  medicine: Medicine;
  isAvailable: boolean;
  compact?: boolean;
}

export function AddToCartButton({ medicine, isAvailable, compact = false }: Props) {
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session } = authClient.useSession();
  const role = (session?.user as any)?.role?.toLowerCase();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(medicine);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!mounted) {
    return (
      <div className={cn(
        "bg-zinc-100 animate-pulse rounded-[1.25rem]",
        compact ? "h-12 w-full" : "h-14 w-full"
      )} />
    );
  }

  // Hide button for sellers or admins
  if (role === "seller" || role === "admin") {
    return null;
  }

  // Handle Unauthenticated State
  if (!role) {
    return (
      <Button
        size={compact ? "default" : "lg"}
        className={cn(
          "w-full rounded-[1.25rem] font-black uppercase tracking-widest gap-2 shadow-lg transition-all active:scale-95",
          compact ? "h-12 text-[10px]" : "h-14 text-sm"
        )}
        asChild
      >
        <GuestButton compact={compact} />
      </Button>
    );
  }

  return (
    <Button
      size={compact ? "default" : "lg"}
      onClick={handleAddToCart}
      disabled={!isAvailable}
      className={cn(
        "w-full rounded-[1.25rem] font-black uppercase tracking-widest gap-2 shadow-xl transition-all duration-300 active:scale-95",
        compact ? "h-12 text-[10px]" : "h-14 text-sm",
        added 
          ? "bg-green-500 hover:bg-green-600 shadow-green-500/20" 
          : "bg-primary hover:bg-primary/90 shadow-primary/20",
        !isAvailable && "bg-zinc-200 text-zinc-400 border-none shadow-none cursor-not-allowed"
      )}
    >
      <AnimatePresence mode="wait">
        {added ? (
          <motion.div
            key="added"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Check className={cn(compact ? "h-3 w-3" : "h-5 w-5")} strokeWidth={3} />
            {compact ? "Added" : "Added to Cart"}
          </motion.div>
        ) : (
          <motion.div
            key="add"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <ShoppingCart className={cn(compact ? "h-3 w-3" : "h-5 w-5")} strokeWidth={compact ? 3 : 2} />
            {isAvailable ? (compact ? "Cart" : "Add to Cart") : (compact ? "No Stock" : "Unavailable")}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}

function GuestButton({ compact }: { compact: boolean }) {
  return (
    <a href="/login" className="flex items-center justify-center gap-2">
      <Lock className={cn(compact ? "h-3 w-3" : "h-5 w-5")} />
      {compact ? "Login" : "Login to purchase"}
    </a>
  );
}
