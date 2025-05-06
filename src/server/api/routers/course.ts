import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type Prisma } from "@prisma/client";
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
      filters: z.object({
        semester1: z.boolean(),
        semester2: z.boolean(),
        spring: z.boolean(),
        summer: z.boolean(),
        autumn: z.boolean(),
        winter: z.boolean(),
      }).optional(),
      sortBy: z.enum(["courseCode", "name"]).default("courseCode"),
      sortDirection: z.enum(["asc", "desc"]).default("asc"),
    })
  )
  .query(async ({ ctx, input }) => {
    const { limit, cursor, searchQuery, filters, sortBy, sortDirection } = input;

    const whereClause: Prisma.CourseWhereInput = {};
    const conditions: Prisma.CourseWhereInput[] = [];

    if (searchQuery) {
      conditions.push({
        OR: [
          { courseCode: { contains: searchQuery, mode: "insensitive" } },
          { name: { contains: searchQuery, mode: "insensitive" } },
        ]
      });
    }

    if (filters) {
      const activeFilters = Object.entries(filters)
        .filter(([_, value]) => value)
        .map(([key]) => {
          switch(key) {
            case 'semester1': return 'First Semester';
            case 'semester2': return 'Second Semester';
            case 'summer': return 'Summer Session';
            case 'winter': return 'Winter Session';
            case 'spring': return 'Spring Session';
            case 'autumn': return 'Autumn Session';
            default: return key;
          }
        });

      if (activeFilters.length > 0) {
        conditions.push({
          OR: activeFilters.map(filter => ({
            session: {
              contains: filter
            }
          }))
        });
      }
    }

    if (conditions.length > 0) {
      whereClause.AND = conditions;
    }

    const courses = await ctx.db.course.findMany({
      take: limit + 1,
      orderBy: {
        [sortBy]: sortDirection
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