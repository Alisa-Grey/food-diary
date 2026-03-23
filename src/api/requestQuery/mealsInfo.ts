import { useMutation, useQuery } from 'react-query';

import { apiService } from '../apiService';
import type {
  BasicResponse,
  GetCountedNutrientsResponse,
  GetUsersMealByIdResponse,
  GetUsersMealsResponse,
  SetMealTimeRequest,
} from '../types';

export const useGetUserMeals = (mealDate: string, isDisabled?: boolean) => {
  return useQuery(
    ['userMeals', mealDate, isDisabled],
    () =>
      apiService<GetUsersMealsResponse>({
        method: 'GET',
        path: `/getMeals?date=${mealDate}`,
      }),
    { refetchOnWindowFocus: false, retry: 1, enabled: !isDisabled },
  );
};

export const useGetUserMealById = () => {
  return useMutation(
    (mealId: string): Promise<GetUsersMealByIdResponse> =>
      apiService({
        method: 'GET',
        path: `/getMeal?id=${mealId}`,
      }),
  );
};

export const useGetCountedNutrients = (mealDate: string, isDisabled?: boolean) => {
  return useQuery(
    ['countedNutrients', mealDate, isDisabled],
    () =>
      apiService<GetCountedNutrientsResponse>({
        method: 'GET',
        path: `/getCountedData?date=${mealDate}`,
      }),
    { refetchOnWindowFocus: false, retry: 1, enabled: !isDisabled },
  );
};

export const useSetUserMealTime = () => {
  return useMutation(
    (payload: SetMealTimeRequest): Promise<BasicResponse> =>
      apiService({ method: 'POST', path: '/setMealTime', body: payload }),
  );
};
