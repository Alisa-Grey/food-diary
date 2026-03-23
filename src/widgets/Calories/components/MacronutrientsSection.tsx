import { useEffect, useMemo, useState } from 'react';

import type { MacronutrientsData } from '@/api/transformers/nutrientsDataTransformer';
import { NutritionNormsList } from '@/api/types';
import Box from '@/components/Box/Box';
import { Bulb, MacronutrientsNamesList } from '@/components/Bulb/Bulb';
import { Button } from '@/components/Button/Button';
import { CircularProgressbar } from '@/components/CircularProgressbar/CircularProgressbar';
import { Row } from '@/components/Flex/Flex';
import { PopupContainer } from '@/components/Popup/Popup';
import { PopupHeader } from '@/components/Popup/PopupHeader/PopupHeader';
import { Typography } from '@/components/Typography/Typography';
import { useNutrientsPercentage } from '@/hooks/useNutrientsPercentage';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';
import { getPercentageOfDayNorm } from '@/utils/calculation';
import {
  CaloriesStateList,
  DeviceTypeList,
  formatNumber,
  getBulbColor,
  getCaloriesState,
  getDeviceType,
} from '@/utils/helpers';

interface Props {
  data: MacronutrientsData;
  kcalDifference: number;
}

enum PopupTypesList {
  protein = 'protein',
  fats = 'fats',
  carbs = 'carbs',
}

export const MacronutrientsSection = ({ data, kcalDifference }: Props) => {
  const { diaryScreen, units, bulbsPopups } = text;
  const { macronutrientsSection } = diaryScreen;
  const { macronutrients } = bulbsPopups;
  const [proteinsTitle, fatsTitle] = diaryScreen.macronutrientsFull;
  const [, , carbohydratesTitle] = diaryScreen.macronutrients;
  const [, , , gramms] = units;

  const caloriesDifference = +data.kcalMaxNorm - data.kcal;
  const deviceType = getDeviceType();

  const caloriesState = getCaloriesState(caloriesDifference);
  const getColorsByState = () => {
    switch (caloriesState) {
      case CaloriesStateList.empty: {
        return {
          progressbarColor: theme.colors.lightGray,
          textColor: theme.colors.nutri,
        };
      }
      case CaloriesStateList.isBelowNorm: {
        return {
          progressbarColor: theme.colors.lightNutri,
          textColor: theme.colors.nutri,
        };
      }
      case CaloriesStateList.exceedsNorm: {
        return {
          progressbarColor: theme.colors.lightDist,
          textColor: theme.colors.lightDist,
        };
      }
      default: {
        return {
          progressbarColor: theme.colors.lightGray,
          textColor: theme.colors.nutri,
        };
      }
    }
  };
  const colors = getColorsByState();

  const [popupType, setPopupType] = useState<PopupTypesList | null>(null);
  const [progress, setProgress] = useState(0);
  const [percentage, setPercentage] = useState({
    [NutritionNormsList.protein]: 0,
    [NutritionNormsList.fats]: 0,
    [NutritionNormsList.carbs]: 0,
  });

  useEffect(() => {
    const percentage = getPercentageOfDayNorm(+data.kcal, data.kcalMaxNorm);
    setProgress(percentage);
  }, [data.kcal, data.kcalMaxNorm]);

  const bulbsData = useMemo(() => {
    return [
      {
        title: proteinsTitle as string,
        id: MacronutrientsNamesList.protein,
        normValue: data.proteinNorm,
        currentValue: data.protein,
      },
      {
        title: fatsTitle as string,
        id: MacronutrientsNamesList.fats,
        normValue: data.fatsNorm,
        currentValue: data.fats,
      },
      {
        title: carbohydratesTitle as string,
        id: MacronutrientsNamesList.carbs,
        normValue: data.carbsNorm,
        currentValue: data.carbs,
      },
    ];
  }, [
    carbohydratesTitle,
    data.carbs,
    data.carbsNorm,
    data.fats,
    data.fatsNorm,
    data.protein,
    data.proteinNorm,
    fatsTitle,
    proteinsTitle,
  ]);

  useEffect(() => {
    percentageValues.map(item => {
      setPercentage(prevState => {
        return { ...prevState, ...item };
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const percentageValues = useNutrientsPercentage(bulbsData);

  const closePopup = () => {
    setPopupType(null);
  };

  return (
    <>
      <Row $alignItems="center" $justifyContent="space-around">
        <Row
          width="100%"
          $alignItems="center"
          padding={`0 ${theme.gapSizes.gap12}`}
          gap={theme.gapSizes.gap24}
        >
          <CircularProgressbar progress={progress} color={colors.progressbarColor}>
            <Typography
              color={colors.textColor}
              fontSize={theme.fontSizes.fontSize28}
              fontWeight={900}
              textalign="center"
            >
              {Math.abs(kcalDifference)}
            </Typography>
            <Typography
              fontSize={theme.gapSizes.gap12}
              textalign="center"
              color={theme.colors.middleGray}
            >
              {caloriesState === CaloriesStateList.exceedsNorm
                ? macronutrientsSection.kcalExceeded
                : macronutrientsSection.kcalRemaining}
            </Typography>
          </CircularProgressbar>
          <Box gap={theme.gapSizes.gap24} flexbasis="60%" $justifyContent="space-evenly">
            {bulbsData.map(item => (
              <Box
                key={item.id}
                flexdirection="column"
                $alignItems="center"
                padding={`${theme.gapSizes.gap4} 0`}
                gap={`${theme.gapSizes.gap8} 0`}
                dataname="bulb-container"
              >
                <Typography
                  fontSize={
                    deviceType === DeviceTypeList.desktop
                      ? theme.fontSizes.fontSize16
                      : theme.fontSizes.fontSize14
                  }
                  variant="medium"
                  color={theme.colors.middleGray}
                >
                  {item.title}
                </Typography>
                <Bulb
                  id={item.id}
                  percentage={percentage[item.id]}
                  $backgroundColor={getBulbColor(
                    item.currentValue,
                    item.normValue,
                    percentage[item.id],
                  )}
                  onClick={() => setPopupType(PopupTypesList[item.id])}
                />
                <Box flexdirection="column" $alignItems="center">
                  <Row
                    $justifyContent="center"
                    width="30px"
                    border={`1px solid ${theme.colors.middleGray}`}
                  >
                    <Typography
                      variant="medium"
                      fontSize={theme.fontSizes.fontSize16}
                      color={
                        percentage[item.id] > 100 ? theme.colors.middleGray : theme.colors.nutri
                      }
                    >
                      {formatNumber(item.currentValue)}
                    </Typography>
                  </Row>
                  <Typography
                    fontSize={theme.fontSizes.fontSize12}
                    variant="medium"
                    color={theme.colors.middleGray}
                  >
                    {`${item.normValue}${gramms}`}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Row>
      </Row>
      {popupType && (
        <PopupContainer isopened={!!popupType} onClose={closePopup}>
          <PopupHeader title={macronutrients[popupType].title} onClose={closePopup} />
          <Box
            flexdirection="column"
            width="100%"
            gap={theme.gapSizes.gap8}
            margin={`0 0 ${theme.gapSizes.gap24}`}
          >
            {macronutrients[popupType].description.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Typography key={index} color={theme.colors.darkGray}>
                {item}
              </Typography>
            ))}
          </Box>
          <Box width="100%" flexdirection="column" $alignItems="stretch">
            <Button variant="primary" onClick={closePopup}>
              {diaryScreen.thanks}
            </Button>
          </Box>
        </PopupContainer>
      )}
    </>
  );
};
