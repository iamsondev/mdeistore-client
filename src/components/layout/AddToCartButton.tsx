"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Medicine } from "@/types";
import { authClient } from "@/lib/auth-client";
import { useCartStore } from "@/store/cartStore/cartStore";

interface Props {
  medicine: Medicine;
  isAvailable: boolean;
  compact?: boolean;
}

export function AddToCartButton({ medicine, isAvailable }: Props) {
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const role = (session?.user as any)?.role?.toLowerCase();

  useEffect(() => {
    setMounted(true);
  }, []);
  const addToCart = useCartStore((state) => state.addToCart);
  const handleAddToCart = () => {
    console.log("Added to cart:", medicine);
    addToCart(medicine);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!mounted) {
    return <div className="w-full h-14 rounded-xl bg-zinc-100 animate-pulse" />;
  }

  if (role === "seller" || role === "admin") {
    return null;
  }

  if (!role) {
    return (
      <Button
        size="lg"
        variant="cart"
        className="w-full h-14 text-lg font-bold rounded-xl gap-3 shadow-lg"
        asChild
      >
        <a href="/login">Login to Purchase</a>
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      className={`w-full h-14 text-lg font-bold rounded-xl gap-3 shadow-lg transition-all ${
        added
          ? "bg-emerald-600 hover:bg-emerald-700"
          : "bg-zinc-900 hover:bg-zinc-800"
      }`}
      disabled={!isAvailable}
      onClick={handleAddToCart}
    >
      {added ? (
        <>
          <Check className="h-5 w-5" />
          Added to Cart!
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          {isAvailable ? "Add to Cart" : "Currently Unavailable"}
        </>
      )}
    </Button>
  );
}
