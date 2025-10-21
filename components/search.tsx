import { SearchIcon } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';

interface SearchProps {
  count: number;
  searchValue: string;
  onSearchValue: (value: string) => void;
}

export default function Search({
  count,
  searchValue,
  onSearchValue,
}: SearchProps) {
  return (
    <div className={'max-w-md mx-auto'}>
      <InputGroup>
        <InputGroupInput
          placeholder='Search...'
          type='search'
          value={searchValue}
          onChange={(e) => onSearchValue(e.target.value)}
        />
        <InputGroupAddon>
          <SearchIcon className={'size-4'} />
        </InputGroupAddon>
        <InputGroupAddon align='inline-end'>{count} results</InputGroupAddon>
      </InputGroup>
    </div>
  );
}
