import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { type Course } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    const courses = JSON.parse(fs.readFileSync(
      path.join(process.cwd(), "src/data/courses.json"), 
      "utf-8"
    ));


    let seededCount = 0;
    
    for (const course of courses) {
      if (!course || typeof course !== 'object') {
        console.log("Skipping invalid course entry:", course);
        continue;
      }
      const courseCode: string = course.CourseCode;
      
      if (!courseCode || courseCode.startsWith("EXTN")) {
        console.log("Skipping course:", course);
        continue;
      }
      
      console.log(`Processing course: ${courseCode}`);

      const courseData: Course = {
        courseCode: course.CourseCode,
        name: course.Name,
        session: course.Session,
        career: course.Career,
        units: course.Units,
        modeOfDelivery: course.ModeOfDelivery,
        year: course.Year,
        description: course.description,
        prerequisites: course.prerequisites
      }

      await prisma.course.upsert({
        where: { 
          courseCode: course.CourseCode
        },
        update: {},
        create: courseData
      });
      
      seededCount++;
    }
    
    console.log(`Successfully seeded ${seededCount} courses`);
  } catch (error) {
    console.error("Error in seed function:", error);
    throw error;
  }
}

seed()
  .then(async () => {
    console.log("Seeding completed successfully");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Error during seeding:", error);
    await prisma.$disconnect();
    process.exit(1);
  });