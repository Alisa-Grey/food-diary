import styled from 'styled-components';

import theme from '@/styles/theme/theme';
import { DeviceTypeList, getDeviceType } from '@/utils/helpers';

import { StyledOverlay } from '../Overlay/Overlay';

export interface PopupContainerProps {
  children: React.ReactNode;
  overlayChildren?: React.ReactNode;
  $backgroundColor?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
export interface PopupProps extends PopupContainerProps {
  isopened: boolean;
  position?: 'fixed' | 'absolute' | 'relative';
  onClose: () => void;
}

export const StyledPopupMobile = styled.div<PopupProps>`
  display: ${({ isopened }) => (isopened ? 'block' : 'none')};
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  max-height: calc(100% - 50px);
  z-index: 30;
  overflow-y: auto;

  padding: ${theme.gapSizes.gap16};
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
  border-radius: ${theme.borderRadius.radius20} ${theme.borderRadius.radius20} 0 0;
`;

export const StyledPopupDesktop = styled.div<PopupProps>`
  position: ${({ position }) => position || 'absolute'};
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35vw;
  z-index: 30;

  padding: ${theme.gapSizes.gap16};
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
  border-radius: ${theme.borderRadius.radius20};
`;

export const Popup: React.FC<PopupContainerProps> = ({ children, onClick }) => {
  return <StyledOverlay onClick={onClick}>{children}</StyledOverlay>;
};

export const PopupContainer: React.FC<PopupProps> = ({
  isopened,
  onClose,
  children,
  overlayChildren,
  position,
}) => {
  const deviceType = getDeviceType();

  if (!isopened) {
    return null;
  }

  return (
    <Popup onClick={onClose}>
      {overlayChildren}
      {deviceType === DeviceTypeList.desktop ? (
        <StyledPopupDesktop
          isopened={isopened}
          position={position}
          onClose={onClose}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </StyledPopupDesktop>
      ) : (
        <StyledPopupMobile isopened={isopened} onClose={onClose} onClick={e => e.stopPropagation()}>
          {children}
        </StyledPopupMobile>
      )}
    </Popup>
  );
};
