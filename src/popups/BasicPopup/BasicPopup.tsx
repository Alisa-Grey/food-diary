import theme from '@/styles/theme/theme';

import Box from '../../components/Box/Box';
import { PopupContainer } from '../../components/Popup/Popup';
import { PopupHeader } from '../../components/Popup/PopupHeader/PopupHeader';

interface Props {
  isOpened: boolean;
  title: string;
  variant?: 'h1' | 'h2' | 'h3';
  hasCloseButton?: boolean;
  contentSection?: React.ReactNode;
  actions: React.ReactNode;
  overlayChildren?: React.ReactNode;
  onClose: () => void;
}

export const BasicPopup = ({
  isOpened,
  title,
  variant,
  hasCloseButton,
  overlayChildren,
  contentSection,
  actions,
  onClose,
}: Props) => {
  return (
    <PopupContainer isopened={isOpened} overlayChildren={overlayChildren} onClose={onClose}>
      <Box width="100%" flexdirection="column" gap={theme.gapSizes.gap12}>
        <PopupHeader
          variant={variant}
          title={title}
          fontWeight={500}
          hasCloseButton={hasCloseButton}
          onClose={onClose}
        />
        <Box
          width="100%"
          flexdirection="column"
          gap={theme.gapSizes.gap8}
          margin={`0 0 ${theme.gapSizes.gap24}`}
        >
          {contentSection}
        </Box>
        {actions}
      </Box>
    </PopupContainer>
  );
};
