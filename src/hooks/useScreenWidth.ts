import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import theme from '@/styles/theme/theme';
import { DeviceTypeList, getDeviceType } from '@/utils/helpers';

export function useScreenWidth(): string {
  const [blockWidth, setBlockWidth] = useState('90vw');

  const isSmallWidth = useMediaQuery(`(max-width: ${theme.screenSizes.mobile})`);
  const isLargeWidth = useMediaQuery(`(min-width: ${theme.screenSizes.desktop})`);
  const deviceType = getDeviceType();

  useEffect(() => {
    if (isLargeWidth) {
      setBlockWidth('35vw');
    } else if (isSmallWidth || deviceType === DeviceTypeList.mobile) {
      setBlockWidth('100vw');
    } else {
      setBlockWidth('70vw');
    }
  }, [deviceType, isLargeWidth, isSmallWidth]);

  return blockWidth;
}
