"use client";

import { api } from "@/trpc/react";
import ReviewStream from "@/components/course/review-stream";

const CoursePage = ({ courseCode }: { courseCode: string }) => {
  const { data: course, isLoading: isCourseLoading } = api.course.getCourse.useQuery({ courseCode: courseCode });

  if (isCourseLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <div className="border border-slate-200">
        <h1>{courseCode}</h1>
        <h1>{course?.name}</h1>
        <h1>{course?.units}</h1>
        <h1>{course?.modeOfDelivery}</h1>
        <h1>{course?.year}</h1>
        <h1>{course?.prerequisites}</h1>
      </div>
      <div className="border border-slate-200">
        <ReviewStream courseCode={courseCode} />
      </div>
    </div>
  )
}

export default CoursePage;