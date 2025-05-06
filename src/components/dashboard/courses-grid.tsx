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
    rootMargin: "0px 0px 2000px 0px",
  });
 
  const { 
    data: courses, 
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.course.getCourses.useInfiniteQuery(
    {
      limit: 48,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const allCourses = courses?.pages.flatMap((page) => page.courses) ?? [];

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage && !isFetchingInProgress) {
      setIsFetchingInProgress(true);
      
      void fetchNextPage().then(() => {
        setIsFetchingInProgress(false);
      });
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage, isFetchingInProgress]);

  useEffect(() => {
    if (courses?.pages.length === 1 && hasNextPage && !isFetchingNextPage && !isFetchingInProgress) {
      setIsFetchingInProgress(true);
      void fetchNextPage().then(() => {
        setIsFetchingInProgress(false);
      });
    }
  }, [courses?.pages.length, hasNextPage, isFetchingNextPage, fetchNextPage, isFetchingInProgress]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-hidden">
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
      
      <div 
        ref={loadMoreRef} 
        className="h-1 w-full opacity-0 -mt-40"
        aria-hidden="true"
      />
    </div>
  );
}

export default CoursesGrid;