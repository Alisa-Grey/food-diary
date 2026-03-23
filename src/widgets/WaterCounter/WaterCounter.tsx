/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useAddUserWater, useDeleteUserWater } from '@/api/requestQuery/userInfo';
import GlassEmptyIcon from '@/assets/icons/GlassEmptyIcon';
import GlassFullIconIcon from '@/assets/icons/GlassFullIcon';
import MinusGreytIcon from '@/assets/icons/MinusGreyIcon';
import PlusBluetIcon from '@/assets/icons/PlusBlueIcon';
import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { Row } from '@/components/Flex/Flex';
import { Typography } from '@/components/Typography/Typography';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import useCalendarContext from '@/hooks/useCalendarContext';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';
import { getWaterInLiters } from '@/utils/calculation';
import { getTimeString } from '@/utils/helpers';
import { addWaterDeadline, maxWaterAmount, millInGlass, millInLiters } from '@/utils/variables';

interface WaterCounterInterface {
  currentWater: number;
  waterNorm: number;
  isInteractive?: boolean;
}

export function WaterCounter({
  currentWater,
  waterNorm,
  isInteractive = true,
}: WaterCounterInterface) {
  const { diaryScreen } = text;
  const [water, liter, drinkMore, normFullfilled] = diaryScreen.water;
  const [remove, add] = diaryScreen.waterButtons;

  const [waterInLiters, setWaterInLiters] = useState(0);
  const [normInGlasses, setNormInGlasses] = useState(0);
  const [waterAdded, setWaterAdded] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const { date } = useCalendarContext();

  const queryClient = useQueryClient();
  const addWater = useAddUserWater();
  const deleteWater = useDeleteUserWater();

  useEffect(() => {
    if (waterNorm && typeof waterNorm !== 'undefined') {
      setWaterInLiters(waterNorm / millInLiters);
      setNormInGlasses(Math.floor(waterNorm / millInGlass));
    }
  }, [normInGlasses, waterNorm]);

  useEffect(() => {
    setWaterAdded(currentWater);
    const isMaxLiters = getWaterInLiters(currentWater) >= maxWaterAmount;
    setIsDisabled(isMaxLiters);
  }, [currentWater]);

  const handleAdd = () => {
    const datetime = getTimeString(date, 'YYYY-MM-DD hh:mm:ss');
    addWater.mutate(
      {
        waterGlassNum: 1,
        datetime: datetime,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['useGetWater'] });
          setIsDisabled(getWaterInLiters(waterAdded) >= maxWaterAmount);
        },
      },
    );
  };

  const handleRemove = () => {
    deleteWater.mutate(date, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['useGetWater'] });
      },
    });
  };

  const isWaterDeadlineMissed = new Date().getHours() >= addWaterDeadline && waterAdded === 0;
  const isWaterNormFillfilled = waterAdded >= waterNorm / millInGlass;

  return (
    <WhiteBox dataname="timer-wrap">
      <Box flexdirection="column" $alignItems="stretch" gap={theme.gapSizes.gap24} width="100%">
        <Row width="100%" $justifyContent="space-between" $alignItems="center">
          <Typography color={theme.colors.black} fontWeight={600}>
            {water}
          </Typography>

          <Typography color={theme.colors.darkGray} fontSize={theme.fontSizes.fontSize14}>
            {getWaterInLiters(waterAdded)}&nbsp;/&nbsp;{waterInLiters} {liter}
          </Typography>
        </Row>
        {isInteractive && (
          <>
            {isWaterDeadlineMissed && (
              <Typography
                fontSize={theme.fontSizes.fontSize28}
                lineheight={theme.fontSizes.fontSize28}
                fontWeight={900}
                color={theme.colors.water}
              >
                {drinkMore}
              </Typography>
            )}
            {isWaterNormFillfilled && (
              <Typography
                fontSize={theme.fontSizes.fontSize28}
                lineheight={theme.fontSizes.fontSize28}
                fontWeight={900}
                color={theme.colors.water}
              >
                {normFullfilled}
              </Typography>
            )}
          </>
        )}
        <Row
          width="100%"
          $justifyContent="space-around"
          $alignItems="center"
          gap={theme.gapSizes.gap8}
        >
          {[...Array(waterAdded)].map((item, index) => (
            <GlassFullIconIcon key={`${item}-${index}`} />
          ))}
          {(waterNorm && waterNorm / millInGlass - waterAdded) > 0 &&
            [...Array(waterNorm / millInGlass - waterAdded)].map((item, index) => (
              <GlassEmptyIcon key={`${item}-${index}`} />
            ))}
        </Row>
        {isInteractive && (
          <Row $justifyContent="center" gap={theme.gapSizes.gap24}>
            <Box
              flexdirection="column"
              $justifyContent="center"
              $alignItems="stretch"
              flexbasis="50%"
              width="50%"
            >
              <Button
                disabled={!Array(waterAdded).length}
                variant="secondary"
                color={theme.colors.darkGray}
                $iconPosition="static"
                icon={<MinusGreytIcon />}
                onClick={handleRemove}
              >
                {remove}
              </Button>
            </Box>
            <Box
              flexdirection="column"
              $justifyContent="center"
              $alignItems="stretch"
              flexbasis="50%"
              width="50%"
            >
              <Button
                variant="info"
                $iconPosition="static"
                icon={
                  <PlusBluetIcon
                    color={isDisabled ? theme.colors.middleGray : theme.colors.water}
                  />
                }
                disabled={isDisabled}
                onClick={handleAdd}
              >
                {add}
              </Button>
            </Box>
          </Row>
        )}
      </Box>
    </WhiteBox>
  );
}
