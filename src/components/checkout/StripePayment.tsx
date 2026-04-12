"use client";

import { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createPaymentIntent } from "@/actions/payment.action";

interface StripePaymentProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  isProcessing: boolean;
  setIsProcessing: (loading: boolean) => void;
}

export function StripePayment({ amount, onSuccess, isProcessing, setIsProcessing }: StripePaymentProps) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    const toastId = toast.loading("Processing payment...");

    try {
      // 1. Create Payment Intent on backend
      const res = await createPaymentIntent(amount);
      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        setIsProcessing(false);
        return;
      }

      const clientSecret = res.data?.clientSecret;

      // 2. Confirm payment on frontend
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (error) {
        toast.error(error.message || "Payment failed", { id: toastId });
        setIsProcessing(false);
      } else if (paymentIntent.status === "succeeded") {
        toast.success("Payment successful!", { id: toastId });
        onSuccess(paymentIntent.id);
      }
    } catch (err) {
      toast.error("An unexpected error occurred", { id: toastId });
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-xl bg-muted/20 border-primary/20">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20"
      >
        {isProcessing ? "Processing..." : `Pay ৳${amount.toFixed(2)}`}
      </Button>
    </form>
  );
}
