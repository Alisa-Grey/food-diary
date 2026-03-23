import Box from '@/components/Box/Box';
import { List } from '@/components/List/List';
import { Typography } from '@/components/Typography/Typography';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';

export const PortionsInfoPopupContent = () => {
  const { diaryScreen } = text;
  const { caloriesPopupPortions } = diaryScreen;

  return (
    <Box flexdirection="column" $justifyContent="flex-start" gap={theme.gapSizes.gap8} padding="0">
      <Typography variant="p" color={theme.colors.darkGray}>
        {caloriesPopupPortions.productText}
      </Typography>
      <List variant="ul" padding={`0 ${theme.gapSizes.gap32}`} color={theme.colors.darkGray}>
        {caloriesPopupPortions.productGroups}
      </List>
      <Typography variant="p" color={theme.colors.darkGray}>
        {caloriesPopupPortions.bonus}
      </Typography>
      <Typography variant="p" color={theme.colors.darkGray}>
        {caloriesPopupPortions.bonusExcess}
      </Typography>
      <Typography variant="p" color={theme.colors.darkGray}>
        {caloriesPopupPortions.bonusScale}
      </Typography>
    </Box>
  );
};
