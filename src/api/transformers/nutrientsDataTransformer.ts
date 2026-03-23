import type { CountedNutrientsData, UserDayNorms } from '../types';
import { ProductFieldsList } from '../types';
import { NutritionNormsList } from '../types';
import { CountedNutrientsList } from '../types';

export interface MacronutrientProps {
  protein: number;
  fats: number;
  carbs: number;
  unrecommendedKcal: number;
  kcal: number;
}
export interface MacronutrientNormsProps {
  kcalMaxNorm: number;
  kcalMinNorm: number;
  carbsNorm: number;
  fatsNorm: number;
  proteinNorm: number;
}

export type MacronutrientsData = MacronutrientProps & MacronutrientNormsProps;

export interface PortionProps {
  [ProductFieldsList.milkPortionNum]: number;
  [ProductFieldsList.fruitPortionNum]: number;
  [ProductFieldsList.vegetablePortionNum]: number;
  [ProductFieldsList.starchPortionNum]: number;
  [ProductFieldsList.proteinPortionNum]: number;
  [ProductFieldsList.fatPortionNum]: number;
  [ProductFieldsList.exceedKcal]: number;
  kcal: number;
  [ProductFieldsList.unrecommendedKcal]: number;
}

export interface PortionNormsProps {
  kcalMaxNorm: number;
  kcalMinNorm: number;
  milkPortionNorm: number;
  fruitPortionNorm: number;
  vegetablePortionNorm: number;
  starchPortionNorm: number;
  proteinPortionNorm: number;
  fatPortionNorm: number;
  unrecommendedKcalNorm: number;
}

export type PortionsData = PortionProps & PortionNormsProps;

interface Props {
  isMacronutrientsViewEnabled: boolean;
}
export interface NormsTransformerProps extends Props {
  dailyNorms: UserDayNorms;
}

export interface NutrientsTransformerProps extends Props {
  currentDayNutrients: CountedNutrientsData;
}

export const nutrientsDataTransformer = ({
  currentDayNutrients,
  isMacronutrientsViewEnabled,
}: NutrientsTransformerProps): MacronutrientProps | PortionProps => {
  const { kcal } = currentDayNutrients;
  if (isMacronutrientsViewEnabled) {
    return {
      unrecommendedKcal: currentDayNutrients[CountedNutrientsList.unrecommendedKcal],
      kcal: kcal,
      protein: currentDayNutrients.protein,
      fats: currentDayNutrients.fats,
      carbs: currentDayNutrients.carbs,
    };
  } else {
    return {
      [ProductFieldsList.milkPortionNum]: currentDayNutrients[CountedNutrientsList.milkPortionNum],
      [ProductFieldsList.fruitPortionNum]:
        currentDayNutrients[CountedNutrientsList.fruitPortionNum],
      [ProductFieldsList.vegetablePortionNum]:
        currentDayNutrients[CountedNutrientsList.vegetablePortionNum],
      [ProductFieldsList.starchPortionNum]:
        currentDayNutrients[CountedNutrientsList.starchPortionNum],
      [ProductFieldsList.proteinPortionNum]:
        currentDayNutrients[CountedNutrientsList.proteinPortionNum],
      [ProductFieldsList.fatPortionNum]: currentDayNutrients[CountedNutrientsList.fatPortionNum],
      [ProductFieldsList.exceedKcal]: currentDayNutrients[CountedNutrientsList.exceedKcal],
      kcal: kcal,
      [ProductFieldsList.unrecommendedKcal]:
        currentDayNutrients[CountedNutrientsList.unrecommendedKcal],
    };
  }
};

export const nutrientsNormsTransformer = ({
  dailyNorms,
  isMacronutrientsViewEnabled,
}: NormsTransformerProps): PortionNormsProps | MacronutrientNormsProps => {
  if (isMacronutrientsViewEnabled) {
    return {
      kcalMinNorm: dailyNorms[NutritionNormsList.kcalMin],
      kcalMaxNorm: dailyNorms[NutritionNormsList.kcalMax],
      carbsNorm: dailyNorms.carbs,
      fatsNorm: dailyNorms.fats,
      proteinNorm: dailyNorms.protein,
    };
  } else {
    return {
      kcalMinNorm: dailyNorms[NutritionNormsList.kcalMin],
      kcalMaxNorm: dailyNorms[NutritionNormsList.kcalMax],
      milkPortionNorm: dailyNorms[NutritionNormsList.milkPortionNum],
      fruitPortionNorm: dailyNorms[NutritionNormsList.fruitPortionNum],
      vegetablePortionNorm: dailyNorms[NutritionNormsList.vegetablePortionNum],
      starchPortionNorm: dailyNorms[NutritionNormsList.starchPortionNum],
      proteinPortionNorm: dailyNorms[NutritionNormsList.proteinPortionNum],
      fatPortionNorm: dailyNorms[NutritionNormsList.fatPortionNum],
      unrecommendedKcalNorm: dailyNorms[NutritionNormsList.unrecommendedKcal],
    };
  }
};
