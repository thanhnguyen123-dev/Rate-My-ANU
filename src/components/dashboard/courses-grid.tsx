"use client";

import CourseCard from "@/components/course/course-card";
import { useEffect, useRef, useState } from "react";
import { api } from "@/trpc/react";
import { useIntersection } from "@/hooks/use-intersection";

const CoursesGrid = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [isFetchingInProgress, setIsFetchingInProgress] = useState(false);

  const isIntersecting = useIntersection(loadMoreRef, {
    threshold: 0,
    root: null,
    rootMargin: "0px 0px 400px 0px",
  });
 
  const { 
    data: courses, 
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.course.getCourses.useInfiniteQuery(
    {
      limit: 24,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const allCourses = courses?.pages.flatMap((page) => page.courses) ?? [];

  // Simpler loading logic without scroll position management
  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage && !isFetchingInProgress) {
      setIsFetchingInProgress(true);
      
      void fetchNextPage().then(() => {
        // Add delay to prevent multiple rapid fetches
        setTimeout(() => {
          setIsFetchingInProgress(false);
        }, 500);
      });
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage, isFetchingInProgress]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCourses.map((course) => (
          <CourseCard 
            key={course?.courseCode}
            courseCode={course?.courseCode ?? ""}
            name={course?.name ?? ""}
            units={course?.units ?? 0}
            career={course?.career ?? ""}
            modeOfDelivery={course?.modeOfDelivery ?? ""}
            session={course?.session ?? ""}
            year={course?.year ?? 0}
          />
        ))}
      </div>
      
      {/* Load more trigger element - smaller and more subtle */}
      <div ref={loadMoreRef} className="h-12 w-full flex items-center justify-center mt-4">
        {(isFetchingNextPage || isFetchingInProgress) && 
          <div className="text-center text-sm text-gray-500">Loading more...</div>
        }
      </div>
    </div>
  );
}

export default CoursesGrid;