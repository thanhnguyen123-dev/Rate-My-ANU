"use client";

import { useParams } from "next/navigation";
import CoursePage from "@/components/course/course-page";

const Page = () => {
  const params = useParams();
  const course_code = params.course_code as string;
  
  return (
    <CoursePage courseCode={course_code} />
  );
}

export default Page;