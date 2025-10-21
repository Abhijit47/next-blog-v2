'use client';

import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSuspencePost } from '../hooks/use-posts';

export default function PostCard({ postId }: { postId: string }) {
  const { data } = useSuspencePost(postId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 className={'text-lg font-medium'}>{data.title}</h2>
        </CardTitle>

        <CardAction>
          <Badge>
            Updated On:{' '}
            {formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true })}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{data.content}</p>
      </CardContent>

      <CardFooter>
        <Link
          className={buttonVariants({
            variant: 'link',
            className: 'w-full',
          })}
          href='/posts'
          prefetch>
          Go to posts
        </Link>
      </CardFooter>
    </Card>
  );
}
