import { ClientGreeting } from '@/components/client-greeting';
import LogoutButton from '@/components/logout-button';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';
import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function Home() {
  const rpc = trpc;

  prefetch(rpc.hello.queryOptions());

  return (
    <div>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading greeting...</div>}>
            <ClientGreeting />
          </Suspense>
          <LogoutButton />
          <Link href={'/posts'} prefetch>
            Posts
          </Link>
        </ErrorBoundary>
      </HydrateClient>
    </div>
  );
}
