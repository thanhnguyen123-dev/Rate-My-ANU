import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { helloRouter } from "@/server/api/routers/hello";
import { courseRouter } from "@/server/api/routers/course";
import { reviewRouter } from "@/server/api/routers/review";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  hello: helloRouter,
  course: courseRouter,
  review: reviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
