import {
  PostContainer,
  PostHeader,
  Posts,
} from '@/features/posts/components/posts';
import { postsSearchParamsLoader } from '@/features/posts/server/params-loader';
import { prefetchPosts } from '@/features/posts/server/prefetch';
import { requireAuth } from '@/lib/auth/requireAuth';
import { HydrateClient } from '@/trpc/server';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function PostPage({ searchParams }: PageProps) {
  await requireAuth();

  // const users = await caller.getUsers();
  const params = await postsSearchParamsLoader(searchParams);

  prefetchPosts(params);

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
