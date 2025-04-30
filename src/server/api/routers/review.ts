import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const reviewRouter = createTRPCRouter({
  getReviews: publicProcedure
  .input(z.object({ 
    courseCode: z.string() 
  }))
  .query(({ ctx, input }) => {
    const { courseCode } = input;
    return ctx.db.course.findUnique({ 
      where: { courseCode },
      include: {
        reviews: {
          include: {
            likes: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
  }),

  createReview: protectedProcedure
  .input(z.object({
    courseCode: z.string(),
    title: z.string().optional(),
    content: z.string(),
    difficultyRating: z.number().min(1).max(5),
    workloadRating: z.number().min(1).max(5),
    teachingRating: z.number().min(1).max(5),
    grade: z.string().optional(),
    courseCompletion: z.string().optional(),
    userName: z.string().optional(),
    userEmail: z.string().optional(),
    userAvatarUrl: z.string().optional(),
  }))
  .mutation(async ({ ctx, input }) => {
    const { 
      courseCode, 
      title,
      content, 
      difficultyRating, 
      workloadRating, 
      teachingRating,
      grade,
      userName, 
      userEmail, 
      userAvatarUrl 
    } = input;

    const userId = ctx.user.id;
    
    // Check if course exists
    const course = await ctx.db.course.findUnique({
      where: { courseCode }
    });
    
    if (!course) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Course with code ${courseCode} not found`,
      });
    }
    
    // Check if user already has a review for this course
    const existingReview = await ctx.db.review.findFirst({
      where: {
        courseCode,
        userId
      }
    });
    
    if (existingReview) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'You have already reviewed this course',
      });
    }

    // Create the review
    const review = await ctx.db.review.create({
      data: {
        courseCode,
        content,
        difficultyRating,
        workloadRating,
        teachingRating,
        userId,
        userName,
        userEmail,
        userAvatarUrl
      }
    });
    
    return review;
  }),
  
  likeReview: protectedProcedure
  .input(z.object({
    reviewId: z.string()
  }))
  .mutation(async ({ ctx, input }) => {
    const { reviewId } = input;
    const userId = ctx.user.id;
    
    // Check if review exists
    const review = await ctx.db.review.findUnique({
      where: { id: reviewId }
    });
    
    if (!review) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Review not found',
      });
    }
    
    // Check if user already liked this review
    const existingLike = await ctx.db.like.findUnique({
      where: {
        reviewId_userId: {
          reviewId,
          userId
        }
      }
    });
    
    // If like exists, remove it (unlike)
    if (existingLike) {
      return ctx.db.like.delete({
        where: {
          id: existingLike.id
        }
      });
    }
    
    // Otherwise, create a new like
    return ctx.db.like.create({
      data: {
        reviewId,
        userId
      }
    });
  })
});