import { createLoader } from 'nuqs/server';
import { postsParams } from '../searchParams';

export const postsSearchParamsLoader = createLoader(postsParams);
