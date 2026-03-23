'use client';
import 'react-calendar/dist/Calendar.css';

import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useMediaQuery } from 'usehooks-ts';

import { useGetCountedNutrients, useGetUserMeals } from '@/api/requestQuery/mealsInfo';
import {
  useCheckNormChanged,
  useConfirmWeight,
  useGetUserDayNorm,
  useGetUserWater,
  useSetFinalWeight,
  useUserData,
} from '@/api/requestQuery/userInfo';
import type {
  MacronutrientNormsProps,
  PortionNormsProps,
} from '@/api/transformers/nutrientsDataTransformer';
import { nutrientsNormsTransformer } from '@/api/transformers/nutrientsDataTransformer';
import type { Meal } from '@/api/types';
import { UserFieldsList } from '@/api/types';
import { NutritionNormsList } from '@/api/types';
import PencilIcon from '@/assets/icons/PencilIcon';
import SettingsIcon from '@/assets/icons/SettingsIcon';
import { RoutesList } from '@/components/AuthCheck/AuthCheck';
import Box, { PageContainer } from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { SingleButtonWrap } from '@/components/ButtonWrap/SingleButtonWrap';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { NutrientsRecommendationsSection } from '@/components/NutrientsRecommendationsSection/NutrientsRecommendationsSection';
import { TextBlock } from '@/components/TextBlock/TextBlock';
import { TextHighlight } from '@/components/TextHighlight/TextHighlight';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import Wrapper from '@/components/Wrapper/Wrapper';
import useCalendarContext from '@/hooks/useCalendarContext';
import text from '@/locales/translation.json';
import { BasicPopup } from '@/popups/BasicPopup/BasicPopup';
import { useAppSelector } from '@/store';
import theme from '@/styles/theme/theme';
import { clearLocalStorage, formatMonthName, getLastMonth } from '@/utils/helpers';
import { Calories } from '@/widgets/Calories/Calories';
import { Header } from '@/widgets/Header/Header';
import { MealsCarousel } from '@/widgets/MealsCarousel/MealsCarousel';
import { Navbar } from '@/widgets/Navbar/Navbar';
import { WaterCounter } from '@/widgets/WaterCounter/WaterCounter';

import { checkIsCurrent } from '../Analytics/helpers';
import type { FormProps } from './components/AddWeightPopup';
import { AddWeightPopup } from './components/AddWeightPopup';

export enum PopupStateList {
  confirmWeight = 'confirmWeight',
  newNorms = 'newNorms',
  weightForm = 'weightForm',
  isLower = 'isLower',
  isHigher = 'isHigher',
}

export function Diary() {
  const { diaryScreen, monthlyWeightPopups } = text;
  const { confirmation, newNorms, confirmButton } = monthlyWeightPopups;
  const { buttons } = confirmation;
  const [primaryButton, secondaryButton] = buttons;

  const dateNow = moment(new Date()).format('YYYY-MM-DD');
  const user = useAppSelector(store => store.user);
  const { date } = useCalendarContext();
  const router = useRouter();
  const isSmallWidth = useMediaQuery(`(max-width: ${theme.screenSizes.tablet})`);

  useCheckNormChanged(date);
  const { data: dailyNorm } = useGetUserDayNorm({
    date: dateNow,
    goal: user.goal,
    physicalActivity: +user[UserFieldsList.physicalActivity],
  });
  const { data: mealsData } = useGetUserMeals(date);
  const { data: countedNutrients, isError: isCountedNutrientsError } = useGetCountedNutrients(date);
  const confirmSavedWeight = useConfirmWeight();
  const newUserWeight = useSetFinalWeight();
  const queryClient = useQueryClient();
  const { isLoading, isError } = useUserData();
  const { data: currentWater } = useGetUserWater(date);

  const [userMeals, setUserMeals] = useState<Meal[]>([]);
  const [popupState, setPopupState] = useState<PopupStateList | null>(null);
  const [nutrientsNorms, setNutrientsNorms] = useState<
    PortionNormsProps | MacronutrientNormsProps
  >();

  const lastMonth = getLastMonth(new Date());
  const monthNum = moment(new Date()).month();
  const monthName = formatMonthName(monthNum + 1);

  const confirmWeightTitle = `${confirmation.title} ${lastMonth}`;
  const normPopupTitle = `${newNorms.title} ${monthName}`;

  useEffect(() => {
    if (dailyNorm) {
      setNutrientsNorms(
        nutrientsNormsTransformer({
          dailyNorms: dailyNorm.data,
          isMacronutrientsViewEnabled: user[UserFieldsList.isMacronutrientsViewEnabled],
        }),
      );
    }
  }, [dailyNorm, user]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      clearLocalStorage(['wasChanged']);
    }

    const isRegistrationDate = checkIsCurrent(
      new Date(user[UserFieldsList.registrationDate]),
      'day',
    );

    if (!isRegistrationDate) {
      setPopupState(user[UserFieldsList.isWeightConfirmed] ? null : PopupStateList.confirmWeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mealsData?.data) {
      setUserMeals(mealsData.data);
    }
  }, [mealsData]);

  if (isError || isLoading) {
    return null;
  }

  const closePopup = () => {
    setPopupState(null);
  };

  const handleSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ['userData'] });
    await queryClient.invalidateQueries({ queryKey: ['userDayNorm'] });
    setPopupState(PopupStateList.newNorms);
  };

  const submitWeight: SubmitHandler<FormProps | FieldValues> = (data: FormProps | FieldValues) => {
    newUserWeight.mutate(
      {
        weight: +data.weight,
        date: dateNow,
      },
      {
        onSuccess: async () => {
          await handleSuccess();
        },
      },
    );

    closePopup();
  };

  const confirmWeight = () => {
    confirmSavedWeight.mutate(
      { date: dateNow },
      {
        onSuccess: async () => {
          await handleSuccess();
        },
      },
    );
  };

  return (
    <PageContainer
      position="relative"
      $justifyContent="space-between"
      $alignItems="center"
      background={theme.colors.lightGray}
    >
      <Wrapper
        width="100%"
        $justifyContent="flex-start"
        $minHeight={isSmallWidth ? '90%' : '100vh'}
        margin={`0 0 ${theme.gapSizes.gap24}`}
      >
        <Box
          dataname="inner-wrap"
          width="100%"
          height="100%"
          flexdirection="column"
          $justifyContent="center"
          $alignItems="center"
          background={theme.colors.lightGray}
          position="relative"
        >
          <Header
            actions={
              <Button variant="text" $borderRadius="50%">
                <SettingsIcon />
              </Button>
            }
          />
          <Wrapper
            flexdirection="column"
            $justifyContent="flex-start"
            background={theme.colors.lightGray}
            gap={theme.gapSizes.gap8}
            padding={`${theme.gapSizes.gap8} 0 0`}
            dataname="main"
          >
            {nutrientsNorms && (
              <>
                {countedNutrients?.data && (
                  <Calories
                    isMacronutrientsViewEnabled={user[UserFieldsList.isMacronutrientsViewEnabled]}
                    dailyNorms={nutrientsNorms}
                    currentDayNutrients={countedNutrients.data}
                  />
                )}
                {isCountedNutrientsError && (
                  <WhiteBox>
                    <ErrorMessage>{diaryScreen.nothingFound}</ErrorMessage>
                  </WhiteBox>
                )}
                {dailyNorm && currentWater && (
                  <WaterCounter
                    currentWater={currentWater.data.waterGlassNum}
                    waterNorm={dailyNorm.data[NutritionNormsList.waterNorm]}
                  />
                )}
                {countedNutrients?.data && (
                  <MealsCarousel
                    mealsData={userMeals.filter(meal => meal.products.length > 0)}
                    isMacronutrientsViewEnabled={user[UserFieldsList.isMacronutrientsViewEnabled]}
                    icon={<PencilIcon />}
                    onClick={() => router.push(RoutesList.diary)}
                  />
                )}
              </>
            )}
          </Wrapper>
        </Box>
      </Wrapper>
      <Navbar />
      {popupState === PopupStateList.confirmWeight && (
        <BasicPopup
          isOpened={!!popupState}
          title={confirmWeightTitle}
          contentSection={
            <Box $alignItems="center">
              <TextBlock
                text={[
                  confirmation.description[0] as string,
                  confirmation.description[1] as string,
                ]}
                fontWeight={400}
              >
                <TextHighlight fontWeight={500}>{user.weight}</TextHighlight>
              </TextBlock>
            </Box>
          }
          actions={
            <Box width="100%" $justifyContent="space-between" gap={theme.gapSizes.gap16}>
              <Box flexbasis="50%" flexdirection="column" $alignItems="stretch">
                <Button
                  variant="secondary"
                  onClick={() => setPopupState(PopupStateList.weightForm)}
                >
                  {secondaryButton}
                </Button>
              </Box>
              <Box flexbasis="50%" flexdirection="column" $alignItems="stretch">
                <Button variant="primary" onClick={confirmWeight}>
                  {primaryButton}
                </Button>
              </Box>
            </Box>
          }
          onClose={closePopup}
        />
      )}
      {popupState === PopupStateList.weightForm && (
        <AddWeightPopup
          userWeight={user.weight}
          isOpened={!!popupState}
          onClose={closePopup}
          onSubmit={submitWeight}
        />
      )}
      {popupState === PopupStateList.newNorms && nutrientsNorms && (
        <BasicPopup
          isOpened={!!popupState}
          title={normPopupTitle}
          contentSection={
            <NutrientsRecommendationsSection
              dailyNorms={nutrientsNorms}
              isMacronutrientsViewEnabled={user[UserFieldsList.isMacronutrientsViewEnabled]}
              padding="0px"
            />
          }
          actions={
            <SingleButtonWrap>
              <Button variant="primary" onClick={closePopup}>
                {confirmButton}
              </Button>
            </SingleButtonWrap>
          }
          onClose={closePopup}
        />
      )}
    </PageContainer>
  );
}
