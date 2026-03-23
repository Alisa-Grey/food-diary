'use client';
import 'react-calendar/dist/Calendar.css';

import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useToggle } from 'usehooks-ts';

import { useGetMonthlyAnalytics } from '@/api/requestQuery/analyticsInfo';
import type { AnalyticsData } from '@/api/types';
import { UserFieldsList } from '@/api/types';
import InfoIcon from '@/assets/icons/InfoIcon';
import { RoutesList } from '@/components/AuthCheck/AuthCheck';
import Box, { PageContainer } from '@/components/Box/Box';
import { BackButton, Button } from '@/components/Button/Button';
import { CustomLineChart } from '@/components/CustomLineChart/CustomLineChart';
import { PageLayout } from '@/components/PageLatout/PageLayout';
import { Radiobutton, RadiobuttonVariantsList } from '@/components/Radiobutton/Radiobutton';
import StickyBox from '@/components/StickyBox/StickyBox';
import { Typography } from '@/components/Typography/Typography';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import useCalendarContext from '@/hooks/useCalendarContext';
import text from '@/locales/translation.json';
import { BasicPopup } from '@/popups/BasicPopup/BasicPopup';
import { CalendarPopup } from '@/popups/CalendarPopup/CalendarPopup';
import { useAppSelector } from '@/store';
import theme from '@/styles/theme/theme';
import { createDate, getDaysInMonth, getMonthName } from '@/utils/helpers';

import { DatePicker } from '../Diary/components/DatePicker';

enum FiltersList {
  water = 'water',
  kcal = 'kcal',
  bonus = 'unrecommended_kcal',
  milkPortion = 'milk_portion_num',
  proteinPortion = 'protein_portion_num',
  vegetablePortion = 'vegetable_portion_num',
  starchPortion = 'starch_portion_num',
  fatPortion = 'fat_portion_num',
  fruitPortion = 'fruit_portion_num',
  protein = 'protein',
  fats = 'fats',
  carbs = 'carbs',
}

interface FormProps {
  filter: string;
}

export interface AnalyticsProps {
  isWardAnalytics?: boolean;
  id?: string | null;
}

export function Analytics({ isWardAnalytics, id }: AnalyticsProps) {
  const { analyticsScreen, diaryScreen } = text;
  const [water, calories, bonus, milk, protein, vegetable, starch, fat, fruit] =
    analyticsScreen.filters;
  const [proteins, fats, carbs] = diaryScreen.macronutrientsFull;
  const { infoPopup } = analyticsScreen;

  const user = useAppSelector(store => store.user);

  const macronutrientsTags = [
    { id: FiltersList.kcal, color: theme.colors.nutri, value: calories },
    { id: FiltersList.water, color: theme.colors.water, value: water },
    { id: FiltersList.protein, color: theme.colors.macroProtein, value: proteins },
    { id: FiltersList.fats, color: theme.colors.macroFat, value: fats },
    { id: FiltersList.carbs, color: theme.colors.macroCarbs, value: carbs },
  ];

  const portionsTags = [
    { id: FiltersList.water, color: theme.colors.water, value: water },
    { id: FiltersList.kcal, color: theme.colors.nutri, value: calories },
    { id: FiltersList.bonus, color: theme.colors.darkGray, value: bonus },
    { id: FiltersList.milkPortion, color: theme.colors.milk, value: milk },
    { id: FiltersList.proteinPortion, color: theme.colors.protein, value: protein },
    { id: FiltersList.vegetablePortion, color: theme.colors.vegetables, value: vegetable },
    { id: FiltersList.starchPortion, color: theme.colors.starch, value: starch },
    { id: FiltersList.fatPortion, color: theme.colors.fat, value: fat },
    { id: FiltersList.fruitPortion, color: theme.colors.fruits, value: fruit },
  ];

  const router = useRouter();

  const { date } = useCalendarContext();
  const analyticsStartDate = moment(date).isBefore(user[UserFieldsList.registrationDate])
    ? user[UserFieldsList.registrationDate]
    : date;

  const { data: analyticsData } = useGetMonthlyAnalytics(analyticsStartDate, isWardAnalytics);

  const isMacronutrientsViewEnabled = user[UserFieldsList.isMacronutrientsViewEnabled];
  const filters = isMacronutrientsViewEnabled ? macronutrientsTags : portionsTags;

  const [yAxisValues, setYAxisValues] = useState<number[]>([0, 50, 100, 150, 200]);
  const [currentFilter, setCurrentFilter] = useState<FiltersList | string>();
  const [color, setColor] = useState('transparent');
  const [graphData, setGraphData] = useState<
    { day: string; value: number | string }[] | undefined
  >();
  const [isPopup, togglePopup] = useToggle();
  const [isCalendar, toggleCalendar] = useToggle();

  const { register, control } = useForm<FormProps | FieldValues>();

  // no filters
  const month = moment().format('MM');
  const monthName = getMonthName(month);
  const initialData = getDaysInMonth(new Date());

  const filterData = useCallback((filter: string, data: AnalyticsData[] | undefined) => {
    const mapped = data?.map(el => {
      const day = String(createDate(el.date).getDate());
      return {
        day: day,
        value: el[filter as keyof AnalyticsData],
      };
    });
    return mapped;
  }, []);

  useEffect(() => {
    if (analyticsData && currentFilter) {
      const axisValues: number[] =
        analyticsData.data.axisNumbers[
          currentFilter as keyof typeof analyticsData.data.axisNumbers
        ];
      setYAxisValues(axisValues);
    }
  }, [analyticsData, currentFilter]);

  const getColor = (filter: string) => {
    const item = filters.find(el => el.id === filter);
    return item?.color;
  };

  useEffect(() => {
    if (currentFilter) {
      const filtered = filterData(
        currentFilter,
        analyticsData?.data.graphNumbers as AnalyticsData[],
      );

      setGraphData(filtered);
      setColor(String(getColor(currentFilter)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analyticsData?.data.graphNumbers, currentFilter, isWardAnalytics]);

  const handleBack = () => {
    router.push(RoutesList.profile);
  };

  const goToDiary = () => {
    router.push(RoutesList.diary);
  };

  if (isWardAnalytics && !id) {
    return null;
  }

  const isEmptyLineChart = !currentFilter || (currentFilter && !graphData);

  return (
    <PageContainer>
      <PageLayout>
        <WhiteBox
          dataname="header"
          $borderRadius={`0 0 ${theme.borderRadius.radius20}  ${theme.borderRadius.radius20}`}
        >
          <BackButton onClick={handleBack}>{analyticsScreen.title}</BackButton>
        </WhiteBox>
        <WhiteBox dataname="graph">
          <Box width="100%">
            <DatePicker
              variant="monthly"
              startDate={user[UserFieldsList.registrationDate]}
              onClick={toggleCalendar}
            />
            {!isWardAnalytics && (
              <Button variant="text" padding={theme.gapSizes.gap4} onClick={togglePopup}>
                <InfoIcon />
              </Button>
            )}
          </Box>
          {isEmptyLineChart && (
            <CustomLineChart
              legendText=""
              data={initialData}
              yAxisValues={yAxisValues}
              yAxisUnit="%"
              dataKey=""
              monthName={monthName}
              variant="analytics"
            />
          )}
          {currentFilter && graphData && (
            <CustomLineChart
              legendText=""
              data={graphData}
              yAxisValues={yAxisValues}
              yAxisUnit="%"
              dataKey="value"
              monthName={monthName}
              variant="analytics"
              lineColor={color}
              lineType="linear"
              hasDot={false}
            />
          )}
        </WhiteBox>
        <WhiteBox dataname="filters" margin="0 0 90vh">
          <Box $flexWrap="wrap" gap={theme.gapSizes.gap12}>
            {filters.map(item => (
              <Controller
                key={item.id}
                name="filter"
                control={control}
                render={({ field: { onChange } }) => (
                  <Radiobutton
                    id={item.id}
                    variant={RadiobuttonVariantsList.special}
                    register={register}
                    name="filter"
                    width="max-content"
                    $justifyContent="center"
                    flexbasis="50%"
                    textalign="center"
                    background={item.color}
                    value={item.id}
                    onChange={e => {
                      onChange(e.target.value);
                      setCurrentFilter(e.target.value);
                    }}
                  >
                    {item.value}
                  </Radiobutton>
                )}
              />
            ))}
          </Box>
        </WhiteBox>
        {!isWardAnalytics && (
          <StickyBox position="sticky" width="100%">
            <Button variant="primary" onClick={goToDiary}>
              {analyticsScreen.button}
            </Button>
          </StickyBox>
        )}
      </PageLayout>
      <BasicPopup
        isOpened={isPopup}
        title={infoPopup.title}
        contentSection={
          <Box flexdirection="column" width="100%" gap={theme.gapSizes.gap8}>
            {infoPopup.description.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Typography key={index} color={theme.colors.darkGray}>
                {item}
              </Typography>
            ))}
          </Box>
        }
        actions={
          <Button variant="primary" type="button" onClick={togglePopup}>
            {infoPopup.button}
          </Button>
        }
        onClose={togglePopup}
      />
      <CalendarPopup wardId={Number(id)} isOpened={isCalendar} onClose={toggleCalendar} />
    </PageContainer>
  );
}
