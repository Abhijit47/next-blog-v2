import { useTRPC } from '@/trpc/client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * Hook to fetch all posts.
 */
export function useSuspencePosts() {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.posts.getAll.queryOptions());
}

/**
 * Hook to fetch a single post by ID.
 */
export function useSuspencePost(id: string) {
  const trpc = useTRPC();

  return useSuspenseQuery(
    trpc.posts.getOne.queryOptions({
      id,
    })
  );
}

/**
 * Hook to create a post.
 */
export function useCreatePost() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.posts.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Post "${data.title}" created successfully`);
        queryClient.invalidateQueries(trpc.posts.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(`Error creating post: ${error.message}`);
      },
    })
  );
}

/**
 * Hook to delete a post.
 */
export function useRemovePost() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.posts.remove.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Post deleted successfully`);
        queryClient.invalidateQueries(trpc.posts.getAll.queryOptions());
        queryClient.invalidateQueries(
          trpc.posts.getOne.queryOptions({
            id: data[0].id,
          })
        );
      },
      onError: (error) => {
        toast.error(`Error deleting post: ${error.message}`);
      },
    })
  );
}

/**
 * Hook to update a post.
 */
export function useUpdatePost() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.posts.update.mutationOptions({
      onSuccess: (_, variables) => {
        toast.success(`Post updated successfully`);
        queryClient.invalidateQueries(trpc.posts.getAll.queryOptions());
        queryClient.invalidateQueries(
          trpc.posts.getOne.queryOptions({
            id: variables.postId,
          })
        );
      },
      onError: (error) => {
        toast.error(`Error updating post: ${error.message}`);
      },
    })
  );
}
