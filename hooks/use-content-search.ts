import { PAGINATION } from '@/constants';
import { useEffect, useState } from 'react';

interface ContentSearchProps<T extends { q: string; page: number }> {
  params: T;
  setParams: (newParams: T) => void;
  debounceMs?: number;
}

export function useContentSearch<T extends { q: string; page: number }>({
  params,
  setParams,
  debounceMs = 500,
}: ContentSearchProps<T>) {
  const [localQuery, setLocalQuery] = useState(params.q);

  // 2. Effect to debounce and update params.q
  useEffect(() => {
    if (localQuery === '' && params.q !== '') {
      setParams({
        ...params,
        q: '',
        page: PAGINATION.DEFAULT_PAGE,
      });
      return;
    }

    const timer = setTimeout(() => {
      if (localQuery !== params.q) {
        setParams({
          ...params,
          q: localQuery,
          // reset to first page on new search
          page: PAGINATION.DEFAULT_PAGE,
        });
        return;
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localQuery, params, setParams, debounceMs]);

  // 1. Effect to sync localQuery with params.q
  useEffect(() => {
    setLocalQuery(params.q);
  }, [params.q]);

  return {
    searchValue: localQuery,
    onSearchValue: setLocalQuery,
  };
}
