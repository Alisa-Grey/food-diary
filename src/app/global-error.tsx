'use client';
import { ErrorJSInternal } from '@/screens/Errors/ErrorJSInternal';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body>
        <ErrorJSInternal onReset={reset} />;
      </body>
    </html>
  );
}
