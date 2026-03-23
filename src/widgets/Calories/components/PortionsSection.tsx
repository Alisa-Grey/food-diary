import { useEffect, useMemo, useState } from 'react';

import type { PortionsData } from '@/api/transformers/nutrientsDataTransformer';
import { NutritionNormsList, ProductFieldsList } from '@/api/types';
import Box from '@/components/Box/Box';
import { Bulb, NutritionNameList } from '@/components/Bulb/Bulb';
import { Button } from '@/components/Button/Button';
import { Divider } from '@/components/Divider/Divider';
import { Row } from '@/components/Flex/Flex';
import { PopupContainer } from '@/components/Popup/Popup';
import { PopupHeader } from '@/components/PopupHeader/PopupHeader';
import { Typography } from '@/components/Typography/Typography';
import { useNutrientsPercentage } from '@/hooks/useNutrientsPercentage';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';
import { getPercentageOfDayNorm } from '@/utils/calculation';
import { DeviceTypeList, formatNumber, getBulbColor, getDeviceType } from '@/utils/helpers';

interface Props {
  data: PortionsData;
}

export const PortionsSection = ({ data }: Props) => {
  const { questionaryFormDailyNorms, bulbsPopups, diaryScreen } = text;
  const [, milk, protein, vegatble, starch, fat, fruit, bonus] =
    questionaryFormDailyNorms.portionName;
  const [milkFull, proteinFull, vegatbleFull, starchFull, fatFull, fruitFull] =
    questionaryFormDailyNorms.portionFullName;
  const { combined } = bulbsPopups;

  const deviceType = getDeviceType();

  const [popupType, setPopupType] = useState<NutritionNameList | null>(null);

  const closePopup = () => {
    setPopupType(null);
  };

  const bulbsData = useMemo(() => {
    return [
      {
        title: milk as string,
        titleFull: milkFull as string,
        id: NutritionNameList.milkPortionNum,
        normValue: +data.milkPortionNorm,
        currentValue: +data[ProductFieldsList.milkPortionNum],
      },
      {
        title: protein as string,
        titleFull: proteinFull as string,
        id: NutritionNameList.proteinPortionNum,
        normValue: +data.proteinPortionNorm,
        currentValue: +data[ProductFieldsList.proteinPortionNum],
      },
      {
        title: vegatble as string,
        titleFull: vegatbleFull as string,
        id: NutritionNameList.vegatablePortionNum,
        normValue: +data.vegetablePortionNorm,
        currentValue: +data[ProductFieldsList.vegetablePortionNum],
      },
      {
        title: starch as string,
        titleFull: starchFull as string,
        id: NutritionNameList.starchPortionNum,
        normValue: +data.starchPortionNorm,
        currentValue: +data[ProductFieldsList.starchPortionNum],
      },
      {
        title: fat as string,
        titleFull: fatFull as string,
        id: NutritionNameList.fatPortionNum,
        normValue: +data.fatPortionNorm,
        currentValue: +data[ProductFieldsList.fatPortionNum],
      },
      {
        title: fruit as string,
        titleFull: fruitFull as string,
        id: NutritionNameList.fruitPortionNum,
        normValue: +data.fruitPortionNorm,
        currentValue: +data[ProductFieldsList.fruitPortionNum],
      },
    ];
  }, [
    data,
    fat,
    fatFull,
    fruit,
    fruitFull,
    milk,
    milkFull,
    protein,
    proteinFull,
    starch,
    starchFull,
    vegatble,
    vegatbleFull,
  ]);

  const popupContent = useMemo(() => {
    return (
      <Box>
        {popupType && (
          <PopupContainer isopened={!!popupType} onClose={closePopup}>
            <>
              <PopupHeader
                title={combined[popupType].title}
                $textAlign="center"
                onClose={closePopup}
              />
              <Box
                flexdirection="column"
                width="100%"
                gap={theme.gapSizes.gap8}
                margin={`0 0 ${theme.gapSizes.gap24}`}
              >
                {combined[popupType].description.map((item, index) => (
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
            </>
          </PopupContainer>
        )}
      </Box>
    );
  }, [combined, diaryScreen.thanks, popupType]);

  const [unrecommendedCalories, setUnrecommendedCalories] = useState({
    total: 0,
    current: 0,
    percentage: 0,
  });
  const [percentage, setPercentage] = useState({
    [NutritionNormsList.milkPortionNum]: 0,
    [NutritionNormsList.proteinPortionNum]: 0,
    [NutritionNormsList.vegetablePortionNum]: 0,
    [NutritionNormsList.starchPortionNum]: 0,
    [NutritionNormsList.fruitPortionNum]: 0,
    [NutritionNormsList.fatPortionNum]: 0,
  });

  const percentageValues = useNutrientsPercentage(bulbsData);

  useEffect(() => {
    percentageValues.map(item => {
      setPercentage(prevState => {
        return { ...prevState, ...item };
      });
    });

    const percentage = getPercentageOfDayNorm(
      +data.unrecommendedKcalNorm.toFixed(),
      data.unrecommendedKcalNorm,
    );

    setUnrecommendedCalories({
      ...unrecommendedCalories,
      total: data.unrecommendedKcalNorm,
      current: data.unrecommended_kcal,
      percentage: percentage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Row $alignItems="center" $justifyContent="space-around">
        {bulbsData.map(item => (
          <Box
            key={item.id}
            flexdirection="column"
            $alignItems="center"
            padding="4px"
            gap={`${theme.gapSizes.gap8} 0`}
            dataname="bulb-container"
          >
            {item.id !== NutritionNameList.unrecommended && (
              <>
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
                  onClick={() => setPopupType(item.id)}
                />
                <Box flexdirection="column" $alignItems="center">
                  <Row
                    $justifyContent="center"
                    width="30px"
                    border={`1px solid ${theme.colors.middleGray}`}
                  >
                    <Typography
                      variant="medium"
                      color={percentage[item.id] > 100 ? theme.colors.darkGray : theme.colors.nutri}
                    >
                      {formatNumber(item.currentValue)}
                    </Typography>
                  </Row>
                  <Typography
                    fontSize={theme.fontSizes.fontSize12}
                    variant="medium"
                    color={theme.colors.middleGray}
                  >
                    {item.normValue}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        ))}
        <Divider width="1px" height="113px" />
        <Box
          flexdirection="column"
          $alignItems="center"
          padding={theme.gapSizes.gap4}
          gap={theme.gapSizes.gap8}
          dataname="bulb-container"
        >
          <Typography
            fontSize={theme.fontSizes.fontSize14}
            variant="medium"
            color={theme.colors.middleGray}
          >
            {bonus}
          </Typography>
          <Bulb
            id={NutritionNameList.unrecommended}
            percentage={unrecommendedCalories.percentage}
            $backgroundColor={getBulbColor(
              unrecommendedCalories.current,
              unrecommendedCalories.total,
              unrecommendedCalories.percentage,
            )}
            onClick={() => setPopupType(NutritionNameList.unrecommended)}
          />
          <Box flexdirection="column" $alignItems="center">
            <Row
              $justifyContent="center"
              width="30px"
              border={`1px solid ${theme.colors.middleGray}`}
            >
              <Typography
                variant="medium"
                color={
                  unrecommendedCalories.percentage > 100
                    ? theme.colors.darkGray
                    : theme.colors.nutri
                }
              >
                {unrecommendedCalories.current}
              </Typography>
            </Row>
            <Typography
              fontSize={theme.fontSizes.fontSize12}
              variant="medium"
              color={theme.colors.middleGray}
            >
              {unrecommendedCalories.total}
            </Typography>
          </Box>
        </Box>
      </Row>
      {popupContent}
    </>
  );
};
