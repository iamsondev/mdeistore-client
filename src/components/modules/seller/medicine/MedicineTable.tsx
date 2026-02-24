"use client";

import { useState } from "react";
import { Medicine } from "@/types";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { deleteMedicine } from "@/actions/medicine.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function MedicineTable({ medicines }: { medicines: Medicine[] }) {
  const [list, setList] = useState(medicines);
  const router = useRouter();

  const handleDelete = (id: string) => {
    toast("Are you sure you want to delete this medicine?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          const toastId = toast.loading("Deleting...");
          try {
            const res = await deleteMedicine(id);
            if (res?.error) {
              toast.error(res.error.message || "Failed to delete", {
                id: toastId,
              });
              return;
            }

            setList((prev) => prev.filter((m) => m.id !== id));
            toast.success("Medicine deleted successfully!", { id: toastId });

            router.refresh();
          } catch (err) {
            toast.error("Failed to delete medicine", { id: toastId });
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Medicine Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {list.map((medicine) => (
            <TableRow key={medicine.id}>
              <TableCell>
                <div className="relative h-10 w-10 overflow-hidden rounded-md border">
                  <Image
                    src={medicine.image || "/placeholder-medicine.png"}
                    alt={medicine.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              </TableCell>

              <TableCell className="font-medium">
                <div>
                  <p>{medicine.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {medicine.manufacturer}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                  {medicine.category?.name || "N/A"}
                </span>
              </TableCell>

              <TableCell>৳{medicine.price}</TableCell>

              <TableCell>
                <span
                  className={
                    medicine.stock < 10 ? "text-red-500 font-bold" : ""
                  }
                >
                  {medicine.stock}
                </span>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      router.push(
                        `/seller-dashboard/medicines/${medicine.id}/edit`,
                      )
                    }
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDelete(medicine.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {list.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No medicines found in your inventory.
        </div>
      )}
    </div>
  );
}
