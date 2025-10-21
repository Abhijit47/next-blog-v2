import { db } from '@/drizzle/db';
import { post } from '@/drizzle/schemas';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { faker } from '@faker-js/faker';
import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import z from 'zod';

export const postsRouter = createTRPCRouter({
  create: protectedProcedure
    //   .input(
    //   z.object({
    //     title: z.string().min(5),
    //     content: z.string().min(20),
    //   })
    // )
    .mutation(async ({ ctx, input }) => {
      // Access the authenticated user via ctx.auth.user
      const userId = ctx.auth.user.id;
      const title = faker.book.title();
      const content = faker.lorem.paragraphs(5);
      const [res] = await db
        .insert(post)
        .values({
          title: title,
          content: content,
          authorId: userId,
        })
        .returning({ id: post.id, title: post.title });
      return res;
    }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      const userId = ctx.auth.user.id;
      return db
        .delete(post)
        .where(and(eq(post.id, input.id), eq(post.authorId, userId)))
        .returning({ id: post.id });
    }),
  update: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { postId, title, content } = input;
      const userId = ctx.auth.user.id;
      // Update logic here
      return db
        .update(post)
        .set({
          ...(title && { title }),
          ...(content && { content }),
        })
        .where(and(eq(post.id, postId), eq(post.authorId, userId)));
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.auth.user.id;
      const post = await db.query.post.findFirst({
        where(postTable, { and, eq }) {
          return and(
            eq(postTable.id, input.id),
            eq(postTable.authorId, userId)
          );
        },
      });

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Post with id ${input.id} not found`,
        });
      }

      return post;
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.auth.user.id;
    return db.query.post.findMany({
      where(postTable, { eq }) {
        return eq(postTable.authorId, userId);
      },
      limit: 6,
      orderBy: (postTable, { desc }) => [desc(postTable.createdAt)],
    });
  }),
});
