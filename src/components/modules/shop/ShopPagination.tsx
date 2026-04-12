"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ShopPaginationProps {
  currentPage: number;
  hasMore: boolean;
}

export default function ShopPagination({ currentPage, hasMore }: ShopPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(pathname + "?" + params.toString());
  };

  if (currentPage === 1 && !hasMore) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-10">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center justify-center font-medium bg-muted px-4 py-2 rounded-md border min-w-10">
        {currentPage}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasMore}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
