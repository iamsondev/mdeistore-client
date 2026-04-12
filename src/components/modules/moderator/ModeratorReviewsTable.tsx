"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteReviewAction } from "@/actions/admin.action";
import { Star, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ModeratorReviewsTable({ reviews }: { reviews: any[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting review...");
    const res = await deleteReviewAction(id);
    if (res?.error) {
      toast.error("Failed to delete review", { id: toastId });
      return;
    }
    toast.success("Review deleted!", { id: toastId });
    router.refresh();
  };

  return (
    <div className="border rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Reviewer</TableHead>
            <TableHead>Medicine</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review, i) => (
            <motion.tr
              key={review.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="border-b last:border-0 hover:bg-muted/30 transition-colors group"
            >
              <TableCell className="font-medium">
                {review.User?.name || review.user?.name || "Anonymous"}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {review.medicine?.name || review.medicineId?.slice(0, 8)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`h-3.5 w-3.5 ${
                        idx < review.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-sm max-w-[200px] truncate text-muted-foreground">
                {review.comment}
              </TableCell>
              <TableCell className="text-right">
                <button
                  onClick={() => handleDelete(review.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 ml-auto px-3 py-1.5 text-xs font-bold rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
      {reviews.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">No reviews found.</div>
      )}
    </div>
  );
}
