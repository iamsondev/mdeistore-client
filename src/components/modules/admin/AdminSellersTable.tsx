"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUserRole, updateUserStatus } from "@/actions/admin.action";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, Store } from "lucide-react";

export function AdminSellersTable({ sellers }: { sellers: any[] }) {
  const router = useRouter();

  const handleApprove = async (id: string) => {
    const toastId = toast.loading("Approving seller...");
    const res = await updateUserStatus(id, "ACTIVE");
    if (res?.error) {
      toast.error("Failed", { id: toastId });
      return;
    }
    toast.success("Seller approved!", { id: toastId });
    router.refresh();
  };

  const handleReject = async (id: string) => {
    const toastId = toast.loading("Blocking seller...");
    const res = await updateUserStatus(id, "BLOCKED");
    if (res?.error) {
      toast.error("Failed", { id: toastId });
      return;
    }
    toast.success("Seller blocked!", { id: toastId });
    router.refresh();
  };

  return (
    <div className="border rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Seller</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sellers.map((seller, i) => (
            <motion.tr
              key={seller.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-b last:border-0 hover:bg-muted/30 transition-colors"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center">
                    <Store className="h-4 w-4 text-amber-600" />
                  </div>
                  <span className="font-semibold">{seller.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{seller.email}</TableCell>
              <TableCell>
                <Badge
                  className={
                    seller.status === "ACTIVE"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }
                >
                  {seller.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleApprove(seller.id)}
                    disabled={seller.status === "ACTIVE"}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(seller.id)}
                    disabled={seller.status === "BLOCKED"}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Block
                  </button>
                </div>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
      {sellers.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">No sellers found.</div>
      )}
    </div>
  );
}
