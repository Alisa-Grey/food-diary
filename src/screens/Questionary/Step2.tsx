import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useLocalStorage } from 'usehooks-ts';

import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { Radiobutton, RadiobuttonVariantsList } from '@/components/Radiobutton/Radiobutton';
import StickyBox from '@/components/StickyBox/StickyBox';
import { Typography } from '@/components/Typography/Typography';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import text from '@/locales/translation.json';
import type { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store';
import { initialState, setCurrentStep, setUserChoice } from '@/store/reducer/questionarySlice';
import { FieldNamesList } from '@/store/type';
import theme from '@/styles/theme/theme';
import { physicalActivityRules } from '@/utils/validation';

import { type StepProps, StepsList } from './Questionary';
import { physicalActivityWithDescription } from './radiobuttonsData';

interface FormProps {
  physicalActivity: number;
}

const Step2 = ({ setStep }: StepProps) => {
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
      physicalActivity: questionaryState[FieldNamesList.physicalActivity]?.toString()
        ? questionaryState[FieldNamesList.physicalActivity].toString()
        : storedValue[FieldNamesList.physicalActivity]?.toString(),
    },

    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormProps | FieldValues> = (data: FormProps | FieldValues) => {
    dispatch(
      setUserChoice({ field: FieldNamesList.physicalActivity, value: data.physicalActivity }),
    );
    setStep(StepsList.bodyTypeStep);
    dispatch(setCurrentStep(StepsList.bodyTypeStep));
    setValue({
      ...storedValue,
      currentStep: StepsList.bodyTypeStep,
      [FieldNamesList.physicalActivity]: +data.physicalActivity,
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
          $justifyContent="space-betWeen"
          $alignItems="center"
          gap={theme.gapSizes.gap12}
          dataname="step-main"
        >
          <WhiteBox dataname="radio-wrap" padding={`${theme.gapSizes.gap16}`}>
            {physicalActivityWithDescription.map(item => (
              <Controller
                key={item.name}
                name="physicalActivity"
                control={control}
                render={({ field: { onChange } }) => (
                  <Radiobutton
                    id={item.name}
                    name="physicalActivity"
                    value={item.id}
                    width="100%"
                    $justifyContent="center"
                    register={register}
                    validationRules={physicalActivityRules}
                    error={!!errors.physicalActivity}
                    variant={RadiobuttonVariantsList.filled}
                    onChange={e => {
                      onChange(e.target.value);
                    }}
                  >
                    <Typography variant="p" fontWeight={500} margin={`0 0 ${theme.gapSizes.gap4}`}>
                      {item.title}
                    </Typography>
                    <Typography variant="p" fontSize="14px" color={theme.colors.darkGray}>
                      {item.description}
                    </Typography>
                  </Radiobutton>
                )}
              />
            ))}
            {errors.physicalActivity && (
              <Box
                flexdirection="column"
                $alignItems="center"
                dataname="errors-wrap"
                padding={`${theme.gapSizes.gap16} 0`}
              >
                <ErrorMessage>{String(errors.physicalActivity.message)}</ErrorMessage>
              </Box>
            )}
          </WhiteBox>

          <StickyBox
            flexbasis="12%"
            padding={theme.gapSizes.gap16}
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

export default Step2;
