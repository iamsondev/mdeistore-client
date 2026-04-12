"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";

export default function FilterSidebar({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("categoryId") || "";
  const initialMinPrice = searchParams.get("minPrice") || "";
  const initialMaxPrice = searchParams.get("maxPrice") || "";
  const currentSearch = searchParams.get("search") || "";

  const initialStock = searchParams.get("inStock") || "";
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [inStock, setInStock] = useState(initialStock);

  // Sync state with URL params
  useEffect(() => {
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setSearchTerm(searchParams.get("search") || "");
    setInStock(searchParams.get("inStock") || "");
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      params.delete("page"); // Reset pagination on filter change
      return params.toString();
    },
    [searchParams]
  );

  const handleCategorySelect = (id: string) => {
    router.push(pathname + "?" + createQueryString("categoryId", currentCategory === id ? "" : id));
  };

  const handleStockSelect = (val: string) => {
    router.push(pathname + "?" + createQueryString("inStock", inStock === val ? "" : val));
  };

  const handlePriceApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    params.delete("page");
    router.push(pathname + "?" + params.toString());
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(pathname + "?" + createQueryString("search", searchTerm));
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  // We consider filters active if any of these are present
  const hasActiveFilters = searchParams.toString() !== "";

  return (
    <div className="w-full space-y-6">
      {/* Search */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Search</h3>
        <form onSubmit={handleSearchSubmit} className="relative">
          <Input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Categories</h3>
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`category-${category.id}`}
                name="categoryGroup"
                checked={currentCategory === category.id}
                onChange={() => handleCategorySelect(category.id)}
                className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="text-sm cursor-pointer hover:text-primary transition-colors font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability Status */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Availability</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="stock-in"
              name="stockGroup"
              checked={inStock === "true"}
              onChange={() => handleStockSelect("true")}
              className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
            />
            <Label htmlFor="stock-in" className="text-sm cursor-pointer hover:text-primary transition-colors font-normal">
              In Stock
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="stock-out"
              name="stockGroup"
              checked={inStock === "false"}
              onChange={() => handleStockSelect("false")}
              className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
            />
            <Label htmlFor="stock-out" className="text-sm cursor-pointer hover:text-primary transition-colors font-normal">
              Out of Stock
            </Label>
          </div>
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Price Range</h3>
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Min"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <span className="text-muted-foreground">-</span>
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Max"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full text-sm"
            />
          </div>
        </div>
        <Button onClick={handlePriceApply} variant="secondary" className="w-full text-sm">
          Apply Range
        </Button>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button onClick={clearFilters} variant="outline" className="w-full flex items-center justify-center gap-2">
          <X className="w-4 h-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  );
}
