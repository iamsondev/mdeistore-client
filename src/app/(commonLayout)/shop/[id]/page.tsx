import { sellerService } from "@/services/seller.service";
import { ShieldCheck, Truck, RotateCcw, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/layout/AddToCartButton";
import { Medicine, Category } from "@/types";
import Link from "next/link";

export const dynamicParams = true;

type TMedicineDetailsProps = {
  params: Promise<{ id: string }>;
};

function isCategoryObject(category: any): category is Category {
  return (
    category &&
    typeof category === "object" &&
    "name" in category &&
    "id" in category
  );
}

export async function generateStaticParams() {
  const { data } = await sellerService.getSellerMedicine(undefined, {
    revalidate: 60,
  });
  return data?.data
    .map((medicine: Medicine) => ({ id: medicine.id }))
    .splice(0, 3);
}

export default async function DetailsPage({ params }: TMedicineDetailsProps) {
  const { id } = await params;

  const response = await sellerService.getMedicineById(id);
  const medicine = response?.data?.data as Medicine;

  if (!medicine) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-500">
          Medicine Not Found!
        </h1>
      </div>
    );
  }

  const stockCount = Number(medicine?.stock ?? 0);
  const isAvailable = stockCount > 0;

  const categoryDisplay = isCategoryObject(medicine.category)
    ? medicine.category.name
    : typeof medicine.category === "string"
      ? medicine.category
      : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link
        href="/shop"
        className="inline-flex items-center text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group"
      >
        <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <img
          src={medicine.image || "https://placehold.co/600x400"}
          alt={medicine.name || "Medicine Product"}
          className="w-full aspect-square object-cover rounded-2xl border border-zinc-200"
        />

        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">
              {medicine.manufacturer || "Unknown Manufacturer"}
            </p>
            <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
              {medicine.name}
            </h1>
            {categoryDisplay && (
              <Badge variant="secondary" className="mt-2">
                {categoryDisplay}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 py-4 border-y border-zinc-100">
            <span className="text-4xl font-black text-zinc-900">
              ৳{Number(medicine.price).toFixed(2)}
            </span>
            <Badge
              variant={isAvailable ? "outline" : "destructive"}
              className={
                isAvailable
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-1"
                  : "px-4 py-1"
              }
            >
              {isAvailable ? `In Stock: ${stockCount}` : "Out of Stock"}
            </Badge>
          </div>

          <div className="prose prose-zinc max-w-none text-zinc-600">
            <h3 className="text-zinc-900 font-bold text-lg mb-2">
              Description
            </h3>
            <p className="whitespace-pre-line leading-relaxed">
              {medicine.description ||
                "Detailed description for this item is not yet available."}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, label: "Authentic", sub: "100% genuine" },
              { icon: Truck, label: "Fast Delivery", sub: "2–3 business days" },
              { icon: RotateCcw, label: "Easy Returns", sub: "7-day policy" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center p-3 rounded-xl bg-zinc-50 border border-zinc-100"
              >
                <Icon className="h-5 w-5 text-blue-600 mb-1" />
                <span className="text-xs font-semibold text-zinc-800">
                  {label}
                </span>
                <span className="text-xs text-zinc-500">{sub}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <AddToCartButton medicine={medicine} isAvailable={isAvailable} />
          </div>
        </div>
      </div>
    </div>
  );
}
