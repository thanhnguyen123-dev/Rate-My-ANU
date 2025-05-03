import React, { useState } from "react";
import { ThumbsUp, MoreVertical, Trash2 } from "lucide-react";
import { type Review, type Like } from "@prisma/client";
import DisplayRating from "@/components/ui/display-rating";
import { Stack } from "@mui/material";
import { api } from "@/trpc/react";
import { useAuth } from "@/contexts/auth-context";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ReviewCardProps {
  review: Review & { likes: Like[] };
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { user } = useAuth();
  const utils = api.useUtils();
  const [optimisticLikes, setOptimisticLikes] = useState(review.likes);
  const [isDeleted, setIsDeleted] = useState(false);
  
  // Format date to display
  const formattedDate = review.createdAt 
    ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(review.createdAt))
    : '';

  const overallRating = ((review.difficultyRating + review.workloadRating + review.teachingRating) / 3);
  
  // Check if current user has liked this review
  const hasLiked = user?.id && optimisticLikes.some(like => like.userId === user.id);
  
  // Check if current user is the author of this review
  const isAuthor = user?.id === review.userId;

  const { mutate: likeReview } = api.review.likeReview.useMutation({
    onMutate: async () => {
      const userLiked = optimisticLikes.some(like => like.userId === user?.id);
      if (userLiked) {
        setOptimisticLikes(optimisticLikes.filter(like => like.userId !== user?.id));
      } else {
        setOptimisticLikes(prev => [
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
  
  const { mutate: deleteReview } = api.review.deleteReview.useMutation({
    onMutate: async () => {
      // Optimistic update - hide the review immediately
      toast.success("Review deleted successfully");
      setIsDeleted(true);
    },
    onSettled: async () => {
      // Invalidate queries to refresh the data
      await utils.review.getReviews.invalidate({
        courseCode: review.courseCode,
      });
    },
    onError: (error) => {
      // Show error and rollback optimistic update
      toast.error("Failed to delete review", {
        description: error.message
      });
      setIsDeleted(false);
    }
  });

  const handleLike = () => {
    if (!user) return;
    likeReview({ reviewId: review.id });
  }
  
  const handleDelete = () => {
    if (!isAuthor) return;
    deleteReview({ reviewId: review.id });
  }
  
  // If the review is optimistically deleted, don't render it
  if (isDeleted) return null;
  
  return (
    <div className="flex flex-col gap-4 border rounded-lg p-5 shadow-sm bg-white">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h3 className="text-lg font-semibold">{review.title ?? "Untitled Review"}</h3>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">{formattedDate}</span>
          
          {/* Only show options menu for the author */}
          {isAuthor && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical size={16} />
                  <span className="sr-only">Open menu</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleDelete}
                >
                  <Trash2 size={14} className="mr-2" />
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
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
          <span>{optimisticLikes.length}</span>
        </button>
      </Stack>
    </div>
  );
};

export default ReviewCard;
