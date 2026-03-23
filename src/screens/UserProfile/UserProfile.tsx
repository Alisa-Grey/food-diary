'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useUserData } from '@/api/requestQuery/userInfo';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import ChartIcon from '@/assets/icons/ChartIcon';
import GoalIcon from '@/assets/icons/GoalIcon.svg';
import SettingsIcon from '@/assets/icons/SettingsIcon';
import { RoutesList } from '@/components/AuthCheck/AuthCheck';
import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import ClickableBox from '@/components/ClickableBox/ClickableBox';
import { Row } from '@/components/Flex/Flex';
import { PageLayout } from '@/components/PageLatout/PageLayout';
import { PreloaderCircularGradient } from '@/components/Preloader/Prealoader';
import { Typography } from '@/components/Typography/Typography';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import { useToggle } from '@/hooks/useToggle';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';
import { DeviceTypeList, getDeviceType } from '@/utils/helpers';

import { ProfilePicturePopup } from './components/ProfilePicturePopup';

export function UserProfile() {
  const { userProfileScreen } = text;
  const { avatarPlaceholder, rewardsBlock, links } = userProfileScreen;
  const [rewards, getHearts] = rewardsBlock;
  const [changeGoals, analytics] = links;

  const [isPhotoPopup, togglePhotoPopup] = useToggle();

  const deviceType = getDeviceType();

  const router = useRouter();

  const { data: userData } = useUserData();

  const avatarPath = userData?.photo ?? '/avatar.png';

  const goToEditPage = () => {
    router.push(RoutesList.editProfile);
  };

  return (
    <Box width="100%" flexdirection="column">
      <PageLayout hasHeader hasNavbar>
        {userData ? (
          <>
            <WhiteBox width="100%" position="relative" dataname="user-info">
              <Box position="absolute" top={theme.gapSizes.gap16} right={theme.gapSizes.gap16}>
                <Button
                  variant="text"
                  padding="0px"
                  className="button-with-outlined-icon"
                  onClick={goToEditPage}
                >
                  <SettingsIcon />
                </Button>
              </Box>
              <Row $justifyContent="center" width="100%">
                <Box
                  flexdirection="column"
                  $justifyContent="center"
                  $alignItems="center"
                  gap={theme.gapSizes.gap8}
                  width="50%"
                >
                  <ClickableBox
                    width="60px"
                    height="60px"
                    position="relative"
                    onClick={togglePhotoPopup}
                  >
                    <Image
                      unoptimized
                      src={avatarPath}
                      layout="fill"
                      objectFit="cover"
                      alt={avatarPlaceholder}
                      style={{ borderRadius: '50%' }}
                    />
                  </ClickableBox>
                  <Typography fontWeight={500}>
                    {userData.name} {userData.lastname}
                  </Typography>
                  <Typography fontSize={theme.fontSizes.fontSize14} color={theme.colors.darkGray}>
                    {userData.email}
                  </Typography>
                </Box>
              </Row>
            </WhiteBox>
            <Row width="100%" gap={theme.gapSizes.gap8} padding={`0 ${theme.gapSizes.gap16}`}>
              <WhiteBox $alignItems="flex-start" dataname="health-points">
                <Typography fontWeight={600}>{rewards}</Typography>
                <Row width={deviceType === DeviceTypeList.desktop ? '60%' : '100%'}>
                  <Typography color={theme.colors.darkGray} fontSize={theme.fontSizes.fontSize12}>
                    {getHearts}
                  </Typography>
                </Row>
              </WhiteBox>
            </Row>
            <Box flexdirection="column" width="100%" gap={theme.gapSizes.gap8}>
              <WhiteBox
                width="100%"
                gap={theme.gapSizes.gap16}
                padding={`${theme.gapSizes.gap12} ${theme.gapSizes.gap16}`}
              >
                <ClickableBox width="100%">
                  <Row width="100%" $justifyContent="space-between" $alignItems="center">
                    <Row flexbasis="80%" $alignItems="center" gap={theme.gapSizes.gap8}>
                      <GoalIcon />
                      <Typography>{changeGoals}</Typography>
                    </Row>
                    <ArrowRightIcon />
                  </Row>
                </ClickableBox>
                <ClickableBox width="100%" onClick={() => router.push(RoutesList.analytics)}>
                  <Row width="100%" $justifyContent="space-between" $alignItems="center">
                    <Row flexbasis="80%" $alignItems="center" gap={theme.gapSizes.gap8}>
                      <ChartIcon />
                      <Typography>{analytics}</Typography>
                    </Row>
                    <ArrowRightIcon />
                  </Row>
                </ClickableBox>
              </WhiteBox>
            </Box>
          </>
        ) : (
          <PreloaderCircularGradient />
        )}
      </PageLayout>
      {isPhotoPopup && <ProfilePicturePopup imageUrl={avatarPath} onClose={togglePhotoPopup} />}
    </Box>
  );
}
