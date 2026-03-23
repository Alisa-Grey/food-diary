import CloseIcon from '@/assets/icons/CloseIcon';
import theme from '@/styles/theme/theme';

import Box from '../Box/Box';
import { Button } from '../Button/Button';

interface Props {
  padding?: string;
  onClick: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
}

export const PopupCloseButton = ({ padding, onClick }: Props) => {
  return (
    <Box position="absolute" top={theme.gapSizes.gap16} right={theme.gapSizes.gap16}>
      <Button variant="text" $borderRadius="50%" padding={padding ?? '0px'} onClick={onClick}>
        <CloseIcon />
      </Button>
    </Box>
  );
};
