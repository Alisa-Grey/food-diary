'use client';
import { useMediaQuery } from 'usehooks-ts';

import Box from '@/components/Box/Box';
import theme from '@/styles/theme/theme';

import { ErrorContent } from './components/ErrorContent';
import type { ErrorPageProps } from './ErrorJSInternal';

export function ErrorServerSide({ onReset }: ErrorPageProps) {
  const isSmallWidth = useMediaQuery(`(max-width: ${theme.screenSizes.mobile})`);

  const imagePathDesktop = '/error-screens/error_desktop_male.svg';
  const imagePathMobile = '/error-screens/error_mobile_male.svg';

  const backgraundUrl = isSmallWidth ? imagePathMobile : imagePathDesktop;
  const backgroundSize = isSmallWidth ? 'auto 100%' : '100% auto';

  return (
    <Box
      width="100%"
      $minHeight="100vh"
      flexdirection="column"
      $alignItems="center"
      background={`${theme.colors.softNutri} url(${backgraundUrl}) no-repeat right bottom / ${backgroundSize}`}
    >
      <ErrorContent onReset={onReset} />
    </Box>
  );
}
