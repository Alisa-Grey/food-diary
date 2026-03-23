'use client';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';
import { DeviceTypeList, getDeviceType } from '@/utils/helpers';
import { Header } from '@/widgets/Header/Header';
import { Navbar } from '@/widgets/Navbar/Navbar';

import Box from '../Box/Box';
import { Typography } from '../Typography/Typography';
import Wrapper from '../Wrapper/Wrapper';

interface PageLayoutProps {
  hasNavbar?: boolean;
  hasHeader?: boolean;
  hasFooter?: boolean;
  $backgroundColor?: string;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
  className?: string;
}
export function PageLayout({
  children,
  hasNavbar,
  hasHeader,
  hasFooter,
  $backgroundColor,
  headerActions,
  className,
}: PageLayoutProps) {
  const { copywrite } = text;

  const deviceType = getDeviceType();

  const isFooter = deviceType === DeviceTypeList.desktop && hasFooter;

  return (
    <Box
      flexdirection="column"
      $alignItems="center"
      background={$backgroundColor ?? theme.colors.lightGray}
      $minHeight="100svh"
      height="100%"
      className={className}
    >
      <Wrapper
        position="relative"
        height="100%"
        $justifyContent="space-between"
        background={$backgroundColor ?? theme.colors.lightGray}
        $minHeight="100svh"
        gap={theme.gapSizes.gap8}
        dataname="inner-wrap"
      >
        <Box flexdirection="column" width="100%" height="100%" gap={theme.gapSizes.gap8}>
          {hasHeader && <Header actions={headerActions} />}
          <Box
            position="relative"
            width="100%"
            height="100%"
            flexbasis="90%"
            background={$backgroundColor ?? theme.colors.lightGray}
            flexdirection="column"
            $justifyContent="flex-start"
            $alignItems="center"
            gap={theme.gapSizes.gap8}
            padding="0"
            dataname="main"
          >
            {children}
          </Box>
          {isFooter && (
            <Box
              $justifyContent="center"
              $alignItems="center"
              width="100%"
              padding={theme.gapSizes.gap8}
              dataname="footer"
            >
              <Typography fontSize={theme.fontSizes.fontSize14} color={theme.colors.middleGray}>
                {copywrite}
              </Typography>
            </Box>
          )}
        </Box>
        {hasNavbar && <Navbar />}
      </Wrapper>
    </Box>
  );
}
