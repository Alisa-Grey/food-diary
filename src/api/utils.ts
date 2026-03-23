import type { ErrorProps } from './types';
import { ServerErrorCode } from './variables';

export const checkIfTooManyRequests = (error: ErrorProps | null) => {
  return error?.code === ServerErrorCode.tooManyRequests;
};
