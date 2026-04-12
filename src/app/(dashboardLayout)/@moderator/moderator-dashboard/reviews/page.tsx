import { adminService } from "@/services/admin.service";
import { ModeratorReviewsTable } from "@/components/modules/moderator/ModeratorReviewsTable";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ModeratorReviewsPage() {
  const { data } = await adminService.getAllReviews();
  const reviews: any[] = data?.data || [];

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : "0.0";
  const highRated = reviews.filter((r) => r.rating >= 4).length;
  const lowRated = reviews.filter((r) => r.rating <= 2).length;

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Star className="h-6 w-6 text-amber-500" />
          Review Moderation
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Approve or delete product reviews
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 dark:bg-amber-950 p-5">
          <div className="flex items-center gap-3">
            <Star className="h-8 w-8 text-amber-400 fill-amber-400" />
            <div>
              <p className="text-2xl font-black text-amber-700">{avgRating}</p>
              <p className="text-sm text-amber-600">Avg. Rating</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950 p-5">
          <div className="flex items-center gap-3">
            <ThumbsUp className="h-8 w-8 text-emerald-500" />
            <div>
              <p className="text-2xl font-black text-emerald-700">{highRated}</p>
              <p className="text-sm text-emerald-600">Positive (4-5★)</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-950 p-5">
          <div className="flex items-center gap-3">
            <ThumbsDown className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-2xl font-black text-red-700">{lowRated}</p>
              <p className="text-sm text-red-600">Negative (1-2★)</p>
            </div>
          </div>
        </div>
      </div>

      <ModeratorReviewsTable reviews={reviews} />
    </div>
  );
}
