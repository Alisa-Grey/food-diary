import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { styled } from 'styled-components';

import DiaryIcon from '@/assets/icons/DiaryIcon';
import UserIcon from '@/assets/icons/UserIcon';
import { RoutesList } from '@/components/AuthCheck/AuthCheck';
import ClickableBox from '@/components/ClickableBox/ClickableBox';
import useCalendarContext from '@/hooks/useCalendarContext';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';
import { DeviceTypeList, formatTimeToDatetime, getDeviceType } from '@/utils/helpers';

import { TwoRowsLink } from '../../components/CustomLink/CustomLink';
import { Typography } from '../../components/Typography/Typography';

interface NavbarProps {
  padding?: string;
}

const NavbarContainer = styled.div<NavbarProps>`
  position: absolute;
  top: 100px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${theme.gapSizes.gap8};
  margin: 0;
  background: ${theme.colors.white};
  padding: ${theme.gapSizes.gap16} 0;
  border-radius: 0px ${theme.borderRadius.radius20} ${theme.borderRadius.radius20} 0px;
  z-index: 2;

  @media (max-width: ${theme.screenSizes.tablet}) {
    position: static;
    flex-direction: row;
    justify-content: space-between;
    width: 70vw;
    max-width: 900px;
    padding: ${({ padding }) => padding || `${theme.gapSizes.gap4} ${theme.gapSizes.gap32}`};
    border-radius: ${theme.borderRadius.radius20} ${theme.borderRadius.radius20} 0px 0px;
    z-index: 20;
  }

  @media (max-width: ${theme.screenSizes.mobile}) {
    position: sticky;
    bottom: 0;
    width: 100%;
    box-shadow: 0 14px 64px 0 rgba(98, 148, 170, 0.12);
  }
`;

export function Navbar() {
  const [diary, profile] = text.navbar;
  const router = useRouter();
  const pathname = usePathname();
  const deviceType = getDeviceType();
  const { setDate } = useCalendarContext();

  const isProfileLinkActive = [RoutesList.profile, RoutesList.editProfile].some(route =>
    pathname.includes(route),
  );
  const linkFontSize =
    deviceType === DeviceTypeList.desktop ? theme.fontSizes.fontSize16 : theme.fontSizes.fontSize12;

  const goToDiary = () => {
    setDate(formatTimeToDatetime(new Date(), 'YYYY-MM-DD'));
    router.push(RoutesList.diary);
  };

  return (
    <NavbarContainer padding={`${theme.gapSizes.gap4} ${theme.gapSizes.gap64}`}>
      <>
        <ClickableBox
          className={pathname.includes(RoutesList.diary) ? 'isActive' : ''}
          onClick={goToDiary}
        >
          <TwoRowsLink color={theme.colors.black} textDecoration="none" fontWeight={500}>
            <DiaryIcon />
            <Typography variant="p" fontSize={linkFontSize} color={theme.colors.darkGray}>
              {diary}
            </Typography>
          </TwoRowsLink>
        </ClickableBox>
        <Link href={RoutesList.profile} className={isProfileLinkActive ? 'isActive' : ''}>
          <TwoRowsLink color={theme.colors.black} textDecoration="none" fontWeight={500}>
            <UserIcon />
            <Typography variant="p" fontSize={linkFontSize} color={theme.colors.darkGray}>
              {profile}
            </Typography>
          </TwoRowsLink>
        </Link>
      </>
    </NavbarContainer>
  );
}
