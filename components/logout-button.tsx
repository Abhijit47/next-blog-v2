'use client';

import { signOut } from '@/lib/auth/client';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/login');
            toast.success('Log Out successfully');
          },
          onError: ({ error }) => {
            toast.error(error.message || 'Log out failed');
          },
        },
      });
    });
  };
  return (
    <Button
      size={'sm'}
      variant={'destructive'}
      onClick={handleLogout}
      disabled={isPending}>
      {isPending ? (
        <span className={'inline-flex items-center gap-2'}>
          Logging out... <Spinner />
        </span>
      ) : (
        <span className={'inline-flex items-center gap-2'}>
          Logout <LogOutIcon className={'size-4'} />
        </span>
      )}
    </Button>
  );
}
