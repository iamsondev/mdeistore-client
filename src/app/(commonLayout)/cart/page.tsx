"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore/cartStore";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    clearCart,
  } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center gap-4">
        <ShoppingCart className="h-16 w-16 text-zinc-300" />
        <h1 className="text-2xl font-bold text-zinc-700">Your cart is empty</h1>
        <p className="text-zinc-500">Add some medicines to get started</p>
        <Button asChild>
          <Link href="/shop">Browse Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.medicine.id}
              className="flex gap-4 p-4 border rounded-xl bg-white shadow-sm"
            >
              <img
                src={item.medicine.image || "https://placehold.co/100x100"}
                alt={item.medicine.name}
                className="w-24 h-24 object-cover rounded-lg border"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900">
                  {item.medicine.name}
                </h3>
                <p className="text-sm text-zinc-500">
                  {item.medicine.manufacturer}
                </p>
                <p className="text-lg font-bold text-zinc-900 mt-1">
                  ৳{Number(item.medicine.price).toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.medicine.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => decreaseQuantity(item.medicine.id)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => increaseQuantity(item.medicine.id)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            className="text-red-500 border-red-200 hover:bg-red-50"
            onClick={clearCart}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-xl p-6 bg-white shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div
                  key={item.medicine.id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-zinc-600">
                    {item.medicine.name} x{item.quantity}
                  </span>
                  <span>
                    ৳{(item.medicine.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>৳{totalPrice().toFixed(2)}</span>
            </div>
            <Button asChild className="w-full mt-6">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
