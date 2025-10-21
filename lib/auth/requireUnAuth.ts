'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from './server';

export async function requireUnAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/');
  }
}
