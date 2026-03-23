import theme from '@/styles/theme/theme';

import Box from '../Box/Box';
import { PopupHeader } from '../Popup/PopupHeader/PopupHeader';
import { Typography } from '../Typography/Typography';

interface ConfirmationProps {
  title: string;
  description?: string | string[];
  actions: React.ReactNode;
  additionalSection?: React.ReactNode;
  fontSize?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  headerClassName?: string;
  onClose: () => void;
}

export function ConfirmationPopup({
  title,
  description,
  actions,
  additionalSection,
  fontSize,
  variant,
  onClose,
}: ConfirmationProps) {
  return (
    <>
      <PopupHeader variant={variant ?? 'h3'} title={title} onClose={onClose} />
      {description && (
        <Box
          flexdirection="column"
          $justifyContent="flex-start"
          width="100%"
          gap={theme.gapSizes.gap16}
          padding={`${theme.gapSizes.gap12} 0 ${theme.gapSizes.gap24}`}
        >
          {Array.isArray(description) ? (
            description.map((paragraph, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Typography key={`paragraph-${index}`} variant="p" color={theme.colors.darkGray}>
                {paragraph}
              </Typography>
            ))
          ) : (
            <Typography variant="p" color={theme.colors.darkGray} fontSize={fontSize}>
              {description}
            </Typography>
          )}
        </Box>
      )}
      {additionalSection && additionalSection}
      <Box
        flexdirection="column"
        $alignItems="stretch"
        width="100%"
        $justifyContent="center"
        padding={
          description
            ? `0 0 ${theme.gapSizes.gap8}`
            : `${theme.gapSizes.gap16} 0 ${theme.gapSizes.gap8}`
        }
        dataname="buttons-wrap"
        gap={theme.gapSizes.gap8}
      >
        {actions}
      </Box>
    </>
  );
}
