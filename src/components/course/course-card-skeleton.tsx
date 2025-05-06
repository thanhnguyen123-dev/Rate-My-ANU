import { Skeleton } from "@/components/ui/skeleton";

const CourseCardSkeleton = () => {
  return (
    <div className="rounded-lg border border-gray-200 shadow-sm p-4 h-full">
      {/* Course code skeleton */}
      <Skeleton className="h-6 w-1/3 mb-2" />
      
      {/* Course name skeleton (larger) */}
      <Skeleton className="h-8 w-5/6 mb-4" />
      
      {/* Course details skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
