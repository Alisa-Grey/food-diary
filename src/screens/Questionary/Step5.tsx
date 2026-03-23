import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useGetUserDayNorm } from '@/api/requestQuery/userInfo';
import type {
  MacronutrientNormsProps,
  PortionNormsProps,
} from '@/api/transformers/nutrientsDataTransformer';
import { nutrientsNormsTransformer } from '@/api/transformers/nutrientsDataTransformer';
import { RoutesList } from '@/components/AuthCheck/AuthCheck';
import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { Row } from '@/components/Flex/Flex';
import { NutrientsRecommendationsSection } from '@/components/NutrientsRecommendationsSection/NutrientsRecommendationsSection';
import StickyBox from '@/components/StickyBox/StickyBox';
import { Typography } from '@/components/Typography/Typography';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import text from '@/locales/translation.json';
import { useAppDispatch } from '@/store';
import { setEmptyQuestionary } from '@/store/reducer/questionarySlice';
import { NormFiledNamesList } from '@/store/type';
import theme from '@/styles/theme/theme';
import { millInLiters } from '@/utils/variables';

import { PreloaderScreen } from './PreloaderScreen';

const Step5 = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: dailyNorm } = useGetUserDayNorm();

  const blockWidth = useScreenWidth();
  const glassImagePath = '/glass-full.svg';
  const alarmImagePath = '/alarm-grey.png';

  const { questionaryFormDailyNorms } = text;
  const [weightNorm, waterNorm] = questionaryFormDailyNorms.parameters;
  const [kilo, liter] = text.units;

  const [isPreloader, setIsPreloader] = useState(true);
  const [nutrientsNorms, setNutrientsNorms] = useState<
    PortionNormsProps | MacronutrientNormsProps
  >();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsPreloader(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (dailyNorm) {
      setNutrientsNorms(
        nutrientsNormsTransformer({
          dailyNorms: dailyNorm.data,
          isMacronutrientsViewEnabled: false,
        }),
      );
    }
  }, [dailyNorm]);

  const handleClick = () => {
    localStorage.removeItem('questionary-data');
    dispatch(setEmptyQuestionary());
    router.push(RoutesList.diary);
  };

  return (
    <Box flexdirection="column" $alignItems="center" $minHeight="100%" dataname="step8-outer">
      {isPreloader ? (
        <PreloaderScreen />
      ) : (
        <>
          <Box
            width={blockWidth}
            flexdirection="column"
            $justifyContent="center"
            $alignItems="flex-start"
            gap={theme.gapSizes.gap8}
            margin={`0 0 ${theme.gapSizes.gap12}`}
            dataname="step-header"
          >
            <Row
              $justifyContent="flex-start"
              $alignItems="center"
              padding={`${theme.gapSizes.gap8} ${theme.gapSizes.gap16}`}
            >
              <Typography variant="h2">{text.questionaryStepName.dailyNorms}</Typography>
            </Row>
          </Box>
          <Box
            position="relative"
            width="100vw"
            height="100%"
            padding={`${theme.gapSizes.gap8} ${theme.gapSizes.gap24} 0`}
            background={theme.colors.lightGray}
            flexdirection="column"
            $justifyContent="space-between"
            $alignItems="center"
            gap={theme.gapSizes.gap16}
            dataname="step-main"
          >
            <Box flexdirection="column" gap={theme.gapSizes.gap8} dataname="inner-wrap">
              {typeof dailyNorm !== 'undefined' && (
                <>
                  {nutrientsNorms && (
                    <NutrientsRecommendationsSection
                      dailyNorms={nutrientsNorms}
                      isMacronutrientsViewEnabled={false}
                    />
                  )}
                  <WhiteBox>
                    <Row
                      width="100%"
                      $justifyContent="space-between"
                      $alignItems="center"
                      padding={theme.gapSizes.gap8}
                      border={`1px solid ${theme.colors.lightGray}`}
                    >
                      <Typography variant="medium">{weightNorm}</Typography>
                      <Typography variant="p" fontWeight={600} color={theme.colors.black}>
                        {dailyNorm.data[NormFiledNamesList.weightMin]}
                        {' - '}
                        {dailyNorm.data[NormFiledNamesList.weightMax]} {kilo}
                      </Typography>
                    </Row>
                    <Row
                      width="100%"
                      $justifyContent="space-between"
                      $alignItems="center"
                      padding={theme.gapSizes.gap8}
                      border={`1px solid ${theme.colors.lightGray}`}
                    >
                      <Typography variant="medium">{waterNorm}</Typography>
                      <Row gap={theme.gapSizes.gap8} $alignItems="center">
                        <Image src={glassImagePath} width={24} height={24} alt="" />
                        <Typography variant="p" fontWeight={600} color={theme.colors.black}>
                          {dailyNorm.data[NormFiledNamesList.waterNorm] / millInLiters} {liter}
                        </Typography>
                      </Row>
                    </Row>
                  </WhiteBox>
                  <WhiteBox
                    flexdirection="row"
                    $alignItems="flex-start"
                    gap={theme.gapSizes.gap16}
                    padding={`${theme.gapSizes.gap8} ${theme.gapSizes.gap16}`}
                  >
                    <Image src={alarmImagePath} width={24} height={24} alt="Предупреждение" />
                    <Box flexbasis="90%">
                      <Typography variant="p" color={theme.colors.darkGray} fontWeight={300}>
                        {questionaryFormDailyNorms.disclaimer}
                      </Typography>
                    </Box>
                  </WhiteBox>
                </>
              )}
            </Box>
            <StickyBox
              $borderRadius={`${theme.borderRadius.radius20} ${theme.borderRadius.radius20} 0px 0px`}
            >
              <Button variant="primary" type="button" onClick={handleClick}>
                {text.questionaryFormButtonFinish}
              </Button>
            </StickyBox>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Step5;
