'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from './server';

export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  return session;
}
