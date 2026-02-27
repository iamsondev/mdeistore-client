"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createOrder } from "@/actions/order.action";

const checkoutSchema = z.object({
  address: z.string().min(10, "Address must be at least 10 characters"),
});

export function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();

  const form = useForm({
    defaultValues: { address: "" },
    validators: { onSubmit: checkoutSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Placing order...");
      try {
        const orderData = {
          address: value.address,
          paymentMethod: "Cash On Delivery",
          items: items.map((item) => ({
            medicineId: item.medicine.id,
            quantity: item.quantity,
            price: item.medicine.price,
          })),
        };
        const res = await createOrder(orderData);
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }
        toast.success("Order placed successfully!", { id: toastId });
        clearCart();
        router.push("/orders");
      } catch (err) {
        toast.error("Something went wrong!", { id: toastId });
      }
    },
  });

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="checkout-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="address">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Full Address</FieldLabel>
                      <Input
                        type="text"
                        placeholder="House, Road, Area, City"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <Field>
                <FieldLabel>Payment Method</FieldLabel>
                <Input value="Cash On Delivery" disabled />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.medicine.id}
                className="flex justify-between text-sm"
              >
                <span className="text-zinc-600">
                  {item.medicine.name} x{item.quantity}
                </span>
                <span>৳{(item.medicine.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>৳{totalPrice().toFixed(2)}</span>
            </div>
          </div>
          <Button
            form="checkout-form"
            type="submit"
            className="w-full mt-6"
            size="lg"
          >
            Place Order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
