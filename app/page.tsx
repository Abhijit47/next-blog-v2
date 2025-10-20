import { ClientGreeting } from '@/components/client-greeting';
import LogoutButton from '@/components/logout-button';

export default function Home() {
  return (
    <div>
      <ClientGreeting />
      <LogoutButton />
    </div>
  );
}
