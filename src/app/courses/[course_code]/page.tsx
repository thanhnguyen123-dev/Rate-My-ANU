import CoursePage from "@/components/course/course-page";

interface PageProps {
  params: {
    course_code: string;
  };
}

const Page = ({ params }: PageProps) => {
  return (
    <CoursePage courseCode={params.course_code} />
  );
}

export default Page;