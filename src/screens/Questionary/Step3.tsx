import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { Radiobutton, RadiobuttonVariantsList } from '@/components/Radiobutton/Radiobutton';
import StickyBox from '@/components/StickyBox/StickyBox';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import text from '@/locales/translation.json';
import type { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store';
import { initialState, setCurrentStep, setUserChoice } from '@/store/reducer/questionarySlice';
import { FieldNamesList, UserDataFieldsList } from '@/store/type';
import theme from '@/styles/theme/theme';
import { radiobuttonRules } from '@/utils/validation';

import { type StepProps, StepsList } from './Questionary';
import { variantsArrayStep4 } from './radiobuttonsData';

interface FormProps {
  bodyType: number;
}

const Step3 = ({ setStep }: StepProps) => {
  const dispatch = useAppDispatch();
  const questionaryState = useAppSelector((state: RootState) => state.questionary.questionaryState);

  const [storedValue, setValue] = useLocalStorage(
    'questionary-data',
    initialState.questionaryState,
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps | FieldValues>({
    defaultValues: {
      bodyType: questionaryState[UserDataFieldsList.bodyType]?.toString()
        ? questionaryState[UserDataFieldsList.bodyType].toString()
        : storedValue[UserDataFieldsList.bodyType]?.toString(),
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormProps | FieldValues> = (data: FormProps | FieldValues) => {
    dispatch(setUserChoice({ field: FieldNamesList.bodyType, value: data.bodyType }));
    dispatch(setCurrentStep(StepsList.personalDataStep));
    setStep(StepsList.personalDataStep);
    setValue({
      ...storedValue,
      currentStep: StepsList.personalDataStep,
      [FieldNamesList.bodyType]: +data.bodyType,
    });
  };

  return (
    <Box $justifyContent="center" flexbasis="90%" dataname="form-wrap">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box
          position="relative"
          width="100vw"
          height="100%"
          padding={`${theme.gapSizes.gap8} ${theme.gapSizes.gap24} 0`}
          background={theme.colors.lightGray}
          flexdirection="column"
          $justifyContent="space-between"
          $alignItems="center"
          gap={theme.gapSizes.gap16}
          dataname="step-main"
        >
          <WhiteBox dataname="radio-wrap" gap={theme.gapSizes.gap12}>
            {variantsArrayStep4.map(item => (
              <Controller
                key={item.name}
                name="bodyType"
                control={control}
                render={({ field: { onChange } }) => (
                  <Radiobutton
                    id={item.name}
                    variant={RadiobuttonVariantsList.filled}
                    name="bodyType"
                    value={item.id}
                    width="100%"
                    $justifyContent="center"
                    register={register}
                    validationRules={radiobuttonRules}
                    error={!!errors.bodyType}
                    onChange={e => {
                      onChange(e.target.value);
                    }}
                  >
                    {item.text}
                  </Radiobutton>
                )}
              />
            ))}

            {errors.bodyType && (
              <Box
                flexdirection="column"
                $alignItems="center"
                dataname="errors-wrap"
                padding={`${theme.gapSizes.gap16} 0`}
              >
                <ErrorMessage>{String(errors.bodyType.message)}</ErrorMessage>
              </Box>
            )}
          </WhiteBox>

          <StickyBox
            flexbasis="12%"
            $justifyContent="center"
            margin="auto 0 0 0"
            $borderRadius={`${theme.borderRadius.radius20} ${theme.borderRadius.radius20} 0px 0px`}
          >
            <Button variant="primary" type="submit">
              {text.questionaryFormButtonNext}
            </Button>
          </StickyBox>
        </Box>
      </form>
    </Box>
  );
};

export default Step3;
