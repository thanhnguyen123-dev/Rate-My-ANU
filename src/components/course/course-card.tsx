"use client";

import { type Course } from "@prisma/client";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const router = useRouter();

  return (
    <div>
      <h2>{course.name}</h2>
      <p>{course.description}</p>
    </div>
  );
}

export default CourseCard;