import CloseIcon from '@/assets/icons/CloseIcon';
import theme from '@/styles/theme/theme';

import Box from '../Box/Box';
import { Button } from '../Button/Button';
import { Row } from '../Flex/Flex';
import { Typography } from '../Typography/Typography';

interface PopupHeaderProps {
  title: string;
  width?: string;
  margin?: string;
  fontSize?: string;
  $textVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  $textAlign?: 'left' | 'center' | 'right' | 'justify';
  onClose: () => void;
}

export function PopupHeader({
  title,
  width,
  margin,
  fontSize,
  $textVariant,
  $textAlign,
  onClose,
}: PopupHeaderProps) {
  return (
    <Box
      position="relative"
      $justifyContent="center"
      $alignItems="center"
      width="100%"
      margin={margin}
    >
      <Row width={width ?? '90%'} $justifyContent="center" padding={`${theme.gapSizes.gap8} 0`}>
        <Typography variant={$textVariant ?? 'h3'} fontSize={fontSize} textalign={$textAlign}>
          {title}
        </Typography>
      </Row>
      <Box position="absolute" top="10px" right="8px">
        <Button variant="text" $borderRadius="50%" padding={theme.gapSizes.gap4} onClick={onClose}>
          <CloseIcon />
        </Button>
      </Box>
    </Box>
  );
}
