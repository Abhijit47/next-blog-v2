'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import {
  ArrowLeftCircle,
  ArrowLeftCircleIcon,
  ArrowRightCircle,
  FileEditIcon,
  NotebookPenIcon,
  PencilLine,
  PenLine,
  SendHorizontal,
  Trash2Icon,
} from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Textarea } from '@/components/ui/textarea';
import { SelectPost } from '@/drizzle/schemas';

import {
  useCreatePost,
  useRemovePost,
  useSuspencePosts,
  useUpdatePost,
} from '../hooks/use-posts';

export function Posts() {
  const { data: posts } = useSuspencePosts();

  return (
    <div className={'space-y-4'}>
      <Card className={'gap-4'}>
        <CardContent
          className={
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
          }>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </CardContent>

        <CardFooter>
          <PostPagination />
        </CardFooter>
      </Card>
    </div>
  );
}

export function PostCard({ post }: { post: SelectPost }) {
  return (
    <Card key={post.id} className='mb-4'>
      <CardHeader>
        <CardTitle>
          <h2 className={'line-clamp-1'}>{post.title}</h2>
        </CardTitle>

        <PostActions post={post} postId={post.id} />
      </CardHeader>
      <Separator />

      <CardContent>
        <CardDescription>
          <p className={'line-clamp-4'}>{post.content}</p>
        </CardDescription>
      </CardContent>

      <Separator />
      <CardAction className={'w-full'}>
        <CardFooter>
          <Link
            className={buttonVariants({
              variant: 'default',
              className: 'w-full',
              size: 'sm',
            })}
            href={`/posts/${post.id}`}>
            Know more <SendHorizontal className='size-4 -rotate-45' />
          </Link>
        </CardFooter>
      </CardAction>
    </Card>
  );
}

export function PostHeader() {
  const { mutate, isPending } = useCreatePost();
  return (
    <Card className={'gap-4 py-4'}>
      <CardHeader>
        <CardTitle>
          <h1 className={'text-lg font-medium flex items-center gap-2'}>
            Posts
            <NotebookPenIcon className={'size-4'} />
          </h1>
        </CardTitle>
        <CardDescription>
          <p className={'text-muted-foreground'}>A list of all your posts.</p>
        </CardDescription>

        <CardAction className={'self-center flex flex-col gap-2'}>
          <Button
            size={'sm'}
            disabled={isPending}
            onClick={() => {
              mutate(undefined, {
                onSuccess: (data) => {
                  toast.success(`Post "${data.title}" created successfully`);
                },
                onError: (error) => {
                  toast.error(`Error creating post: ${error.message}`);
                },
              });
            }}>
            {isPending ? (
              <span className={'inline-flex items-center gap-2'}>
                Creating... <Spinner className={'size-4'} />
              </span>
            ) : (
              <span className={'inline-flex items-center gap-2'}>
                Create Post <FileEditIcon className={'size-4'} />
              </span>
            )}
          </Button>
          <Link
            href={'/'}
            className={buttonVariants({
              variant: 'link',
              size: 'sm',
            })}>
            <ArrowLeftCircleIcon className={'size-4'} />
            Go Back
          </Link>
        </CardAction>
      </CardHeader>
    </Card>
  );
}

export const PostContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={'max-w-[85em] mx-auto py-8 space-y-12 px-4'}>
      {children}
    </section>
  );
};

export function PostActions({
  post,
  postId,
}: {
  post: SelectPost;
  postId: string;
}) {
  return (
    <CardAction className={'flex gap-2'}>
      <PostUpdateDialog post={post} postId={postId} />
      <PostDeleteAlertDialog postId={postId} />
    </CardAction>
  );
}

export const PostPagination = () => {
  return (
    <div className='flex w-full'>
      <Item variant='outline' className={'w-full'}>
        <ItemContent>
          <ItemTitle>
            No of Pages: <strong>10</strong>
          </ItemTitle>
          <ItemDescription>Now showing page 1</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant='outline' size='sm'>
            <ArrowLeftCircle className={'size-4'} />
            Prev
          </Button>
          <Button variant='outline' size='sm'>
            Next <ArrowRightCircle className={'size-4'} />
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
};

export function PostUpdateDialog({
  post,
  postId,
}: {
  post: SelectPost;
  postId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    title: post.title,
    content: post.content,
  });
  const { mutate, isPending } = useUpdatePost();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='icon-sm' variant={'outline'}>
          <PencilLine className={'size-4'} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className='flex items-center gap-2'>
              Edit post
              <PenLine className={'size-4'} />
            </p>
          </DialogTitle>
          <DialogDescription>
            Make changes to your post here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4'>
          <div className='grid gap-3'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              name='title'
              defaultValue={post.title}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='content'>Content</Label>
            <Textarea
              id='content'
              name='content'
              defaultValue={post.content}
              className='min-h-[120px] h-full resize-none'
              onChange={(e) =>
                setValues((prev) => ({ ...prev, content: e.target.value }))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type='submit'
            disabled={isPending}
            onClick={() =>
              mutate(
                {
                  postId,
                  title: values.title,
                  content: values.content,
                },
                {
                  onSuccess: () => {
                    setIsOpen(false);
                  },
                }
              )
            }>
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function PostDeleteAlertDialog({ postId }: { postId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useRemovePost();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button size='icon-sm' variant={'destructive'}>
          <Trash2Icon className={'size-4'} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={isPending}
              variant='destructive'
              onClick={() => {
                mutate({ id: postId });
                setIsOpen(false);
              }}>
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
