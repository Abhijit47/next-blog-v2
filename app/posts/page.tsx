import {
  PostContainer,
  PostHeader,
  Posts,
} from '@/features/posts/components/posts';
import { requireAuth } from '@/lib/auth/requireAuth';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default async function PostPage() {
  await requireAuth();

  // const users = await caller.getUsers();

  prefetch(trpc.posts.getAll.queryOptions());

  return (
    <PostContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading posts...</div>}>
            <PostHeader />
            <Posts />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </PostContainer>
  );
}
