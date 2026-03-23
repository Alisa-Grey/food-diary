'use client';
import Image from 'next/image';
import { useMediaQuery } from 'usehooks-ts';

import ArrowDownSmallIcon from '@/assets/icons/ArrowDownSmallIcon';
import BellIcon from '@/assets/icons/BellIcon';
import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { Row } from '@/components/Flex/Flex';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';
import { DeviceTypeList, getDeviceType } from '@/utils/helpers';

export enum PopupStateList {
  join = 'join',
  createPortfolio = 'createPortfolio',
  chooseProfile = 'chooseProfile',
}

interface Props {
  actions?: React.ReactNode;
}

export function Header({ actions }: Props) {
  const isSmallWidth = useMediaQuery(`(max-width: ${theme.screenSizes.mobile})`);

  const { diaryScreen } = text;
  const [alerts] = diaryScreen.buttonLabels;

  const logoDesktopPath = '/nutrimania_logo_desktop.svg';
  const logoMobilePath = '/nutrimania_logo_mobile.svg';

  const deviceType = getDeviceType();

  return (
    <WhiteBox
      width="100%"
      padding={`${theme.gapSizes.gap16} 0`}
      $borderRadius={`0 0 ${theme.borderRadius.radius20} ${theme.borderRadius.radius20}`}
      $boxShadow={isSmallWidth ? '0 -14px 64px 0 rgba(98, 148, 170, 0.12)' : 'none'}
      dataname="header"
    >
      <Row
        $justifyContent={deviceType === DeviceTypeList.mobile ? 'space-between' : 'space-evenly'}
        width="100%"
        padding={`0 ${theme.gapSizes.gap16}`}
      >
        <Button variant="text" $borderRadius="50%" ariaLabel={alerts}>
          <BellIcon />
        </Button>
        <Box>
          {deviceType === DeviceTypeList.mobile ? (
            <Image
              src={logoMobilePath}
              alt={text.description}
              width={117}
              height={24}
              style={{ marginRight: theme.gapSizes.gap10 }}
            />
          ) : (
            <Image
              src={logoDesktopPath}
              alt={text.description}
              width={140}
              height={24}
              style={{ marginRight: theme.gapSizes.gap10 }}
            />
          )}
          <ArrowDownSmallIcon />
        </Box>
        <Row $justifyContent="center" $alignItems="center">
          {actions}
        </Row>
      </Row>
    </WhiteBox>
  );
}
