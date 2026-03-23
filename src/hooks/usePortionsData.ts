// eslint-disable-next-line @typescript-eslint/naming-convention
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Product, ProductInMeal } from '@/api/types';
import text from '@/locales/translation.json';
import { getNutrientsTextContent } from '@/utils/helpers';

export interface PortionData {
  [x: string]: number | string | null;
  title: string;
  fullTitle: string | null;
}

export function usePortionsData(
  product: Product | ProductInMeal | undefined,
  isExtendedData: boolean,
  isMacronutrientsViewEnabled: boolean,
): PortionData[] {
  const { productPage } = text;
  const [, , , , , , unhelathy] = productPage.portions;

  const nutrientsTitles = useMemo(
    () => getNutrientsTextContent(isMacronutrientsViewEnabled),
    [isMacronutrientsViewEnabled],
  );
  const requiredNutrientsList = useMemo(
    () => _.flatMap(nutrientsTitles, 'id') as string[],
    [nutrientsTitles],
  );

  const [portionsList, setPortionsList] = useState<PortionData[]>([]);

  const getPortions = useCallback(
    (product: Product | ProductInMeal) => {
      const arr: PortionData[] = [];
      Object.entries(product).map(([key, value]) => {
        const valueFinal = Number(Number(value).toFixed(1));
        if (
          (isMacronutrientsViewEnabled && requiredNutrientsList.includes(key)) ||
          (!isMacronutrientsViewEnabled && requiredNutrientsList.includes(key) && valueFinal > 0)
        ) {
          const textContent = nutrientsTitles.find(el => el.id === key);
          arr.push({
            [key]: valueFinal,
            title: textContent?.shortTitle as string,
            fullTitle: isExtendedData
              ? (textContent?.fullTitle as string)
              : (textContent?.title as string),
          });
        }

        if (
          !isMacronutrientsViewEnabled &&
          key === 'unrecommended_kcal' &&
          Number(valueFinal) > 0
        ) {
          arr.push({
            [key]: valueFinal,
            title: unhelathy as string,
            fullTitle: unhelathy as string,
          });
        }
      });
      return arr;
    },
    [
      isExtendedData,
      isMacronutrientsViewEnabled,
      nutrientsTitles,
      requiredNutrientsList,
      unhelathy,
    ],
  );

  useEffect(() => {
    if (product) {
      const portions = getPortions(product);
      setPortionsList(portions);
    }
  }, [getPortions, product]);

  return portionsList;
}
