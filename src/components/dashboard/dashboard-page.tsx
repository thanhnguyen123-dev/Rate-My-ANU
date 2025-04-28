"use client";

import CourseCard from "@/components/course/course-card";
import { api } from "@/trpc/react";

const DashboardPage = () => {
  const { data: courses } = api.course.getCourses.useQuery();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses?.map((course) => (
        <CourseCard key={course.courseCode} {...course} />
      ))}
    </div>
  )
}

export default DashboardPage;