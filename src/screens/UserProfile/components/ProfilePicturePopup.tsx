import Image from 'next/image';
import { useMediaQuery } from 'usehooks-ts';

import CloseIcon from '@/assets/icons/CloseIcon';
import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { Popup } from '@/components/Popup/Popup';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';

interface Props {
  isCertificate?: boolean;
  imageUrl: string;
  onClose: () => void;
}

export const ProfilePicturePopup = ({ isCertificate, imageUrl, onClose }: Props) => {
  const { avatarPlaceholder } = text.userProfileScreen;
  const isSmallWidth = useMediaQuery(`(max-width: ${theme.screenSizes.mobile})`);

  return (
    <Popup onClick={onClose}>
      <Box
        position="fixed"
        width="100%"
        height="100svh"
        flexdirection="column"
        $alignItems="center"
        $justifyContent="center"
      >
        <Box
          position="relative"
          width={isSmallWidth ? '90%' : '400px'}
          height={isCertificate ? '300px' : '400px'}
          $justifyContent="center"
          $alignItems="center"
        >
          <Box position="absolute" top="0" right="24px">
            <Button variant="text" padding={theme.gapSizes.gap4} onClick={() => onClose}>
              <CloseIcon color={theme.colors.white} />
            </Button>
          </Box>

          <Box position="fixed" width="343px" height={isCertificate ? '240px' : '343px'}>
            <Image src={imageUrl} layout="fill" objectFit="contain" alt={avatarPlaceholder} />
          </Box>
        </Box>
      </Box>
    </Popup>
  );
};
