import { getPercentageOfDayNorm } from '@/utils/calculation';

export interface NutrientDataProps {
  title: string;
  id: string;
  normValue: number;
  currentValue: number;
}

export function useNutrientsPercentage(data: NutrientDataProps[]) {
  const deafaultBulbValue = 200;
  const result = data.map(item => {
    const diff = getPercentageOfDayNorm(item.currentValue, item.normValue);

    return { [item.id]: isFinite(diff) ? diff : deafaultBulbValue };
  });

  return result;
}
