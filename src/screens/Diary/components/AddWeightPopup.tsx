import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';

import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { Row } from '@/components/Flex/Flex';
import { Input } from '@/components/Input/Input';
import { PopupContainer } from '@/components/Popup/Popup';
import { PopupHeader } from '@/components/Popup/PopupHeader/PopupHeader';
import { TextHighlight } from '@/components/TextHighlight/TextHighlight';
import { Typography } from '@/components/Typography/Typography';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';
import { weightRules } from '@/utils/validation';

export interface FormProps {
  weight: number;
}

interface AddWeightPopupProps {
  userWeight: string;
  isOpened: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<FormProps | FieldValues>;
}

export function AddWeightPopup({ userWeight, isOpened, onClose, onSubmit }: AddWeightPopupProps) {
  const { progressScreen } = text;
  const [addWeight, currentWeight, save] = progressScreen.addWeightPopup;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormProps | FieldValues>({
    defaultValues: {
      weight: userWeight,
    },

    mode: 'onChange',
  });

  return (
    <PopupContainer isopened={isOpened} onClose={onClose}>
      <PopupHeader title={addWeight as string} onClose={onClose} />
      <Box width="100%">
        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <Box flexdirection="column" width="100%" dataname="form-inner">
            <Row
              margin={`0 0 ${theme.gapSizes.gap16} 0`}
              $alignItems="center"
              $justifyContent="space-between"
              width="100%"
            >
              <Box flexdirection="column" flexbasis="70%" className="important-block">
                <Typography color={theme.colors.middleGray}>
                  {currentWeight}{' '}
                  <TextHighlight color={theme.colors.nutri}>{progressScreen.kilo}</TextHighlight>
                </Typography>
              </Box>
              <Box width="80px">
                <Input
                  name="weight"
                  visualtype="filled"
                  type="number"
                  register={register}
                  validationRules={weightRules}
                  error={!!errors.weight}
                  step="0.1"
                />
              </Box>
            </Row>
            {errors.weight && (
              <Row margin={`0 0 ${theme.gapSizes.gap16}`}>
                <ErrorMessage>{errors.weight.message as string}</ErrorMessage>
              </Row>
            )}
            <Box
              flexdirection="column"
              $justifyContent="center"
              $alignItems="stretch"
              margin="auto 0 0 0"
              width="100%"
            >
              <Button variant="primary" type="submit">
                {save}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </PopupContainer>
  );
}
