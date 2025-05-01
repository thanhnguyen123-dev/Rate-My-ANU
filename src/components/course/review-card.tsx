import React, { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { type Review, type Like } from "@prisma/client";
import DisplayRating from "@/components/ui/display-rating";
import { Stack } from "@mui/material";
import { api } from "@/trpc/react";
import { useAuth } from "@/contexts/auth-context";

interface ReviewCardProps {
  review: Review & { likes: Like[] };
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { user } = useAuth();
  const utils = api.useUtils();
  const [optimisticLike, setOptimisticLike] = useState(review.likes);
  // Format date to display
  const formattedDate = review.createdAt 
    ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(review.createdAt))
    : '';

  const overallRating = ((review.difficultyRating + review.workloadRating + review.teachingRating) / 3);
  
  // Check if current user has liked this review
  const hasLiked = user?.id && review.likes.some(like => like.userId === user.id);

  const { mutate: likeReview } = api.review.likeReview.useMutation({
    onMutate: async () => {
      const userLiked = optimisticLike.some(like => like.userId === user?.id);
      if (userLiked) {
        setOptimisticLike(optimisticLike.filter(like => like.userId !== user?.id));
      } else {
        setOptimisticLike(prev => [
          ...prev,
          { 
            id: "optimistic-like",
            userId: user?.id ?? "",
            reviewId: review.id,
          }
        ])
      }
    },
    onSettled: async () => {
      await utils.review.getReviews.invalidate({
        courseCode: review.courseCode,
      });
    }
  });

  const handleLike = () => {
    if (!user) return;
    likeReview({ reviewId: review.id });
  }
  return (
    <div className="border rounded-lg p-5 shadow-sm bg-white">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h3 className="text-lg font-semibold">{review.title ?? "Untitled Review"}</h3>
        <span className="text-gray-500 text-sm">{formattedDate}</span>
      </Stack>
      
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <DisplayRating 
          value={overallRating} 
          label="Overall" 
          color="#1a92ed" 
          direction="row" 
        />
        <span className="text-gray-500">
          {review.isAnonymous ? "Anonymous" : review.userName}
        </span>
      </Stack>
      
      {/* Rating categories */}
      <Stack direction="row" spacing={2}>
        <DisplayRating 
          value={review.difficultyRating} 
          label="Difficulty" 
          direction="column" 
        />
        <DisplayRating 
          value={review.workloadRating} 
          label="Workload" 
          direction="column" 
        />
        <DisplayRating 
          value={review.teachingRating} 
          label="Teaching" 
          direction="column" 
        />
      </Stack>
     
      
      {/* Review content */}
      <div className="mt-3 text-gray-700 whitespace-pre-wrap">
        {review.content}
      </div>
      
      {/* Like button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <button 
          onClick={handleLike}
          disabled={!user}
          className={`flex items-center gap-1 text-sm ${hasLiked ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-600`}
        >
          <ThumbsUp size={16} />
          <span>{optimisticLike.length}</span>
        </button>
      </Stack>
    </div>
  );
};

export default ReviewCard;
