import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { headers } from 'next/headers';
import { cache } from 'react';
import superjson from 'superjson';

import { auth } from '@/lib/auth/server';
import { initTRPC, TRPCError } from '@trpc/server';

// export const createContext = async (opts: CreateNextContextOptions) => {
//   const session = await auth.api.getSession({ headers: await headers() });
//   return {
//     session,
//   };
// };

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

export const createTRPCContext = cache(
  async (opts: CreateNextContextOptions) => {
    /**
     * @see: https://trpc.io/docs/server/context
     */
    // const session = await auth.api.getSession({ headers: await headers() });
    return { session: 'User123' };
  }
);
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  // console.log('Session in tRPC protectedProcedure:', session);

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource.',
    });
  }

  return next({ ctx: { ...ctx, auth: session } });
});
export const protect = baseProcedure.use(
  t.middleware(async ({ ctx, next }) => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to access this resource.',
      });
    }

    return next({ ctx: { ...ctx, auth: session } });
  })
);
