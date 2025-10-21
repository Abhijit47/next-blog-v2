import PostCard from '@/features/posts/components/post';
import { PostContainer } from '@/features/posts/components/posts';
import { prefetchPost } from '@/features/posts/server/prefetch';
import { requireAuth } from '@/lib/auth/requireAuth';
import { HydrateClient } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type PageProps = {
  params: Promise<{ postId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PostPage({ params }: PageProps) {
  await requireAuth();

  const postId = (await params).postId;

  prefetchPost(postId);

  return (
    <div>
      <PostContainer>
        <HydrateClient>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Suspense fallback={<div>Loading post...</div>}>
              <PostCard postId={postId} />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </PostContainer>
    </div>
  );
}
