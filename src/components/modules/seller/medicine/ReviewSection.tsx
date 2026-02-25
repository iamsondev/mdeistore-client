"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/actions/review.action";
import { toast } from "sonner";
import { Star } from "lucide-react";

interface Props {
  medicineId: string;
  hasOrdered: boolean;
  reviews: any[];
}

export function ReviewSection({ medicineId, hasOrdered, reviews }: Props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [list, setList] = useState(reviews);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating!");
      return;
    }
    if (comment.length < 5) {
      toast.error("Comment must be at least 5 characters!");
      return;
    }
    const toastId = toast.loading("Submitting review...");
    const res = await createReview({ medicineId, rating, comment });
    if (res?.error) {
      toast.error("Failed to submit review", { id: toastId });
      return;
    }
    toast.success("Review submitted!", { id: toastId });
    setSubmitted(true);
    setList((prev) => [...prev, res.data?.data]);
  };

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-xl font-bold">Reviews</h2>

      {hasOrdered && !submitted && (
        <div className="border rounded-xl p-6 space-y-4 bg-card">
          <h3 className="font-semibold">Leave a Review</h3>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  className={`h-6 w-6 transition-colors ${
                    star <= (hover || rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-zinc-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />

          <Button onClick={handleSubmit}>Submit Review</Button>
        </div>
      )}

      {!hasOrdered && (
        <p className="text-muted-foreground text-sm">
          Purchase this medicine to leave a review.
        </p>
      )}

      {list.length === 0 ? (
        <p className="text-muted-foreground">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {list.filter(Boolean).map((review: any) => (
            <div
              key={review?.id || Math.random()}
              className="border rounded-xl p-4 bg-card"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= (review?.rating || 0)
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  {review?.user?.name || "Customer"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{review?.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
