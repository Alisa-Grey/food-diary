import { useQuery } from 'react-query';

import { apiService } from '../apiService';
import type { FilledDaysResponse, MonthlyAnalyticsResponse } from '../types';

export const useGetMonthlyAnalytics = (date: string | undefined, isDisabled?: boolean) => {
  return useQuery(
    ['monthlyAnalytics', date, isDisabled],
    () =>
      apiService<MonthlyAnalyticsResponse>({
        method: 'GET',
        path: `/getAnalitics?date=${date}`,
      }),
    { refetchOnWindowFocus: false, retry: 1, enabled: !isDisabled && !!date },
  );
};

export const useGetFilledDays = (date: string, isDisabled?: boolean) => {
  return useQuery(
    ['filledDays', date, isDisabled],
    () =>
      apiService<FilledDaysResponse>({
        method: 'GET',
        path: `/getFilledDaysList?date=${date}`,
      }),
    {
      enabled: !isDisabled,
    },
  );
};
