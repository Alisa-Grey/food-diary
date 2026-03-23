import theme from '@/styles/theme/theme';

import Box from '../Box/Box';
import { Typography } from '../Typography/Typography';

export interface NutrientAmountBlockProps {
  value: number | string;
  title: string;
}
export const MacronutrientAmountBlock = ({ value, title }: NutrientAmountBlockProps) => {
  return (
    <Box flexdirection="column" $alignItems="center" gap={theme.gapSizes.gap4}>
      <Box
        $justifyContent="center"
        $alignItems="center"
        width="56px"
        padding={theme.gapSizes.gap16}
        $borderRadius={theme.borderRadius.radius12}
        background={theme.colors.lightGray}
      >
        <Typography fontSize={theme.fontSizes.fontSize14} fontWeight={600}>
          {value}
        </Typography>
      </Box>
      <Typography fontSize={theme.fontSizes.fontSize14} color={theme.colors.black} fontWeight={600}>
        {title}
      </Typography>
    </Box>
  );
};
