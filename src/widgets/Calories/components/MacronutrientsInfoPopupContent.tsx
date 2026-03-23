import Box from '@/components/Box/Box';
import { Typography } from '@/components/Typography/Typography';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';

export const MacronutrientsInfoPopupContent = () => {
  const { diaryScreen } = text;
  const { caloriesPopupMacronutrients } = diaryScreen;

  return (
    <Box flexdirection="column" $justifyContent="flex-start" gap={theme.gapSizes.gap8} padding="0">
      {caloriesPopupMacronutrients.textContent.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Typography key={index} variant="p" color={theme.colors.darkGray}>
          {item}
        </Typography>
      ))}
    </Box>
  );
};
