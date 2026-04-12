import { sellerService } from "@/services/seller.service";
import { customerService } from "@/services/customer.service";
import MedicineCard from "@/components/modules/homePage/MedicineCard";
import { Medicine } from "@/types";
import FilterSidebar from "@/components/modules/shop/FilterSidebar";
import TopControls from "@/components/modules/shop/TopControls";
import ShopPagination from "@/components/modules/shop/ShopPagination";
import MobileFilterDrawer from "@/components/modules/shop/MobileFilterDrawer";
import MobileSortSelect from "@/components/modules/shop/MobileSortSelect";
import { PackageSearch } from "lucide-react";

export const metadata = {
  title: "Shop | Medistore",
  description: "Explore all our medicinal items.",
};

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const limit = 12;

  const [categoriesResponse, medicinesResponse] = await Promise.all([
    customerService.getCategories(),
    sellerService.getSellerMedicine({
      search: params.search,
      page: currentPage.toString(),
      limit: limit.toString(),
      categoryId: params.categoryId,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
      inStock: params.inStock,
    }),
  ]);

  const categories =
    categoriesResponse?.data?.data || categoriesResponse?.data || [];

  if (medicinesResponse.error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4 px-4">
        <div className="bg-destructive/10 p-4 rounded-full">
          <PackageSearch className="w-10 h-10 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold text-destructive text-center">
          Something went wrong loading items!
        </h2>
        <p className="text-muted-foreground text-center">
          {medicinesResponse.error.message}
        </p>
      </div>
    );
  }

  const medicineList =
    medicinesResponse.data?.data || medicinesResponse.data || [];
  const meta = medicinesResponse.data?.meta;

  const totalItems = meta?.total || medicineList.length;
  const hasMore = meta
    ? meta.page < meta.totalPage
    : medicineList.length === limit;

  return (
    <div className="container mx-auto px-4 py-8 md:py-10 md:px-8 lg:px-10">
      {/* ── Page Header ── */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary mb-1">
          Explore Medicines
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Find exactly what you need with our comprehensive filters and search.
        </p>
      </div>

      {/* ── Mobile: Filter button row ── */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{totalItems}</span> medicines
        </p>
        <MobileFilterDrawer categories={categories} />
      </div>

      {/* ── Main Layout ── */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

        {/* ── Desktop Sidebar ── */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 self-start border border-border/60 p-5 rounded-2xl bg-card shadow-sm">
          <h2 className="text-base font-bold mb-4 text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filters
          </h2>
          <FilterSidebar categories={categories} />
        </aside>

        {/* ── Content Area ── */}
        <main className="flex-1 min-w-0 flex flex-col min-h-[500px]">
          {/* TopControls — hidden on mobile (count shown above) */}
          <div className="hidden lg:block">
            <TopControls totalItems={totalItems} />
          </div>

          {/* Mobile Sort only (no count, it's above) */}
          <div className="flex items-center justify-end mb-4 lg:hidden">
            <MobileSortSelect />
          </div>

          {medicineList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 flex-1">
              {medicineList.map((medicine: Medicine) => (
                <MedicineCard key={medicine.id} medicine={medicine} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 py-16 md:py-24 border border-dashed rounded-2xl bg-muted/20">
              <div className="bg-muted p-4 rounded-full mb-4">
                <PackageSearch className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">No items found</h3>
              <p className="text-muted-foreground text-center max-w-[280px] text-sm">
                We couldn&apos;t find medicines matching your filters. Try adjusting or clearing them.
              </p>
            </div>
          )}

          <ShopPagination currentPage={currentPage} hasMore={hasMore} />
        </main>
      </div>
    </div>
  );
}

