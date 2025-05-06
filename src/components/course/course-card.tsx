"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { formatSession } from "@/utils/format-session";

interface CourseCardProps {
  courseCode: string;
  name: string;
  units: number;
  career: string;
  modeOfDelivery: string;
  session: string;
  year: number;
}

const CourseCard = ({ 
  courseCode, 
  name, 
  units, 
  session
 }: CourseCardProps) => {
  const router = useRouter();
  const handleClickCourseCard = () => {
    router.push(`/courses/${courseCode}`);
  }

  const formattedSessions = formatSession(session);
  return (
    <Card 
      role="button"
      className="h-full hover:shadow-md transition-shadow duration-200" 
      onClick={handleClickCourseCard}
    >
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm">
              {courseCode}
            </Badge>
            <Badge variant="outline" className="bg-gray-50">
              {units} units
            </Badge>
          </div>
          
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 h-12">
            {name}
          </h3>

          <div className="text-sm text-gray-500 flex gap-2">
            {formattedSessions.map((session) => (
              <Badge variant="outline" className="bg-blue-50" key={session}>
                {session}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;