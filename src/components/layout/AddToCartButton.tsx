"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Medicine } from "@/types";

interface Props {
  medicine: Medicine;
  isAvailable: boolean;
  userRole?: string;
}

export function AddToCartButton({ medicine, isAvailable, userRole }: Props) {
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = () => {
    console.log("Added to cart:", medicine);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!mounted) {
    return <div className="w-full h-14 rounded-xl bg-zinc-100 animate-pulse" />;
  }

  if (userRole === "seller" || userRole === "admin") {
    return null;
  }

  // Login নেই
  if (!userRole) {
    return (
      <Button
        size="lg"
        className="w-full h-14 text-lg font-bold rounded-xl bg-zinc-900 hover:bg-zinc-800 gap-3 shadow-lg"
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
