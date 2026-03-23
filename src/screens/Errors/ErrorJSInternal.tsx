'use client';
import { useMediaQuery } from 'usehooks-ts';

import Box from '@/components/Box/Box';
import theme from '@/styles/theme/theme';

import { ErrorContent } from './components/ErrorContent';

export interface ErrorPageProps {
  onReset: () => void;
}

export function ErrorJSInternal({ onReset }: ErrorPageProps) {
  const isSmallWidth = useMediaQuery(`(max-width: ${theme.screenSizes.mobile})`);

  const imagePathDesktop = '/error-screens/error_desktop_female.svg';
  const imagePathMobile = '/error-screens/error_mobile_female.svg';

  const backgraundUrl = isSmallWidth ? imagePathMobile : imagePathDesktop;
  const backgroundSize = isSmallWidth ? 'auto 100%' : 'cover';

  return (
    <Box
      width="100%"
      $minHeight="100vh"
      flexdirection="column"
      $alignItems="center"
      background={`${theme.colors.softNutri} url(${backgraundUrl}) no-repeat right / ${backgroundSize}`}
    >
      <ErrorContent onReset={onReset} />
    </Box>
  );
}
