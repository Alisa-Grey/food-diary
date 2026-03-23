import type { FieldErrors } from 'react-hook-form';

import theme from '@/styles/theme/theme';

import Box from '../Box/Box';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

interface Props {
  formErrors: FieldErrors;
  error?: string | null;
}

export const ErrorsSection = ({ formErrors, error }: Props) => {
  return (
    <Box width="100%" gap={theme.gapSizes.gap8} flexdirection="column">
      {Object.entries(formErrors).map(
        ([key, value]) => value && <ErrorMessage key={key}>{value.message as string}</ErrorMessage>,
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Box>
  );
};
