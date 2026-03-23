import 'swiper/css';

import { useEffect, useState } from 'react';
import Swiper from 'swiper';

import type { Meal } from '@/api/types';
import { MealFieldsList, ProductFieldsList } from '@/api/types';
import CirclesIcon from '@/assets/icons/CirclesIcon';
import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { Divider } from '@/components/Divider/Divider';
import { Row } from '@/components/Flex/Flex';
import { PortionChip } from '@/components/PortionChip/PortionChip';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { Typography } from '@/components/Typography/Typography';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';
import { getMealCalories, getTotalPortionsInMeal } from '@/utils/calculation';
import { getCorrectWordFormByAmount, getProductFullName, getTimeString } from '@/utils/helpers';
import { getNutrientsTextContent } from '@/utils/helpers';
import { maxProductNameLength } from '@/utils/variables';

interface MealCarouselProps {
  mealsData: Meal[];
  isMacronutrientsViewEnabled: boolean;
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function MealsCarousel({
  mealsData,
  isMacronutrientsViewEnabled,
  icon,
  onClick,
}: MealCarouselProps) {
  const { diaryScreen, questionaryFormDailyNorms, units } = text;
  const [mealAt, drinksAt] = diaryScreen.mealsCarouselText;
  const [calories] = questionaryFormDailyNorms.portionName;
  const [proteins, fats, carbohydrates] = diaryScreen.macronutrients;
  const [, , , gramms] = units;

  const [, setValue] = useLocalStorage('mealId', '');
  const [visibleTooltipId, setVisibleTooltipId] = useState('');

  useEffect(() => {
    new Swiper(`.swiper-products`, {
      grabCursor: true,
      slideToClickedSlide: true,
      allowTouchMove: true,
      slidesPerView: 'auto',
    });
    new Swiper('.swiper-portionName', {
      grabCursor: true,
      slideToClickedSlide: true,
      allowTouchMove: true,
      slidesPerView: 'auto',
    });
  }, [mealsData]);

  const toggleTooltip = (e: React.MouseEvent<HTMLButtonElement>) => {
    visibleTooltipId !== e.currentTarget.id
      ? setVisibleTooltipId(e.currentTarget.id)
      : setVisibleTooltipId('');
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setValue(e.currentTarget.id);
    onClick(e);
  };

  const transformToReducedString = (value: string) => {
    return value.trim().length >= maxProductNameLength
      ? `${value.slice(0, maxProductNameLength)}...`
      : value;
  };

  return (
    <Box margin={`0 0 ${theme.gapSizes.gap24}`}>
      {typeof mealsData !== 'undefined' && (
        <Box flexdirection="column" gap={theme.gapSizes.gap16}>
          {mealsData.map(meal => (
            <WhiteBox key={meal[MealFieldsList.mealId]} dataname="carousel-wrap" margin="0">
              <Box
                flexdirection="column"
                $alignItems="stretch"
                gap={theme.gapSizes.gap8}
                width="100%"
                dataname="meal-wrap"
              >
                <Row width="100%" $justifyContent="space-between" $alignItems="center">
                  <Row $alignItems="center" gap={theme.gapSizes.gap8}>
                    {meal.products.length > 0 && getMealCalories(meal.products) === 0 ? (
                      <Typography fontWeight={600} color={theme.colors.black}>
                        {`${drinksAt} ${getTimeString(meal.datetime)}`}
                      </Typography>
                    ) : (
                      <Typography fontWeight={600} color={theme.colors.black}>
                        {`${mealAt} ${getTimeString(meal.datetime)}`}
                      </Typography>
                    )}
                  </Row>
                  <Typography fontSize={theme.fontSizes.fontSize14} color={theme.colors.darkGray}>
                    {meal.products.length}{' '}
                    {meal.products.length > 0 && getMealCalories(meal.products) === 0
                      ? getCorrectWordFormByAmount(meal.products.length, diaryScreen.drinkWordForms)
                      : getCorrectWordFormByAmount(meal.products.length, diaryScreen.dishWordForms)}
                  </Typography>
                </Row>
                <Row
                  width="100%"
                  $justifyContent="flex-start"
                  $alignItems="stretch"
                  gap={theme.gapSizes.gap8}
                  padding={`${theme.gapSizes.gap16} 0`}
                  border={`1px solid ${theme.colors.lightGray}`}
                >
                  <Button
                    variant="primary-soft"
                    id={meal[MealFieldsList.mealId]}
                    className="button-with-outlined-icon"
                    onClick={handleButtonClick}
                  >
                    {icon}
                  </Button>
                  <Row className="swiper swiper-products" width="100%">
                    <Row className="swiper-wrapper" gap={theme.gapSizes.gap8} width="100%">
                      {meal.products.map(product => (
                        <Box
                          key={product[ProductFieldsList.productId]}
                          className="swiper-slide"
                          flexdirection="column"
                          width="160px"
                          $justifyContent="space-between"
                          padding={theme.gapSizes.gap8}
                          $borderRadius={theme.borderRadius.radius8}
                          background={theme.colors.lightGray}
                        >
                          <Row width="90%">
                            <Typography
                              variant="medium"
                              fontSize={theme.fontSizes.fontSize14}
                              color={theme.colors.black}
                            >
                              {transformToReducedString(
                                getProductFullName(
                                  product[ProductFieldsList.productNamePartOne],
                                  product[ProductFieldsList.productNamePartTwo],
                                  product[ProductFieldsList.productNamePartThree],
                                ),
                              )}
                            </Typography>
                          </Row>
                          <Typography
                            fontSize={theme.fontSizes.fontSize14}
                            lineheight="20px"
                            color={theme.colors.darkGray}
                          >
                            {`${product.amount} ${gramms}`}
                          </Typography>
                        </Box>
                      ))}
                    </Row>
                  </Row>
                </Row>
                <Row gap={theme.gapSizes.gap8}>
                  <Box $alignItems="center" position="relative">
                    <Box
                      padding={theme.gapSizes.gap8}
                      $borderRadius={theme.borderRadius.radius12}
                      background={theme.colors.lightGray}
                      gap={theme.gapSizes.gap8}
                      margin={`0 ${theme.gapSizes.gap8} 0 0`}
                    >
                      <Typography variant="medium">
                        {getMealCalories(meal.products, false)}
                      </Typography>
                      <Typography color={theme.colors.middleGray} variant="medium">
                        {calories}
                      </Typography>
                    </Box>
                    {!isMacronutrientsViewEnabled && (
                      <Button
                        variant="primary-soft"
                        padding={theme.gapSizes.gap4}
                        id={meal[MealFieldsList.mealId]}
                        $borderRadius={theme.borderRadius.radius8}
                        onClick={toggleTooltip}
                      >
                        <CirclesIcon />
                      </Button>
                    )}
                    <Box padding={theme.gapSizes.gap8}>
                      <Divider width="1px" height="20px" color={theme.colors.middleGray} />
                    </Box>
                    {!isMacronutrientsViewEnabled && (
                      <Tooltip
                        id={meal[MealFieldsList.mealId].toString()}
                        visibility={
                          +visibleTooltipId === +meal[MealFieldsList.mealId] ? 'visible' : 'hidden'
                        }
                        variant="top"
                      >
                        <Row
                          $justifyContent="space-between"
                          $alignItems="center"
                          margin={`0 0 ${theme.gapSizes.gap8}`}
                        >
                          <Typography
                            variant="medium"
                            fontSize={theme.fontSizes.fontSize14}
                            color={theme.colors.middleGray}
                          >
                            {proteins}
                          </Typography>
                          <Typography
                            variant="medium"
                            fontSize={theme.fontSizes.fontSize14}
                            color={theme.colors.white}
                          >
                            {`${Math.round(getTotalPortionsInMeal(meal.products, 'protein', false))} ${gramms}`}
                          </Typography>
                        </Row>
                        <Row
                          $justifyContent="space-between"
                          $alignItems="center"
                          margin={`0 0 ${theme.gapSizes.gap8}`}
                        >
                          <Typography
                            variant="medium"
                            fontSize={theme.fontSizes.fontSize14}
                            color={theme.colors.middleGray}
                          >
                            {fats}
                          </Typography>
                          <Typography
                            variant="medium"
                            fontSize={theme.fontSizes.fontSize14}
                            color={theme.colors.white}
                          >
                            {`${Math.round(getTotalPortionsInMeal(meal.products, 'fats', false))} ${gramms}`}
                          </Typography>
                        </Row>
                        <Row
                          $justifyContent="space-between"
                          $alignItems="center"
                          margin={`0 0 ${theme.gapSizes.gap8}`}
                        >
                          <Typography
                            variant="medium"
                            fontSize={theme.fontSizes.fontSize14}
                            color={theme.colors.middleGray}
                          >
                            {carbohydrates}
                          </Typography>
                          <Typography
                            variant="medium"
                            fontSize={theme.fontSizes.fontSize14}
                            color={theme.colors.white}
                          >
                            {`${Math.round(getTotalPortionsInMeal(meal.products, 'carbs', false))} ${gramms}`}
                          </Typography>
                        </Row>
                      </Tooltip>
                    )}
                  </Box>
                  <Row className="swiper swiper-portionName">
                    <Row className="swiper-wrapper" $alignItems="center" gap={theme.gapSizes.gap8}>
                      {getNutrientsTextContent(isMacronutrientsViewEnabled).map(item => (
                        <PortionChip
                          key={item.portionName}
                          text={item.shortTitle}
                          portionName={item.portionName}
                          products={meal.products}
                          needsRecalculation={false}
                        />
                      ))}
                    </Row>
                  </Row>
                </Row>
              </Box>
            </WhiteBox>
          ))}
        </Box>
      )}
    </Box>
  );
}
