import Box from '@/components/Box/Box';
import { Typography } from '@/components/Typography/Typography';
import theme from '@/styles/theme/theme';

interface NutrientData {
  title: string;
  value: number;
}

export const NutrientsBlock = ({ title, value }: NutrientData) => {
  return (
    <Box flexdirection="column" $alignItems="center" width="fit-content" gap={theme.gapSizes.gap4}>
      <Typography
        variant="medium"
        color={theme.colors.middleGray}
        fontSize={theme.fontSizes.fontSize14}
      >
        {title}
      </Typography>
      <Typography variant="medium" fontSize={theme.fontSizes.fontSize14} color={theme.colors.nutri}>
        {value}
      </Typography>
    </Box>
  );
};
