import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getCourses: publicProcedure
  .query(({ ctx }) => {
    const courses = ctx.db.course.findMany();
    return courses;
  }),

  getCourseByCode: publicProcedure
  .input(z.object({ 
    courseCode: z.string() 
  }))
  .query(({ ctx, input }) => {
    const { courseCode } = input;
    const course = ctx.db.course.findUnique({ 
      where: { courseCode: courseCode },
      // include: {
      //   reviews: true
      // }
    });
    return course;
  })
});