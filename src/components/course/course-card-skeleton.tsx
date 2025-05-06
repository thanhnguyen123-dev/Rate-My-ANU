import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from "@/components/ui/skeleton";

const CourseCardSkeleton = () => {
  return (
    <Card className="h-full w-full">
      <CardContent className="p-6">
        <div className="space-y-2">
          <div className="flex items-start justify-between w-full">
            <Skeleton className="h-6 w-24 rounded-full bg-amber-50" />
            <Skeleton className="h-6 w-16 rounded-full bg-gray-50" />
          </div>
          
          <div className="h-12">
            <Skeleton className="h-full w-full" />
          </div>

          <div className="text-sm flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full bg-amber-50" />
            <Skeleton className="h-6 w-20 rounded-full bg-amber-50" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCardSkeleton;
