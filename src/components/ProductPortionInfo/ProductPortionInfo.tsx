import theme from '@/styles/theme/theme';
import { formatFloat } from '@/utils/helpers';

import Box from '../Box/Box';
import { Typography } from '../Typography/Typography';

interface ProductPortionInfoProps {
  portionName: string;
  portionValue: number;
}

export function ProductPortionInfo({ portionName, portionValue }: ProductPortionInfoProps) {
  return (
    <Box $alignItems="center" gap={theme.gapSizes.gap8}>
      <Typography
        variant="medium"
        fontSize={theme.fontSizes.fontSize12}
        color={theme.colors.middleGray}
      >
        {portionName}
      </Typography>
      <Typography
        fontSize={theme.fontSizes.fontSize12}
        fontWeight={600}
        lineheight="20px"
        color={theme.colors.black}
      >
        {formatFloat(portionValue)}
      </Typography>
    </Box>
  );
}
