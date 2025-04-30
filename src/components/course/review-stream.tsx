import { api } from "@/trpc/react";
import ReviewDialog from "./review-dialog";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
interface ReviewStreamProps {
  courseCode: string;
}

const ReviewStream = ({ courseCode }: ReviewStreamProps) => {
  const { data: reviews, isLoading: isReviewsLoading } = api.review.getReviews.useQuery({ courseCode: courseCode });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { user } = useAuth();


  if (isReviewsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setIsDialogOpen(true)}>Review</Button>
      <ReviewDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        courseCode={courseCode}
        userName={user?.user_metadata.name ?? ""}
        userEmail={user?.email ?? ""}
        userAvatarUrl={user?.user_metadata.avatar_url ?? ""}
      />
    </div>
  )
}

export default ReviewStream;