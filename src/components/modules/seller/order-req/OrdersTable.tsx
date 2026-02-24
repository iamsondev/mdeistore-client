"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { updateOrderStatus } from "@/actions/order.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const STATUS_OPTIONS = [
  "PLACED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export function OrdersTable({ orders }: { orders: any[] }) {
  const router = useRouter();

  const handleStatusUpdate = async (orderId: string, status: string) => {
    const toastId = toast.loading("Updating status...");
    try {
      const res = await updateOrderStatus(orderId, status);
      if (res?.error) {
        toast.error("Failed to update status", { id: toastId });
        return;
      }
      toast.success("Status updated!", { id: toastId });
      router.refresh();
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-xs">
                {order.id.slice(0, 8)}...
              </TableCell>
              <TableCell>
                {order.orderItems.map((item: any) => (
                  <div key={item.id} className="text-sm">
                    {item.medicine.name} x{item.quantity}
                  </div>
                ))}
              </TableCell>
              <TableCell className="text-sm">{order.address}</TableCell>
              <TableCell>
                ৳
                {order.orderItems.reduce(
                  (sum: number, item: any) => sum + item.price * item.quantity,
                  0,
                )}
              </TableCell>
              <TableCell>
                <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                  {order.status}
                </span>
              </TableCell>
              <TableCell>
                <select
                  className="text-sm border rounded px-2 py-1 bg-background"
                  defaultValue={order.status}
                  onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                  disabled={
                    order.status === "DELIVERED" || order.status === "CANCELLED"
                  }
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {orders.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No orders found.
        </div>
      )}
    </div>
  );
}
