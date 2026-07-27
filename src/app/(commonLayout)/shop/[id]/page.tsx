import { sellerService } from "@/services/seller.service";
import { ShieldCheck, Truck, RotateCcw, ChevronLeft, Heart, Share2, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/layout/AddToCartButton";
import { InstantPurchaseButton } from "@/components/layout/InstantPurchaseButton";
import { Medicine, Category } from "@/types";
import Link from "next/link";
import { customerService } from "@/services/customer.service";
import { ReviewSection } from "@/components/modules/seller/medicine/ReviewSection";

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
  try {
    const { data } = await sellerService.getSellerMedicine(undefined, {
      revalidate: 60,
    });
    if (!data?.data) return [];
    return data.data
      .slice(0, 3)
      .map((medicine: Medicine) => ({ id: medicine.id }));
  } catch (err) {
    return [];
  }
}

export default async function DetailsPage({ params }: TMedicineDetailsProps) {
  const { id } = await params;

  const response = await sellerService.getMedicineById(id);
  const medicine = response?.data?.data as Medicine;
  const { data: reviewsData } = await customerService.getMedicineReviews(id);
  console.log("Reviews data:", JSON.stringify(reviewsData));
  const reviews = reviewsData?.data || [];
  const { hasOrdered } = await customerService.checkOrderedMedicine(id);
  console.log("hasOrdered:", hasOrdered);

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

  // Fetch related medicines from same category
  const { data: allMedicineData } = await sellerService.getSellerMedicine();
  const allMedicines: Medicine[] = allMedicineData?.data || [];
  
  const relatedMedicines = allMedicines
    .filter((m) => {
      const mCategoryName = isCategoryObject(m.category) ? m.category.name : m.category;
      return mCategoryName === categoryDisplay && m.id !== id;
    })
    .slice(0, 4);

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

          <div className="pt-6 space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <AddToCartButton 
                  medicine={medicine} 
                  isAvailable={isAvailable} 
                />
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-xl border-zinc-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all duration-300 group"
              >
                <Heart className="h-5 w-5 transition-transform group-hover:scale-110" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-xl border-zinc-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-300 group"
              >
                <Share2 className="h-5 w-5 transition-transform group-hover:scale-110" />
              </Button>
            </div>
            
            <InstantPurchaseButton 
              medicine={medicine} 
              isAvailable={isAvailable} 
            />
          </div>
        </div>
      </div>
      {/* Related Products Section */}
      {relatedMedicines.length > 0 && (
        <div className="mt-24 border-t border-zinc-100 pt-16">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Related <span className="text-blue-600">Products</span></h2>
                <p className="text-zinc-500 font-medium">Customers who bought this also looked at</p>
             </div>
             <Link href="/shop" className="text-sm font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4">
                View All
             </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedMedicines.map((item) => (
              <Link 
                key={item.id} 
                href={`/shop/${item.id}`}
                className="group flex flex-col bg-white border border-zinc-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300"
              >
                <div className="aspect-square relative overflow-hidden bg-zinc-50">
                  <img 
                    src={item.image || "https://placehold.co/400x400"} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 backdrop-blur-sm text-zinc-800 border-none shadow-sm text-[10px] py-0 h-5">
                      {item.manufacturer && item.manufacturer.split(' ')[0]}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-1">{item.name}</h3>
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <span className="font-black text-zinc-900 text-lg">৳{item.price}</span>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-full">Explore</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-20">
        <ReviewSection
          medicineId={id}
          hasOrdered={hasOrdered}
          reviews={reviews}
        />
      </div>
    </div>
  );
}
