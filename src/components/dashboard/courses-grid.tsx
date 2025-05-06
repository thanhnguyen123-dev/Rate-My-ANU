"use client";

import CourseCard from "@/components/course/course-card";
import { useEffect, useRef } from "react";
import { api } from "@/trpc/react";
import { useIntersection } from "@/hooks/use-intersection";
import { useVirtualizer } from "@tanstack/react-virtual";
const CoursesGrid = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const isIntersecting = useIntersection(loadMoreRef, {
    threshold: 0,
    root: null,
    rootMargin: "0px 0px 200px 0px",
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

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const rowVirtualizer = useVirtualizer({
    count: allCourses.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
    overscan: 5,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div 
      ref={parentRef} 
      className="h-[calc(100vh-100px)] overflow-auto"
    >
      <div 
        className="relative w-full"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        <div 
          className="absolute top-0 left-0 w-full"
        >
          <div className="grid grid-cols-1 gap-6">
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const course = allCourses[virtualRow.index];
              return (
                <div 
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <CourseCard 
                    courseCode = {course?.courseCode ?? ""}
                    name = {course?.name ?? ""}
                    units = {course?.units ?? 0}
                    career = {course?.career ?? ""}
                    modeOfDelivery = {course?.modeOfDelivery ?? ""}
                    session = {course?.session ?? ""}
                    year = {course?.year ?? 0}
                  />
                </div>
              );
            })}
          </div>
          
          {/* Load more trigger element */}
          <div ref={loadMoreRef} className="h-4 w-full">
            {isFetchingNextPage && <div className="py-4 text-center">Loading more...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesGrid;