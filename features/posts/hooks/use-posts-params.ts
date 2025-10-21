import { useQueryStates } from 'nuqs';
import { postsParams } from '../searchParams';

export function usePostsParams() {
  return useQueryStates(postsParams);
}
