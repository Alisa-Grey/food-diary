import React, { useState } from 'react';

import type { ProductInMeal, Recipe } from '@/api/types';
import { DiaryModeOptionIdsList, ProductTypesList, UserFieldsList } from '@/api/types';
import { type Product, ProductFieldsList } from '@/api/types';
import KIcon from '@/assets/icons/KIcon';
import RecipeIcon from '@/assets/icons/RecepieIcon';
import ThumbDownIcon from '@/assets/icons/ThumbDownIcon';
import ThumbUpIcon from '@/assets/icons/ThumbUpIcon';
import useNutritionistAnalyticsModeContext from '@/hooks/useNutritionistAnalyticsModeContext';
import { usePortionsData } from '@/hooks/usePortionsData';
import { useRecipePortionsData } from '@/hooks/useRecipePortionsData';
import text from '@/locales/translation.json';
import type { ProductInList } from '@/screens/AddMeals/AddMeals';
import { useAppSelector } from '@/store';
import theme from '@/styles/theme/theme';
import { getPortionsInMeal } from '@/utils/calculation';
import { getProductFullName } from '@/utils/helpers';
import {
  defaultProductAmount,
  recommendedProductCode,
  unrecommendedProductCode,
} from '@/utils/variables';

import Box from '../Box/Box';
import ClickableBox from '../ClickableBox/ClickableBox';
import { Row } from '../Flex/Flex';
import { ProductPortionInfo } from '../ProductPortionInfo/ProductPortionInfo';
import { Typography } from '../Typography/Typography';

interface ProductCardProps {
  id: number;
  product: Product | ProductInMeal | ProductInList;
  actions: React.ReactNode | null;
  needsRecalculation?: boolean;
  isWardsMeal: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export function ProductCard({
  id,
  product,
  actions,
  needsRecalculation,
  isWardsMeal,
  onClick,
}: ProductCardProps) {
  const { units, productPage } = text;
  const { isRecomended } = productPage;
  const [, notRecommended] = isRecomended;

  const user = useAppSelector(store => store.user);
  const { isNutritionistMacronutrientsViewEnabled } = useNutritionistAnalyticsModeContext();
  const isMacronutrientsViewEnabled = isWardsMeal
    ? isNutritionistMacronutrientsViewEnabled
    : user[UserFieldsList.isMacronutrientsViewEnabled];
  const isRecipe = product.type === ProductTypesList.recipe;
  const recipePortions = useRecipePortionsData({
    recipe: product as unknown as Recipe,
    isMoscowLongevityMode:
      user[UserFieldsList.nutritionSystem] === DiaryModeOptionIdsList.moscowLongevity,
    isMacronutrientsViewEnabled,
    isProductCard: true,
  });
  const productPortions = usePortionsData(product, false, isMacronutrientsViewEnabled);
  const portions = isRecipe ? recipePortions : productPortions;
  const portionsWithoutBonus = portions.filter(item => !('unrecommended_kcal' in item));

  const [productAmount] = useState(product.amount ?? defaultProductAmount);
  const productName = getProductFullName(
    product[ProductFieldsList.productNamePartOne],
    product[ProductFieldsList.productNamePartTwo],
    product[ProductFieldsList.productNamePartThree],
  );

  return (
    <Row
      $justifyContent="space-between"
      $alignItems="stretch"
      gap={theme.gapSizes.gap8}
      width="100%"
    >
      <ClickableBox
        id={id}
        flexbasis={actions ? '90%' : '100%'}
        flexdirection="column"
        gap={theme.gapSizes.gap4}
        padding={theme.gapSizes.gap8}
        background={theme.colors.lightGray}
        $borderRadius={theme.borderRadius.radius12}
        dataname="product-info-wrap"
        onClick={onClick}
      >
        {isRecipe && (
          <Box
            position="absolute"
            top={theme.gapSizes.gap8}
            right={theme.gapSizes.gap8}
            width="16px"
            height="16px"
          >
            <RecipeIcon />
          </Box>
        )}
        <Row width="90%">
          <Typography
            variant="medium"
            fontSize={theme.fontSizes.fontSize14}
            lineheight="1.2"
            color={theme.colors.black}
          >
            {productName}
          </Typography>
        </Row>
        <Row gap={theme.gapSizes.gap6} $alignItems="center" $flexWrap="wrap">
          <Typography
            variant="medium"
            fontSize={theme.fontSizes.fontSize12}
            color={theme.colors.middleGray}
          >
            {`${productAmount} ${units[3]}`}
          </Typography>
          {ProductFieldsList.recomendCode in product &&
            typeof product[ProductFieldsList.recomendCode] !== 'undefined' && (
              <Box width="16px" height="16px">
                {+product[ProductFieldsList.recomendCode] === recommendedProductCode && (
                  <ThumbUpIcon />
                )}
                {+product[ProductFieldsList.recomendCode] === unrecommendedProductCode && (
                  <ThumbDownIcon />
                )}
              </Box>
            )}
          <Box $alignItems="center" gap={theme.gapSizes.gap8}>
            <KIcon />
            <Typography
              fontSize={theme.fontSizes.fontSize12}
              fontWeight={600}
              color={theme.colors.black}
            >
              {getPortionsInMeal(product.kcal, productAmount, needsRecalculation, true)}
            </Typography>
          </Box>
          {!isMacronutrientsViewEnabled && product[ProductFieldsList.unrecommendedKcal] > 0 && (
            <Typography fontSize={theme.fontSizes.fontSize12} color={theme.colors.middleGray}>
              {notRecommended}
            </Typography>
          )}
          {portionsWithoutBonus.map(portion => (
            <ProductPortionInfo
              key={Object.keys(portion)[0]}
              portionName={portion.title}
              portionValue={Number(
                getPortionsInMeal(
                  Number(Object.values(portion)[0]),
                  productAmount,
                  needsRecalculation,
                ),
              )}
            />
          ))}
        </Row>
      </ClickableBox>
      {actions}
    </Row>
  );
}
