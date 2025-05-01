"use client";

import { api } from "@/trpc/react";
import ReviewStream from "@/components/course/review-stream";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SquarePen } from "lucide-react";
const CoursePage = ({ courseCode }: { courseCode: string }) => {
  const { data: course, isLoading: isCourseLoading } = api.course.getCourse.useQuery({ courseCode: courseCode });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (isCourseLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <div className="sticky top-4 self-start">
        <h1>{courseCode}</h1>
        <h1>{course?.name}</h1>
        <h1>{course?.units}</h1>
        <h1>{course?.modeOfDelivery}</h1>
        <h1>{course?.year}</h1>
        <h1>{course?.prerequisites}</h1>
        {/* <h1>{course?.description}</h1> */}
      </div>
      <div className="flex flex-col gap-4">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="w-24"
        >
          <SquarePen className="w-4 h-4" />
          Review
        </Button>
        <ReviewStream
          courseCode={courseCode}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>
    </div>
  )
}

export default CoursePage;