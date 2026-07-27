"use client";

import React, { useState, useEffect } from "react";
import { Wallet, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Medicine } from "@/types";
import { authClient } from "@/lib/auth-client";
import { useCartStore } from "@/store/cartStore/cartStore";
import { useRouter } from "next/navigation";

interface Props {
  medicine: Medicine;
  isAvailable: boolean;
}

export function InstantPurchaseButton({ medicine, isAvailable }: Props) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const role = (session?.user as any)?.role?.toLowerCase();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-12 w-full bg-zinc-100 animate-pulse rounded-xl" />;
  }

  // Hide button for sellers or admins
  if (role === "seller" || role === "admin") {
    return null;
  }

  const handleInstantPurchase = () => {
    if (!isAvailable) return;
    addToCart(medicine);
    if (!session?.user) {
      router.push("/login");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <Button
      onClick={handleInstantPurchase}
      disabled={!isAvailable}
      className="w-full h-12 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-all font-bold group shadow-lg active:scale-[0.99]"
    >
      {!session?.user ? (
        <>
          <Lock className="mr-2 h-4 w-4" />
          Login & Instant Checkout
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          Instant Purchase (Checkout)
        </>
      )}
    </Button>
  );
}
