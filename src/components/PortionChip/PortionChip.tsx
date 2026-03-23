import type { ProductInMeal } from '@/api/types';
import theme from '@/styles/theme/theme';
import { getTotalPortionsInMeal } from '@/utils/calculation';

import Box from '../Box/Box';
import { Typography } from '../Typography/Typography';

interface PortionChipProps {
  text: string;
  portionName: string;
  products: ProductInMeal[];
  needsRecalculation?: boolean;
}

export function PortionChip({ text, portionName, products, needsRecalculation }: PortionChipProps) {
  return (
    <Box
      className="swiper-slide"
      gap={theme.gapSizes.gap8}
      padding={theme.gapSizes.gap8}
      $borderRadius={theme.borderRadius.radius12}
      background={theme.colors.lightGray}
    >
      <Typography variant="medium">
        {getTotalPortionsInMeal(products, portionName, needsRecalculation)}{' '}
      </Typography>
      <Typography variant="medium" color={theme.colors.middleGray}>
        {text}
      </Typography>
    </Box>
  );
}
