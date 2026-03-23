import CloseIcon from '@/assets/icons/CloseIcon';
import Box from '@/components/Box/Box';
import theme from '@/styles/theme/theme';

import { Button } from '../../Button/Button';
import { Row } from '../../Flex/Flex';
import { Typography } from '../../Typography/Typography';

interface PopupHeaderProps {
  title: string;
  margin?: string;
  fontWeight?: number;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  hasCloseButton?: boolean;
  className?: string;
  onClose: () => void;
}

export function PopupHeader({
  title,
  margin,
  variant,
  fontWeight,
  hasCloseButton = true,
  onClose,
}: PopupHeaderProps) {
  return (
    <Box
      position="relative"
      $justifyContent="center"
      $alignItems="center"
      width="100%"
      padding="0"
      margin={margin}
    >
      <Row
        width={variant === 'h1' ? '65%' : '95%'}
        $justifyContent="center"
        padding={`${theme.gapSizes.gap8} 0`}
        className={variant === 'h1' ? 'word-wrap' : ''}
      >
        <Typography variant={variant ?? 'h3'} textalign="center" fontWeight={fontWeight}>
          {title}
        </Typography>
      </Row>
      {hasCloseButton && (
        <Box position="absolute" top={theme.gapSizes.gap8} right="0">
          <Button
            variant="text"
            $borderRadius="50%"
            padding={theme.gapSizes.gap8}
            onClick={onClose}
          >
            <CloseIcon />
          </Button>
        </Box>
      )}
    </Box>
  );
}
