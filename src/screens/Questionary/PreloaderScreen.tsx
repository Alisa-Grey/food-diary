import Image from 'next/image';
import { useEffect, useState } from 'react';

import CircleGreenIcon from '@/assets/icons/CircleGreen';
import CircleGreyIcon from '@/assets/icons/CircleGrey';
import Box from '@/components/Box/Box';
import { Row } from '@/components/Flex/Flex';
import { PreloaderCircular } from '@/components/Preloader/Prealoader';
import { Typography } from '@/components/Typography/Typography';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';
import { DeviceTypeList, getDeviceType } from '@/utils/helpers';

interface TextContentProps {
  heading: string;
  text: string;
  loadingState: string[];
}

export const PreloaderScreen = () => {
  const { questionaryFormResultsPreloader } = text;
  const stausArray = (questionaryFormResultsPreloader as TextContentProps).loadingState;

  const logoDesktopPath = '/nutrimania_logo_desktop.svg';
  const logoMobilePath = '/nutrimania_logo_mobile.svg';

  const [isChecked, setIsChecked] = useState<boolean[]>(Array(stausArray.length).fill(false));

  const blockWidth = useScreenWidth();
  const deviceType = getDeviceType();

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      setIsChecked([...isChecked, (isChecked[count] = true)]);

      count === stausArray.length ? clearInterval(interval) : count++;
    }, 550);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box flexdirection="column" $alignItems="center" height="100vh" dataname="preloader-outer">
      <Box
        width={blockWidth}
        padding={`${theme.gapSizes.gap16}`}
        background={theme.colors.white}
        flexdirection="column"
        $justifyContent="center"
        $alignItems="center"
        dataname="header"
        $borderRadius={`0px 0px ${theme.borderRadius.radius20} ${theme.borderRadius.radius20}`}
      >
        <Row width="100" height="52px" $justifyContent="center" $alignItems="center">
          {deviceType === DeviceTypeList.mobile ? (
            <Image src={logoMobilePath} alt={text.description} width={117} height={24} />
          ) : (
            <Image src={logoDesktopPath} alt={text.description} width={140} height={24} />
          )}
        </Row>
      </Box>
      <Box
        position="relative"
        width="100vw"
        height="100%"
        padding={`${theme.gapSizes.gap24} ${theme.gapSizes.gap16} 0`}
        background={theme.colors.lightGray}
        flexdirection="column"
        $justifyContent="flex-start"
        $alignItems="center"
        gap={theme.gapSizes.gap32}
        dataname="step-main"
      >
        <Box
          width="100%"
          flexbasis="20%"
          $justifyContent="center"
          $alignItems="center"
          dataname="animation-wrap"
        >
          <PreloaderCircular />
        </Box>
        <Box
          flexdirection="column"
          $justifyContent="center"
          $alignItems="center"
          gap={theme.gapSizes.gap8}
          width="90%"
          dataname="text-wrap"
        >
          <Typography variant="h2" color={theme.colors.black} textalign="center">
            {(questionaryFormResultsPreloader as TextContentProps).heading}
          </Typography>
          <Typography
            color={theme.colors.darkGray}
            textalign="center"
            fontSize={theme.fontSizes.fontSize14}
          >
            {(questionaryFormResultsPreloader as TextContentProps).text}
          </Typography>
        </Box>
        <WhiteBox
          $borderRadius={theme.borderRadius.radius20}
          width="100%"
          dataname="loading-steps-list"
        >
          <Box flexdirection="column" gap={theme.gapSizes.gap16} width="100%">
            {stausArray.map((item, index) => (
              <Row key={item.substring(0, 5)} $alignItems="center" gap={theme.gapSizes.gap8}>
                {isChecked[index] ? <CircleGreenIcon /> : <CircleGreyIcon />}
                <Typography variant="p">{item}</Typography>
              </Row>
            ))}
          </Box>
        </WhiteBox>
      </Box>
    </Box>
  );
};
