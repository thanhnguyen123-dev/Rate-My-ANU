"use client";

import { api } from "@/trpc/react";

const CoursePage = ({ courseCode }: { courseCode: string }) => {
  const { data: course, isLoading: isCourseLoading } = api.course.getCourse.useQuery({ courseCode: courseCode });

  if (isCourseLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{courseCode}</h1>
      <h1>{course?.name}</h1>
      {/* <h1>{course?.description}</h1> */}
      <h1>{course?.units}</h1>
      <h1>{course?.modeOfDelivery}</h1>
      <h1>{course?.year}</h1>
      <h1>{course?.prerequisites}</h1>
    </div>
  )
}

export default CoursePage;