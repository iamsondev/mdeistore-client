"use client";

import { useEffect, useState } from "react";
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
import { createCheckoutSession } from "@/actions/payment.action";
import { CreditCard, Truck, Wallet, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const checkoutSchema = z.object({
  address: z.string().min(10, "Address must be at least 10 characters"),
});

export function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "CARD">("COD");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: { address: "" },
    validators: { onSubmit: checkoutSchema },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const toastId = toast.loading(paymentMethod === "COD" ? "Placing order..." : "Creating checkout session...");
      
      try {
        // 1. Prepare Order Data
        const orderData = {
          address: value.address,
          paymentMethod: paymentMethod === "COD" ? "Cash On Delivery" : "ONLINE",
          orderItems: items.map((item) => ({
            medicineId: item.medicine.id,
            quantity: item.quantity,
            price: item.medicine.price,
          })),
        };

        // 2. Create Order in Backend
        const orderRes = await createOrder(orderData);
        if (orderRes.error) {
          toast.error(orderRes.error.message, { id: toastId });
          setIsLoading(false);
          return;
        }

        const orderId = orderRes.data?.id || orderRes.data?.data?.id;

        // 3. Handle Payment Flow
        if (paymentMethod === "COD") {
          toast.success("Order placed successfully!", { id: toastId });
          clearCart();
          router.push("/orders");
        } else {
          // Stripe Redirect Flow
          const sessionRes = await createCheckoutSession(orderId);
          if (sessionRes.error) {
            toast.error(sessionRes.error.message, { id: toastId });
            setIsLoading(false);
            return;
          }

          if (sessionRes.data) {
            toast.success("Redirecting to secure payment...", { id: toastId });
            window.location.href = sessionRes.data; // Redirect to Stripe
          }
        }
      } catch (err) {
        toast.error("Something went wrong!", { id: toastId });
        setIsLoading(false);
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

  const total = totalPrice();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-8">
        <Card className="rounded-[2.5rem] border-border/50 shadow-2xl shadow-black/5 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-6">
            <CardTitle className="text-xl font-black tracking-tight flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" /> Delivery Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
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
                        <FieldLabel className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Full Address</FieldLabel>
                        <Input
                          type="text"
                          className="h-14 rounded-2xl bg-muted/20 border-primary/10 focus:border-primary/40 transition-all font-medium"
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
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5rem] border-border/50 shadow-2xl shadow-black/5 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-6">
            <CardTitle className="text-xl font-black tracking-tight flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" /> Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-10">
             <div className="grid grid-cols-2 gap-6">
               <button
                 type="button"
                 onClick={() => setPaymentMethod("COD")}
                 className={cn(
                   "group p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 font-black text-sm uppercase tracking-widest",
                   paymentMethod === "COD" 
                    ? "border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10" 
                    : "border-border hover:border-primary/30 text-muted-foreground"
                 )}
               >
                 <div className={cn("p-4 rounded-2xl transition-all", paymentMethod === "COD" ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/10")}>
                   <Truck className="h-6 w-6" />
                 </div>
                 Cash on Delivery
               </button>
               <button
                 type="button"
                 onClick={() => setPaymentMethod("CARD")}
                 className={cn(
                   "group p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 font-black text-sm uppercase tracking-widest",
                   paymentMethod === "CARD" 
                    ? "border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10" 
                    : "border-border hover:border-primary/30 text-muted-foreground"
                 )}
               >
                 <div className={cn("p-4 rounded-2xl transition-all", paymentMethod === "CARD" ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/10")}>
                   <CreditCard className="h-6 w-6" />
                 </div>
                 Card Payment
               </button>
             </div>
             
             <div className="mt-8 p-6 rounded-2xl bg-muted/30 border border-border/50">
               <p className="text-xs font-bold text-muted-foreground leading-relaxed uppercase tracking-tight">
                 {paymentMethod === "COD" 
                   ? "You will pay the total amount at the time of delivery to your doorstep."
                   : "You will be redirected to a secure Stripe portal to complete your transaction."}
               </p>
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:sticky lg:top-24 h-fit">
        <Card className="rounded-[3rem] border-primary/20 shadow-2xl shadow-primary/5 overflow-hidden border-2 bg-card">
          <CardHeader className="bg-primary/5 border-b border-primary/10 pb-8 pt-10">
            <CardTitle className="text-3xl font-black tracking-tight text-center">Checkout Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-10 space-y-6">
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.medicine.id} className="flex justify-between items-center group">
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground text-lg tracking-tight">{item.medicine.name}</span>
                    <span className="text-xs font-bold text-muted-foreground uppercase">Quantity: {item.quantity}</span>
                  </div>
                  <span className="font-black tabular-nums text-lg">৳{(item.medicine.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t-2 border-dashed border-primary/20 my-8 shadow-inner" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">Subtotal</span>
                <span className="text-xl font-bold">৳{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-8 rounded-[2rem] bg-primary text-white shadow-xl shadow-primary/30">
                <span className="text-xl font-black uppercase tracking-widest">Total Pay</span>
                <span className="text-3xl font-black tracking-tighter">৳{total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              form="checkout-form"
              type="submit"
              disabled={isLoading}
              className="w-full mt-8 h-20 rounded-[2rem] text-xl font-black shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] group"
            >
              {isLoading ? "Processing..." : paymentMethod === "COD" ? "Complete Order" : "Proceed to Payment"}
              {!isLoading && <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />}
            </Button>
            
            <p className="text-center text-[10px] font-black text-muted-foreground uppercase mt-6 tracking-[0.3em] opacity-40">
              Secure & Encrypted Transactions
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
