import CourseCard from "@/components/course/course-card";
import CourseCardSkeleton from "@/components/course/course-card-skeleton";
import { useEffect, useRef, useState } from "react";
import { api } from "@/trpc/react";
import { useIntersection } from "@/hooks/use-intersection";
import { type FilterState } from "@/components/dashboard/filter-dropdown";
import { type SortOption, type SortDirection } from "@/components/dashboard/sort-dropdown";
interface CoursesGridProps {
  searchQuery: string;
  filters: FilterState;
  sortBy: SortOption;
  sortDirection: SortDirection;
}

const CoursesGrid = ({ 
  searchQuery, 
  filters, 
  sortBy, 
  sortDirection }: CoursesGridProps) => {
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
    isLoading,
  } = api.course.getCourses.useInfiniteQuery(
    {
      limit: 72,
      searchQuery: searchQuery,
      filters: filters,
      sortBy: sortBy,
      sortDirection: sortDirection,
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

  // Create an array of skeletons when loading
  const renderSkeletons = () => {
    return Array(12).fill(0).map((_, index) => (
      <CourseCardSkeleton key={`skeleton-${index}`} />
    ));
  };

  // Create an array of skeletons for loading next page
  const renderLoadingMoreSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <CourseCardSkeleton key={`loading-more-skeleton-${index}`} />
    ));
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-hidden">
        {isLoading ? (
          // Initial loading state
          renderSkeletons()
        ) : (
          // Loaded courses
          <>
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
          </>
        )}
        
        {/* Show skeleton loaders when fetching next page */}
        {isFetchingNextPage && renderLoadingMoreSkeletons()}
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