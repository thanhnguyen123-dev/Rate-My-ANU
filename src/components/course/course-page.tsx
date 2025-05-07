"use client";

import { api } from "@/trpc/react";
import ReviewStream from "@/components/course/review-stream";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import InformationCard from "./information-card";
import Stack from "@mui/material/Stack";

const CoursePage = ({ courseCode }: { courseCode: string }) => {
  const { data: course, isLoading: isCourseLoading } = api.course.getCourse.useQuery({ courseCode: courseCode });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (isCourseLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      <div className="sticky top-4 self-start">
        <InformationCard
          courseCode={courseCode}
          name={course?.name ?? ""}
          units={course?.units ?? 0}
          modeOfDelivery={course?.modeOfDelivery ?? ""}
          year={course?.year ?? 0}
          prerequisites={course?.prerequisites ?? []}
          description={course?.description ?? []}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
          <p className="text-lg font-bold">Reviews</p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="w-24 text-white"
          >
            <SquarePen className="w-4 h-4" />
            Review
          </Button>
        </Stack>
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