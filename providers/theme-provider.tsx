'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

/**
 * Wraps children in the underlying next-themes provider to supply theme context.
 *
 * @returns A React element rendering `NextThemesProvider` with the provided props and children.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}