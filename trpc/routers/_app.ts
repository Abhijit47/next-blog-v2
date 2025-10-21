import { db } from '@/drizzle/db';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';

import { postsRouter } from '@/features/posts/server/routers';

export const appRouter = createTRPCRouter({
  hello: baseProcedure.query((opts) => {
    return {
      greeting: `hello world!`,
    };
  }),

  getUsers: protectedProcedure.query(async (opts) => {
    return db.query.user.findMany({});
  }),

  posts: postsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
