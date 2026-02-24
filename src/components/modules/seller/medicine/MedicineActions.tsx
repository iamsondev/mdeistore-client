"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { deleteMedicine } from "@/actions/medicine.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function MedicineActions({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    const toastId = toast.loading("Deleting...");
    const { error } = await deleteMedicine(id);
    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }
    toast.success("Medicine deleted!", { id: toastId });
    router.refresh();
  };

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => router.push(`/seller-dashboard/medicines/${id}/edit`)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="destructive"
        size="icon"
        className="h-8 w-8"
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
