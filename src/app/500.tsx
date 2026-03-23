import { ErrorServerSide } from '@/screens/Errors/ErrorServerSide';

export default function Custom500({ reset }: { reset: () => void }) {
  return <ErrorServerSide onReset={reset} />;
}
