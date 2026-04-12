"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterSidebar from "./FilterSidebar";
import { Category } from "@/types";

export default function MobileFilterDrawer({ categories }: { categories: Category[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 lg:hidden">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] sm:w-[380px] overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-left text-lg font-bold">Filter & Search</SheetTitle>
        </SheetHeader>
        <FilterSidebar categories={categories} />
      </SheetContent>
    </Sheet>
  );
}
