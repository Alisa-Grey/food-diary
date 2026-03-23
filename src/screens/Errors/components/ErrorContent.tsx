import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';

import { RoutesList } from '@/components/AuthCheck/AuthCheck';
import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { Row } from '@/components/Flex/Flex';
import { Typography } from '@/components/Typography/Typography';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';
import { DeviceTypeList, getDeviceType } from '@/utils/helpers';

import type { ErrorPageProps } from '../ErrorJSInternal';

export const ErrorContent = ({ onReset }: ErrorPageProps) => {
  const { generalError, buttons } = text.errorPages;
  const [reload, toMainPage] = buttons;

  const router = useRouter();
  const deviceType = getDeviceType();
  const isSmallWidth = useMediaQuery(`(max-width: ${theme.screenSizes.tablet})`);

  const logoPathDesktop = '/logo_large.svg';
  const logoPathMobile = '/nutrimania_logo_mobile.svg';
  const logoPath = deviceType === DeviceTypeList.desktop ? logoPathDesktop : logoPathMobile;

  return (
    <Box
      width={`${isSmallWidth ? '100%' : '60%'}`}
      height="100%"
      flexdirection="column"
      padding={`${isSmallWidth ? theme.gapSizes.gap16 : `80px ${theme.gapSizes.gap16}`}`}
      $alignItems="center"
      $justifyContent="space-between"
    >
      <Row width="100%" margin="0 0 80px" $justifyContent={isSmallWidth ? 'center' : 'flex-start'}>
        <Image
          src={logoPath}
          alt={text.description}
          width={isSmallWidth ? 117 : 290}
          height={isSmallWidth ? 24 : 30}
        />
      </Row>
      <Box
        width="100%"
        flexdirection="column"
        gap={isSmallWidth ? theme.gapSizes.gap16 : theme.gapSizes.gap42}
      >
        <Typography
          fontWeight={500}
          fontSize={isSmallWidth ? theme.fontSizes.fontSize28 : theme.fontSizes.fontSize64}
          lineheight="1.2"
          color={theme.colors.nutri}
          $textTransform="uppercase"
        >
          {generalError.title}
        </Typography>
        <Typography
          fontSize={isSmallWidth ? theme.fontSizes.fontSize16 : theme.fontSizes.fontSize24}
        >
          {generalError.description}
        </Typography>
        <Box
          flexdirection={isSmallWidth ? 'column' : 'row'}
          gap={theme.gapSizes.gap16}
          width="100%"
        >
          <Box flexbasis="30%">
            <Button variant="primary" fontWeight={500} width="100%" onClick={onReset}>
              {reload}
            </Button>
          </Box>
          <Box flexbasis="30%">
            <Button
              variant="outlined"
              fontWeight={500}
              width="100%"
              onClick={() => router.push(RoutesList.login)}
            >
              {toMainPage}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
