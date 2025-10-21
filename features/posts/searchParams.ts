import { parseAsInteger, parseAsString } from 'nuqs/server';

import { PAGINATION } from '@/constants/index';

export const postsParams = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
  q: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
};
export type PostsSearchParams = typeof postsParams;
