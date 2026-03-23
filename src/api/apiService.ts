/* eslint-disable @typescript-eslint/naming-convention */

import type { ErrorProps } from './types';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type ContentType = 'application/json' | 'multipart/form-data';

interface RequestConfig<TBody> {
  method: RequestMethod;
  path: string;
  body?: TBody;
  customHeaders?: HeadersInit;
  contentType?: ContentType;
}

class ErrorWithStatus extends Error {
  code?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiService = async <TResponse, TBody = undefined>({
  method,
  path,
  body,
  contentType,
  customHeaders = {},
}: RequestConfig<TBody>): Promise<TResponse> => {
  const headers: HeadersInit =
    contentType === 'application/json'
      ? {
          'Content-Type': contentType,
          ...customHeaders,
        }
      : {
          ...customHeaders,
        };

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  if (body) {
    if (contentType === 'multipart/form-data') {
      const formData = new FormData();
      const data = Object.entries(body);

      data.forEach(item =>
        Array.isArray(item[1]) && item[1][0] instanceof File
          ? item[1].forEach(subitem => formData.append(`${item[0]}[]`, subitem as Blob))
          : formData.append(item[0], item[1] as Blob),
      );
      config.body = formData;
    } else {
      config.body = JSON.stringify(body);
    }
  }

  const response = await fetch(`${BASE_URL}${path}`, config);

  if (!response.ok) {
    const responseError: ErrorProps = await response.json();
    const error = new ErrorWithStatus(responseError.message || responseError.error);
    error.code = responseError.code;
    throw error;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.json();
};
