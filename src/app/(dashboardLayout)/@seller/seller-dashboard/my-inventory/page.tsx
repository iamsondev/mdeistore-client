import { sellerService } from "@/services/seller.service";
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

export default async function MyInventoryPage() {
  const { data } = await sellerService.getSellerMedicine();

  const medicineList = data?.data || data || [];

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Inventory</h1>
        <Button size="sm">Add New Medicine</Button>
      </div>

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
            {medicineList.map((medicine: Medicine) => (
              <TableRow key={medicine.id}>
                <TableCell>
                  <div className="relative h-10 w-10 overflow-hidden rounded-md border">
                    <Image
                      src={medicine.image || "/placeholder-medicine.png"}
                      alt={medicine.name}
                      fill
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
                    className={`${medicine.stock < 10 ? "text-red-500 font-bold" : ""}`}
                  >
                    {medicine.stock}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {medicineList.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No medicines found in your inventory.
          </div>
        )}
      </div>
    </div>
  );
}
