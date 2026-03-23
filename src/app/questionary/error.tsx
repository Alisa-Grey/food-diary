'use client';
import { ErrorJSInternal } from '@/screens/Errors/ErrorJSInternal';

export default function Error({ reset }: { reset: () => void }) {
  return <ErrorJSInternal onReset={reset} />;
}
