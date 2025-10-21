import { prefetch, trpc } from '@/trpc/server';
import type { inferInput } from '@trpc/tanstack-react-query';

type Input = inferInput<typeof trpc.posts.getAll>;

/**
 * Prefetch all workflows
 *
 */
export function prefetchPosts(params: Input) {
  return prefetch(trpc.posts.getAll.queryOptions(params));
}

/**
 * Prefetch a single workflow by ID
 */
export function prefetchPost(postId: string) {
  return prefetch(trpc.posts.getOne.queryOptions({ id: postId }));
}
