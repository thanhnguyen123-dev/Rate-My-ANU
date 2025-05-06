import CourseCard from "@/components/course/course-card";
import { useEffect, useRef, useState } from "react";
import { api } from "@/trpc/react";
import { useIntersection } from "@/hooks/use-intersection";

interface CoursesGridProps {
  searchQuery: string;
}

const CoursesGrid = ({ searchQuery }: CoursesGridProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [isFetchingInProgress, setIsFetchingInProgress] = useState(false);

  const isIntersecting = useIntersection(loadMoreRef, {
    threshold: 0,
    root: null,
    rootMargin: "0px 0px 5000px 0px",
  });
 
  const { 
    data: courses, 
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = api.course.getCourses.useInfiniteQuery(
    {
      limit: 72,
      searchQuery: searchQuery,
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
    const preloadInitialPages = async () => {
      if (courses?.pages.length && courses.pages.length < 3 && hasNextPage && !isFetchingNextPage && !isFetchingInProgress) {
        setIsFetchingInProgress(true);
        await fetchNextPage();
        setIsFetchingInProgress(false);
      }
    };
    
    void preloadInitialPages();
  }, [courses?.pages.length, hasNextPage, isFetchingNextPage, fetchNextPage, isFetchingInProgress]);


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
        className="h-1 w-full opacity-0 -mt-[800px]"
        style={{ position: 'relative', zIndex: -1 }}
        aria-hidden="true"
      />
    </div>
  );
}

export default CoursesGrid;