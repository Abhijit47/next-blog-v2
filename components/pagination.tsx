import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from './ui/item';
import { Spinner } from './ui/spinner';

interface PaginationProps {
  disabled?: boolean;
  totalPages: number;
  page: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  disabled,
  totalPages,
  page,
  onPageChange,
}: PaginationProps) {
  return (
    <div className='flex w-full'>
      <Item variant='outline' className={'w-full'}>
        <ItemContent>
          <ItemTitle>
            No of Pages: <strong>{totalPages}</strong>
          </ItemTitle>
          <ItemDescription>Now showing page {page}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            disabled={page === 1 || disabled}
            variant={'outline'}
            size={'sm'}
            onClick={() => onPageChange(Math.max(1, page - 1))}>
            {disabled ? (
              <span className={'inline-flex items-center gap-2'}>
                <Spinner /> Prev
              </span>
            ) : (
              <span className={'inline-flex items-center gap-2'}>
                <ArrowLeftCircleIcon className={'size-4'} /> Prev
              </span>
            )}
          </Button>
          <Button
            disabled={page === totalPages || totalPages === 0 || disabled}
            variant={'outline'}
            size={'sm'}
            onClick={() => {
              onPageChange(Math.min(totalPages, page + 1));
            }}>
            {disabled ? (
              <span className={'inline-flex items-center gap-2'}>
                Next <Spinner />
              </span>
            ) : (
              <span className={'inline-flex items-center gap-2'}>
                Next <ArrowRightCircleIcon className={'size-4'} />
              </span>
            )}
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}
