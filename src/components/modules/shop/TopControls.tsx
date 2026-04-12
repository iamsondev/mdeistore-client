"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TopControlsProps {
  totalItems: number;
}

export default function TopControls({ totalItems }: TopControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      params.delete("page"); // Reset pagination
      return params.toString();
    },
    [searchParams]
  );

  const handleSortChange = (value: string) => {
    // Format is "sortBy-sortOrder", e.g. "price-asc"
    if (value === "default") {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("sortBy");
      params.delete("sortOrder");
      params.delete("page");
      router.push(pathname + "?" + params.toString());
      return;
    }

    const [sortBy, sortOrder] = value.split("-");
    let params = createQueryString("sortBy", sortBy);
    
    const newParams = new URLSearchParams(params);
    newParams.set("sortOrder", sortOrder);
    
    router.push(pathname + "?" + newParams.toString());
  };

  const currentSortBy = searchParams.get("sortBy");
  const currentSortOrder = searchParams.get("sortOrder");
  const currentSortValue = currentSortBy && currentSortOrder ? `${currentSortBy}-${currentSortOrder}` : "default";

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-muted/30 p-4 rounded-lg mb-6 border">
      <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
        Showing <span className="font-semibold text-foreground">{totalItems}</span> matching medicines
      </div>
      
      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <span className="text-sm font-medium whitespace-nowrap">Sort By:</span>
        <select
          title="Sort Options"
          aria-label="Sort Options"
          value={currentSortValue}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-[180px] h-10 px-3 py-2 text-sm bg-background border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="default">Default Sorting</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="createdAt-desc">Newest Arrivals</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>
      </div>
    </div>
  );
}
