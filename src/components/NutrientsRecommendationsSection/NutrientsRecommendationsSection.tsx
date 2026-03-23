'use client';
import type {
  MacronutrientNormsProps,
  PortionNormsProps,
} from '@/api/transformers/nutrientsDataTransformer';
import type {
  WardMacronutronutrientsNorms,
  WardPortionsNorms,
} from '@/api/transformers/wardNormsTransformer';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';

import { Row } from '../Flex/Flex';
import { NutrientsBlock } from '../NutrientsBlock/NutrientsBlock';
import { Typography } from '../Typography/Typography';
import WhiteBox from '../WhiteBox/WhiteBox';

interface NutrientsRecommendationsSectionProps {
  dailyNorms:
    | PortionNormsProps
    | MacronutrientNormsProps
    | WardPortionsNorms
    | WardMacronutronutrientsNorms;
  padding?: string;
  isMacronutrientsViewEnabled: boolean;
}

export function NutrientsRecommendationsSection({
  dailyNorms,
  isMacronutrientsViewEnabled,
  ...props
}: NutrientsRecommendationsSectionProps) {
  const { questionaryFormDailyNorms, diaryScreen } = text;
  const [
    calories,
    milkPortion,
    proteinPortion,
    vegetablePortions,
    starchPortion,
    fatPortion,
    fruitsPortion,
  ] = questionaryFormDailyNorms.portionName;
  const [protein, fats, carbs] = diaryScreen.macronutrientsFull;

  const macronutrientsRecommendation = [
    {
      id: 'protein',
      title: protein as string,
      value: (dailyNorms as MacronutrientNormsProps).proteinNorm,
    },
    {
      id: 'fats',
      title: fats as string,
      value: (dailyNorms as MacronutrientNormsProps).fatsNorm,
    },
    {
      id: 'carbs',
      title: carbs as string,
      value: (dailyNorms as MacronutrientNormsProps).carbsNorm,
    },
  ];

  const portionReRecommendation = [
    {
      id: 'milk',
      title: milkPortion as string,
      value: (dailyNorms as PortionNormsProps).milkPortionNorm,
    },
    {
      id: 'protein',
      title: proteinPortion as string,
      value: (dailyNorms as PortionNormsProps).proteinPortionNorm,
    },
    {
      id: 'vegetables',
      title: vegetablePortions as string,
      value: (dailyNorms as PortionNormsProps).vegetablePortionNorm,
    },
    {
      id: 'starch',
      title: starchPortion as string,
      value: +(dailyNorms as PortionNormsProps).starchPortionNorm,
    },
    {
      id: 'fatPortionNorm',
      title: fatPortion as string,
      value: (dailyNorms as PortionNormsProps).fatPortionNorm,
    },
    {
      id: 'fruits',
      title: fruitsPortion as string,
      value: (dailyNorms as PortionNormsProps).fruitPortionNorm,
    },
  ];

  const data = isMacronutrientsViewEnabled ? macronutrientsRecommendation : portionReRecommendation;

  return (
    <WhiteBox
      flexdirection="column"
      width="100%"
      gap={theme.gapSizes.gap16}
      padding={props.padding ?? theme.gapSizes.gap16}
    >
      <Row $alignItems="baseline" gap={theme.gapSizes.gap8}>
        <Typography
          variant="p"
          fontSize={theme.fontSizes.fontSize36}
          lineheight="42px"
          fontWeight={900}
          color={theme.colors.nutri}
        >
          {`${dailyNorms.kcalMinNorm} - ${dailyNorms.kcalMaxNorm}`}
        </Typography>
        <Typography variant="p" color={theme.colors.nutri}>
          {calories}
        </Typography>
      </Row>
      <Row
        width="100%"
        $justifyContent={isMacronutrientsViewEnabled ? 'space-evenly' : 'space-between'}
        gap={theme.gapSizes.gap16}
      >
        {data.map(item => (
          <NutrientsBlock key={item.id} title={item.title} value={item.value} />
        ))}
      </Row>
    </WhiteBox>
  );
}
