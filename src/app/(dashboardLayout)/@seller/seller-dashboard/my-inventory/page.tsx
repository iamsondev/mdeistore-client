import { sellerService } from "@/services/seller.service";
import { Button } from "@/components/ui/button";
import { MedicineTable } from "@/components/modules/seller/medicine/MedicineTable";
import { customerService } from "@/services/customer.service";
import { Plus, Package } from "lucide-react";
import * as motion from "framer-motion/client";

export const dynamic = "force-dynamic";

export default async function MyInventoryPage() {
  const { data: session } = await customerService.getsession();

  const { data } = await sellerService.getSellerMedicine(
    { sellerId: session?.user?.id },
    { cache: "no-store" },
  );

  const medicineList = data?.data || data || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-10 space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-6 rounded-2xl border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">My Inventory</h1>
            <p className="text-sm text-muted-foreground font-medium">Manage and track your pharmaceutical stock</p>
          </div>
        </div>
        <Button className="rounded-xl h-12 px-6 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
          <Plus className="h-4 w-4 mr-2" /> Add New Medicine
        </Button>
      </div>
      
      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden min-h-[400px]">
        <MedicineTable medicines={medicineList} />
      </div>
    </motion.div>
  );
}
