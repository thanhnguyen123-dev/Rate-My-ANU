import { api } from "@/trpc/react";

interface ReviewStreamProps {
  courseCode: string;
}

const ReviewStream = ({ courseCode }: ReviewStreamProps) => {
  const { data: reviews, isLoading: isReviewsLoading } = api.review.getReviews.useQuery({ courseCode: courseCode });

  if (isReviewsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>ReviewStream</div>
  )
}

export default ReviewStream;