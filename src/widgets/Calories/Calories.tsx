import { useEffect, useMemo, useState } from 'react';

import type {
  MacronutrientNormsProps,
  MacronutrientsData,
  PortionNormsProps,
  PortionsData,
} from '@/api/transformers/nutrientsDataTransformer';
import { nutrientsDataTransformer } from '@/api/transformers/nutrientsDataTransformer';
import type { CountedNutrientsData } from '@/api/types';
import { UserFieldsList } from '@/api/types';
import { CountedNutrientsList } from '@/api/types';
import CirclesIcon from '@/assets/icons/CirclesIcon';
import InfoIcon from '@/assets/icons/InfoIcon';
import ThumbDownGreyIcon from '@/assets/icons/ThumbDownGreyIcon';
import { BasicPopup } from '@/popups/BasicPopup/BasicPopup';
import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { Row } from '@/components/Flex/Flex';
import { PopupContainer } from '@/components/Popup/Popup';
import { PopupHeader } from '@/components/Popup/PopupHeader/PopupHeader';
import StickyBox from '@/components/StickyBox/StickyBox';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { Typography } from '@/components/Typography/Typography';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import { useToggle } from '@/hooks/useToggle';
import text from '@/locales/translation.json';
import { CalendarPopup } from '@/popups/CalendarPopup/CalendarPopup';
import { DatePicker } from '@/screens/Diary/components/DatePicker';
import { useAppSelector } from '@/store';
import theme from '@/styles/theme/theme';

import { MacronutrientsInfoPopupContent } from './components/MacronutrientsInfoPopupContent';
import { MacronutrientsSection } from './components/MacronutrientsSection';
import { PortionsInfoPopupContent } from './components/PortionsInfoPopupContent';
import { PortionsSection } from './components/PortionsSection';

interface CaloriesVidgetProps {
  wardId?: string | null;
  dailyNorms: PortionNormsProps | MacronutrientNormsProps;
  currentDayNutrients: CountedNutrientsData;
  isMacronutrientsViewEnabled: boolean;
  wardPortionsSystem?: string | null;
}

export function Calories({
  wardId,
  dailyNorms,
  currentDayNutrients,
  isMacronutrientsViewEnabled,
}: CaloriesVidgetProps) {
  const { questionaryFormDailyNorms, diaryScreen, units, bulbsPopups } = text;
  const { caloriesPopupPortions, caloriesPopupMacronutrients } = diaryScreen;
  const { unrecommendedKcal } = bulbsPopups.combined;
  const [calories] = questionaryFormDailyNorms.portionName;
  const [proteins, fats, carbohydrates] = diaryScreen.macronutrients;
  const [, , , gramms] = units;

  const user = useAppSelector(store => store.user);

  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [isInfoPopup, toggleInfoPopup] = useToggle();
  const [difference, setDifference] = useState(0);

  const [isTooltipVisible, setIsTooltipVisible] = useToggle();
  const [isCalendar, toggleCalendar] = useToggle();

  useEffect(() => {
    setDifference(+dailyNorms.kcalMaxNorm - +currentDayNutrients.kcal);
  }, [currentDayNutrients.kcal, dailyNorms]);

  const renderPopup = () => {
    return (
      <BasicPopup
        isOpened={isPopupOpened}
        title={
          isMacronutrientsViewEnabled
            ? caloriesPopupMacronutrients.heading
            : caloriesPopupPortions.heading
        }
        contentSection={
          isMacronutrientsViewEnabled ? (
            <MacronutrientsInfoPopupContent />
          ) : (
            <PortionsInfoPopupContent />
          )
        }
        actions={
          <StickyBox position="sticky" width="100%" padding="0">
            <Button variant="primary" type="button" onClick={() => setIsPopupOpened(false)}>
              {diaryScreen.thanks}
            </Button>
          </StickyBox>
        }
        onClose={() => setIsPopupOpened(false)}
      />
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (
      !((e.target as HTMLElement).parentNode as HTMLElement).id.includes('tooltip') &&
      isTooltipVisible
    ) {
      setIsTooltipVisible();
    }
  };

  const isBonusCalories = isMacronutrientsViewEnabled
    ? currentDayNutrients[CountedNutrientsList.unrecommendedKcal] > 0
    : currentDayNutrients[CountedNutrientsList.exceedKcal] > 0;
  const isUnrecommendedKcalVisible =
    isBonusCalories && !user[UserFieldsList.isMacronutrientsViewEnabled];
  const nutrientsData = useMemo(() => {
    return nutrientsDataTransformer({
      currentDayNutrients: currentDayNutrients,
      isMacronutrientsViewEnabled: isMacronutrientsViewEnabled,
    });
  }, [currentDayNutrients, isMacronutrientsViewEnabled]);
  const nutrientsFullData = Object.assign({}, nutrientsData, dailyNorms);

  return (
    <>
      <WhiteBox
        padding={`${theme.gapSizes.gap16} ${theme.gapSizes.gap12}`}
        dataname="calories-wrap"
        onClick={handleClick}
      >
        <Box flexdirection="column" gap={theme.gapSizes.gap16} width="100%">
          <Box flexdirection="column" gap={theme.gapSizes.gap16} width="100%">
            <Box position="relative" $justifyContent="center" $alignItems="center" width="100%">
              <DatePicker
                variant="daily"
                startDate={user[UserFieldsList.registrationDate]}
                onClick={toggleCalendar}
              />
              <Box flexdirection="column" position="absolute" top="4px" right="0">
                <Button
                  variant="text"
                  padding={theme.gapSizes.gap4}
                  onClick={() => setIsPopupOpened(true)}
                >
                  <InfoIcon />
                </Button>
              </Box>
            </Box>
            <Box
              position="relative"
              $justifyContent="center"
              $alignItems="center"
              gap={theme.gapSizes.gap8}
              width="100%"
            >
              <Row $alignItems="center" gap={theme.gapSizes.gap4}>
                <Box dataname="current-calories">
                  <Typography
                    color={difference > 0 ? theme.colors.nutri : theme.colors.lightDist}
                    fontSize={theme.fontSizes.fontSize36}
                    fontWeight={900}
                    className="large-text"
                  >
                    {currentDayNutrients.kcal}
                  </Typography>
                </Box>
                <Box flexdirection="column">
                  <Typography
                    variant="p"
                    color={theme.colors.middleGray}
                    fontSize={theme.fontSizes.fontSize12}
                  >
                    /{dailyNorms.kcalMinNorm}&nbsp;&mdash;&nbsp;{dailyNorms.kcalMaxNorm}
                  </Typography>
                  <Typography
                    variant="p"
                    color={difference > 0 ? theme.colors.nutri : theme.colors.middleGray}
                    fontWeight={600}
                  >
                    {calories}
                  </Typography>
                </Box>
              </Row>
              {/* tooltip*/}
              {!isMacronutrientsViewEnabled && (
                <Box position="relative" $justifyContent="flex-start" dataname="tooltip-container">
                  <Button
                    id="tooltip"
                    variant="primary-soft"
                    padding={theme.gapSizes.gap4}
                    $borderRadius={theme.borderRadius.radius8}
                    backgroundcolor={theme.colors.softNutri}
                    onClick={setIsTooltipVisible}
                  >
                    <CirclesIcon />
                  </Button>
                  <Tooltip visibility={isTooltipVisible ? 'visible' : 'hidden'} variant="bottom">
                    <Row
                      $justifyContent="space-between"
                      $alignItems="center"
                      margin={`0 0 ${theme.gapSizes.gap8}`}
                    >
                      <Typography
                        variant="medium"
                        fontSize={theme.fontSizes.fontSize14}
                        color={theme.colors.middleGray}
                      >
                        {proteins}
                      </Typography>
                      <Typography
                        variant="medium"
                        fontSize={theme.fontSizes.fontSize14}
                        color={theme.colors.white}
                      >
                        {currentDayNutrients.protein}
                        {gramms}
                      </Typography>
                    </Row>
                    <Row
                      $justifyContent="space-between"
                      $alignItems="center"
                      margin={`0 0 ${theme.gapSizes.gap8}`}
                    >
                      <Typography
                        variant="medium"
                        fontSize={theme.fontSizes.fontSize14}
                        color={theme.colors.middleGray}
                      >
                        {fats}
                      </Typography>
                      <Typography
                        variant="medium"
                        fontSize={theme.fontSizes.fontSize14}
                        color={theme.colors.white}
                      >
                        {currentDayNutrients.fats}
                        {gramms}
                      </Typography>
                    </Row>
                    <Row $justifyContent="space-between" $alignItems="center">
                      <Typography
                        variant="medium"
                        fontSize={theme.fontSizes.fontSize14}
                        color={theme.colors.middleGray}
                      >
                        {carbohydrates}
                      </Typography>
                      <Typography
                        variant="medium"
                        fontSize={theme.fontSizes.fontSize14}
                        color={theme.colors.white}
                      >
                        {currentDayNutrients.carbs}
                        {gramms}
                      </Typography>
                    </Row>
                  </Tooltip>
                </Box>
              )}
              {isUnrecommendedKcalVisible && (
                <Row $alignItems="center" gap={theme.gapSizes.gap8}>
                  <Typography
                    variant="p"
                    color={theme.colors.middleGray}
                    fontSize={theme.fontSizes.fontSize36}
                    fontWeight={900}
                    className="large-text"
                  >
                    {isMacronutrientsViewEnabled
                      ? currentDayNutrients[CountedNutrientsList.unrecommendedKcal]
                      : currentDayNutrients[CountedNutrientsList.exceedKcal]}
                  </Typography>
                  <Button variant="text" onClick={toggleInfoPopup}>
                    <ThumbDownGreyIcon />
                  </Button>
                </Row>
              )}
            </Box>
          </Box>
          {isMacronutrientsViewEnabled ? (
            <MacronutrientsSection
              data={nutrientsFullData as MacronutrientsData}
              kcalDifference={difference}
            />
          ) : (
            <PortionsSection data={nutrientsFullData as PortionsData} />
          )}
        </Box>
      </WhiteBox>
      {renderPopup()}
      <CalendarPopup
        isDiary
        wardId={Number(wardId)}
        isOpened={isCalendar}
        onClose={toggleCalendar}
      />
      <PopupContainer isopened={isInfoPopup} onClose={toggleInfoPopup}>
        <PopupHeader title={unrecommendedKcal.title} onClose={toggleInfoPopup} />
        <Box
          flexdirection="column"
          width="100%"
          gap={theme.gapSizes.gap8}
          margin={`0 0 ${theme.gapSizes.gap24}`}
        >
          {unrecommendedKcal.description.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Typography key={index} color={theme.colors.darkGray}>
              {item}
            </Typography>
          ))}
        </Box>
        <Box width="100%" flexdirection="column" $alignItems="stretch">
          <Button variant="primary" onClick={toggleInfoPopup}>
            {diaryScreen.thanks}
          </Button>
        </Box>
      </PopupContainer>
    </>
  );
}
