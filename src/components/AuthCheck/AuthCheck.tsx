/* eslint-disable @typescript-eslint/naming-convention */
'use client';
import moment from 'moment';
import { redirect, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useUserData } from '@/api/requestQuery/userInfo';
import CalendarContext from '@/app/calendar-context';
import { useAppDispatch, useAppSelector } from '@/store';
import { setAuthState } from '@/store/reducer/authSlice';
import { setUser } from '@/store/reducer/userSlice';
import { checkIfObjectValuesEmpty } from '@/utils/helpers';

import Box from '../Box/Box';
import { PreloaderCircular } from '../Preloader/Prealoader';

export enum RoutesList {
  login = '/login',
  registration = '/registration',
  diary = '/diary',
  questionary = '/questionary',
  profile = '/profile',
  editProfile = '/edit-profile',
  mealByDay = '/meal/date',
  analytics = '/analytics',
}

const protectedRoutes = [
  RoutesList.questionary,
  RoutesList.diary,
  RoutesList.profile,
  RoutesList.editProfile,
  RoutesList.mealByDay,
];

const publicRoutes = [RoutesList.login, RoutesList.registration];

export const emptySearchParams = {
  searchString: '',
  isRecomended: false,
  isUnrecomendedTurnedOff: false,
};

export const AuthCheck = (props: { children: React.ReactNode }): React.ReactNode => {
  const pathname = usePathname();
  const { data: userData, error } = useUserData();

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user);

  const dateNow = moment(new Date()).format('YYYY-MM-DD');

  const [date, setDate] = useState(dateNow);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (typeof userData !== 'undefined') {
      setIsSuccess(true);
      dispatch(setAuthState(true));
      dispatch(setUser({ ...userData }));
    }
  }, [userData, dispatch, error]);

  if (!isSuccess && !error) {
    return (
      <Box
        width="100%"
        flexbasis="20%"
        $justifyContent="center"
        $alignItems="center"
        dataname="animation-wrap"
      >
        <PreloaderCircular />
      </Box>
    );
  }

  const userNeccessaryData = (({
    name,
    lastname,
    birthdate,
    gender,
    height,
    weight,
    physical_activity,
  }) => ({
    name,
    lastname,
    birthdate,
    gender,
    height,
    weight,
    physical_activity,
  }))(user);

  if (
    !isSuccess &&
    protectedRoutes.includes(RoutesList[pathname.split('/')[1] as keyof typeof RoutesList])
  ) {
    redirect(RoutesList.login);
  }

  if (
    isSuccess &&
    publicRoutes.includes(RoutesList[pathname.split('/')[1] as keyof typeof RoutesList])
  ) {
    checkIfObjectValuesEmpty(userNeccessaryData)
      ? redirect(RoutesList.questionary)
      : redirect(RoutesList.diary);
  }

  return (
    <CalendarContext.Provider value={{ date, setDate }}>{props.children}</CalendarContext.Provider>
  );
};
