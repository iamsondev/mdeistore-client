"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function MobileSortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) params.delete(key);
        else params.set(key, value);
      });
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  const handleSortChange = (value: string) => {
    if (value === "default") {
      router.push(
        pathname +
          "?" +
          createQueryString({ sortBy: null, sortOrder: null })
      );
      return;
    }
    const [sortBy, sortOrder] = value.split("-");
    router.push(
      pathname + "?" + createQueryString({ sortBy, sortOrder })
    );
  };

  const currentSortBy = searchParams.get("sortBy");
  const currentSortOrder = searchParams.get("sortOrder");
  const currentSortValue =
    currentSortBy && currentSortOrder
      ? `${currentSortBy}-${currentSortOrder}`
      : "default";

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
        Sort:
      </span>
      <select
        title="Sort Options"
        value={currentSortValue}
        onChange={(e) => handleSortChange(e.target.value)}
        className="h-9 px-2 text-xs bg-background border border-border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="default">Default</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="createdAt-desc">Newest</option>
        <option value="name-asc">Name A–Z</option>
        <option value="name-desc">Name Z–A</option>
      </select>
    </div>
  );
}
