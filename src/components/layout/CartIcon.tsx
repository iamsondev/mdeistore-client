"use client";

import { ShoppingCart } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore/cartStore";

export function CartIcon() {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}
