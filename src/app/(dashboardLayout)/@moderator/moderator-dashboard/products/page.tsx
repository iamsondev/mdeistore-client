import { sellerService } from "@/services/seller.service";
import { Shield, AlertTriangle, CheckCircle, Package } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ModeratorProductsPage() {
  const { data } = await sellerService.getSellerMedicine({ limit: "50" });
  const medicines: any[] = data?.data || [];

  // Flag products with suspiciously low price or missing info as "suspicious"
  const suspicious = medicines.filter(
    (m) => !m.description || !m.image || Number(m.price) < 1
  );
  const clean = medicines.length - suspicious.length;

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="h-6 w-6 text-indigo-500" />
          Product Moderation
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Review and flag potentially fake or incomplete products
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 dark:bg-blue-950 p-5">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-black text-blue-700">{medicines.length}</p>
              <p className="text-sm text-blue-600">Total Products</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-950 p-5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-2xl font-black text-red-700">{suspicious.length}</p>
              <p className="text-sm text-red-600">Suspicious / Incomplete</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950 p-5">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-emerald-500" />
            <div>
              <p className="text-2xl font-black text-emerald-700">{clean}</p>
              <p className="text-sm text-emerald-600">Looks Good</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suspicious Products List */}
      {suspicious.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Flagged / Incomplete Products
          </h2>
          {suspicious.map((med) => (
            <div
              key={med.id}
              className="rounded-2xl border border-red-200 bg-red-50/50 dark:bg-red-950/30 p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                {med.image ? (
                  <img
                    src={med.image}
                    alt={med.name}
                    className="h-12 w-12 rounded-xl object-cover border"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center">
                    <Package className="h-6 w-6 text-red-400" />
                  </div>
                )}
                <div>
                  <p className="font-bold">{med.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Price: ৳{med.price} • Stock: {med.stock}
                  </p>
                  <div className="flex gap-2 mt-1">
                    {!med.description && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                        No Description
                      </span>
                    )}
                    {!med.image && (
                      <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                        No Image
                      </span>
                    )}
                    {Number(med.price) < 1 && (
                      <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                        Suspicious Price
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition shrink-0">
                <AlertTriangle className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* All Products Grid */}
      <div>
        <h2 className="text-lg font-bold mb-4">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicines.map((med) => (
            <div
              key={med.id}
              className="rounded-2xl border border-border bg-card p-4 flex gap-3"
            >
              {med.image ? (
                <img
                  src={med.image}
                  alt={med.name}
                  className="h-14 w-14 rounded-xl object-cover border shrink-0"
                />
              ) : (
                <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{med.name}</p>
                <p className="text-xs text-muted-foreground">৳{med.price}</p>
                <p className="text-xs text-muted-foreground">Stock: {med.stock}</p>
                {(!med.description || !med.image || Number(med.price) < 1) ? (
                  <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full mt-1 inline-block">
                    ⚠ Flagged
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full mt-1 inline-block">
                    ✓ OK
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {medicines.length === 0 && (
          <p className="text-center py-20 text-muted-foreground">No products found.</p>
        )}
      </div>
    </div>
  );
}
