import { api } from "@/trpc/react";
import ReviewDialog from "./review-dialog";
import { useAuth } from "@/contexts/auth-context";
import ReviewCard from "./review-card";
import { type SetStateAction, type Dispatch } from "react";

interface ReviewStreamProps {
  courseCode: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const ReviewStream = ({ courseCode, isDialogOpen, setIsDialogOpen }: ReviewStreamProps) => {
  const { data: reviews, isLoading: isReviewsLoading } = api.review.getReviews.useQuery({ courseCode: courseCode });
  

  const { user } = useAuth();


  if (isReviewsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      <ReviewDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        courseCode={courseCode}
        userName={user?.user_metadata.name ?? ""}
        userEmail={user?.email ?? ""}
        userAvatarUrl={user?.user_metadata.avatar_url ?? ""}
      />
      <div className="flex flex-col gap-4">
        {reviews?.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}

export default ReviewStream;