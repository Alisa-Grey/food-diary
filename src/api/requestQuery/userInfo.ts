// src/hooks/useUserData.ts
import { useMutation, useQuery } from 'react-query';

import { apiService } from '@/api/apiService';

import type {
  BasicResponse,
  CheckNormChangedResponse,
  EditProfileRequest,
  GetUserDataResponse,
  GetWaterResponse,
  RegisterData,
  SendQuestionaryData,
  UpdateWeightRequest,
  UserData,
  UserDayNormData,
  UserDayNormDataResponse,
  WaterRequest,
  WaterResponse,
} from '../types';

export const useAuthCheck = () => {
  return useQuery<{ code: string }>(
    'authCheck',
    () => apiService({ method: 'GET', path: '/checkAuthorization' }),
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );
};

export const useUserData = () => {
  return useQuery(
    'user',
    () => apiService<GetUserDataResponse>({ method: 'GET', path: '/getUser' }),
    {
      retry: false,
      refetchOnMount: false,
      select: response => response.data,
    },
  );
};

export const useLoginUser = () => {
  return useMutation(
    (userData: RegisterData): Promise<BasicResponse> =>
      apiService<BasicResponse, RegisterData>({
        method: 'POST',
        path: '/login',
        body: userData,
      }),
  );
};

export const useRegisterUser = () => {
  return useMutation(
    (newUser: RegisterData): Promise<BasicResponse> =>
      apiService<BasicResponse, RegisterData>({
        method: 'POST',
        path: '/register',
        body: newUser,
      }),
  );
};

export const useLogoutUser = () => {
  return useMutation(
    (): Promise<BasicResponse> =>
      apiService({
        method: 'GET',
        path: '/logout',
      }),
  );
};

export const useSendQuestionaryData = () => {
  return useMutation(
    (userData: UserData): Promise<SendQuestionaryData> =>
      apiService({
        method: 'POST',
        path: '/saveUserData',
        body: userData,
      }),
  );
};

export const useGetUserDayNorm = (params?: UserDayNormData, isDisabled?: boolean) => {
  return useQuery(
    ['userDayNorm', params, isDisabled],
    () =>
      apiService<UserDayNormDataResponse>({
        method: 'GET',
        path: params
          ? `/getDailyNorm?date=${params.date}&goal=${params.goal}&physical_activity=${params.physicalActivity}`
          : '/getDailyNorm',
      }),
    {
      retry: false,
      enabled: !isDisabled,
    },
  );
};

export const useGetUserWater = (date: string, isDisabled?: boolean) => {
  return useQuery(
    ['useGetWater', date],
    () => apiService<GetWaterResponse>({ method: 'GET', path: `/getWater?date=${date}` }),
    { retry: false, enabled: !isDisabled },
  );
};

export const useAddUserWater = () => {
  return useMutation(
    (water: WaterRequest): Promise<WaterResponse> =>
      apiService({ method: 'POST', path: '/setWater', body: water }),
  );
};

export const useDeleteUserWater = () => {
  return useMutation(
    (date: string): Promise<WaterResponse> =>
      apiService({ method: 'DELETE', path: `/deleteWater?date=${date}` }),
  );
};

export const useEditProfile = () => {
  return useMutation(
    (payload: EditProfileRequest): Promise<BasicResponse> =>
      apiService({
        method: 'POST',
        contentType: 'multipart/form-data',
        path: '/updateUserData',
        body: payload,
      }),
  );
};

export const useConfirmWeight = () => {
  return useMutation(
    (payload: { date: string }): Promise<BasicResponse> =>
      apiService({ method: 'POST', path: '/setWeight', body: payload }),
  );
};

export const useSetFinalWeight = () => {
  return useMutation(
    (payload: UpdateWeightRequest): Promise<BasicResponse> =>
      apiService({ method: 'POST', path: '/updateWeight', body: payload }),
  );
};

export const useCheckNormChanged = (mealDate: string) => {
  return useQuery(
    ['normChanged', mealDate],
    () =>
      apiService<CheckNormChangedResponse>({
        method: 'GET',
        path: `/checkDailyNormChanged?date=${mealDate}`,
      }),
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );
};
