import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Prisma } from "@prisma/client";
export const courseRouter = createTRPCRouter({
  getCourse: publicProcedure
  .input(z.object({
    courseCode: z.string()
  }))
  .query(({ ctx, input }) => {
    const { courseCode } = input;
    const course = ctx.db.course.findUnique({
      where: { courseCode: courseCode },
    });
    return course;
  }),

  getCourses: publicProcedure
  .input(
    z.object({
      limit: z.number().min(1).max(100).default(24),
      cursor: z.string().nullish(),
      searchQuery: z.string().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    const { limit, cursor, searchQuery } = input;

    const whereClause: Prisma.CourseWhereInput = {};

    if (searchQuery) {
      whereClause.OR = [
        { courseCode: { contains: searchQuery, mode: "insensitive" } },
        { name: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    const courses = await ctx.db.course.findMany({
      take: limit + 1,
      orderBy: {
        courseCode: "asc"
      },
      cursor: cursor ? { courseCode: cursor } : undefined,
      skip: cursor ? 1 : 0,
      where: whereClause
    });

    let nextCursor: typeof cursor | undefined;
    if (courses.length > limit) {
      const nextItem = courses.pop();
      nextCursor = nextItem?.courseCode;
    }

    return {
      courses,
      nextCursor
    };
  }),

});