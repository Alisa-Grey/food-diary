import React from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { Row } from '@/components/Flex/Flex';
import { Input } from '@/components/Input/Input';
import { Radiobutton, RadiobuttonVariantsList } from '@/components/Radiobutton/Radiobutton';
import StickyBox from '@/components/StickyBox/StickyBox';
import { Typography } from '@/components/Typography/Typography';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToggle } from '@/hooks/useToggle';
import text from '@/locales/translation.json';
import { BasicPopup } from '@/popups/BasicPopup/BasicPopup';
import type { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store';
import { initialState, setCurrentStep, setParams } from '@/store/reducer/questionarySlice';
import theme from '@/styles/theme/theme';
import { calculateBMI } from '@/utils/calculation';
import { genderRules, heightRules, weightRules } from '@/utils/validation';
import { maxBMI, minBMI } from '@/utils/variables';

import { type StepProps, StepsList } from './Questionary';

interface FormProps {
  weight: string;
  height: string;
  gender: string;
}

const Step1 = ({ setStep }: StepProps): React.ReactElement<StepProps> => {
  const { questionaryFormParameters } = text;

  const [storedValue, setValue] = useLocalStorage(
    'questionary-data',
    initialState.questionaryState,
  );

  const [isPopupOpened, setIsPopupOpened] = useToggle(false);
  const [isUnderweight, setIsUnderweight] = useToggle(false);

  const dispatch = useAppDispatch();
  const questionaryState = useAppSelector((state: RootState) => state.questionary.questionaryState);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    clearErrors,
  } = useForm<FormProps | FieldValues>({
    defaultValues: {
      weight: questionaryState.weight ? questionaryState.weight : storedValue.weight,
      height: questionaryState.height ? questionaryState.height : storedValue.height,
      gender: questionaryState.gender ? questionaryState.gender : storedValue.gender,
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormProps | FieldValues> = (data: FormProps | FieldValues) => {
    const BMI = calculateBMI(data.weight, data.height);

    if (data.height && data.weight && minBMI < BMI && BMI <= maxBMI) {
      dispatch(setCurrentStep(StepsList.physicalActivityStep));
      setStep(StepsList.physicalActivityStep);
      setValue({
        ...storedValue,
        currentStep: StepsList.physicalActivityStep,
        weight: +data.weight,
        height: +data.height,
        gender: data.gender,
        BMI: BMI,
      });
    } else if (minBMI >= BMI) {
      setIsUnderweight();
      setIsPopupOpened();
    } else if (BMI >= maxBMI) {
      setIsPopupOpened();
    }

    dispatch(
      setParams({ weight: +data.weight, height: +data.height, gender: data.gender, BMI: BMI }),
    );
  };

  const handlePopupNext = () => {
    dispatch(setCurrentStep(StepsList.physicalActivityStep));

    setValue({
      ...storedValue,
      weight: getValues().weight,
      height: getValues().height,
      gender: getValues().gender,
      BMI: questionaryState.BMI,
    });
    setStep(StepsList.physicalActivityStep);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.startsWith('0')) {
      e.target.value = e.target.value.replace(/^0/, '');
    }

    e.target.value = e.target.value
      .replace(/[^0-9.,]/g, '')
      .replace(/(\.[\d]{2})./g, '$1')
      .replace(/(\,[\d]{2})./g, '$1');

    clearErrors(e.currentTarget.name);
    setIsUnderweight();
  };

  return (
    <>
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
            <Box flexdirection="column" gap={theme.gapSizes.gap8}>
              <WhiteBox flexbasis="20vh" dataname="inputs-wrap" gap={theme.gapSizes.gap12}>
                <Input
                  name="height"
                  visualtype="filled"
                  type="number"
                  placeholder={questionaryFormParameters.inputHeight}
                  register={register}
                  validationRules={heightRules}
                  icon={<Typography color={theme.colors.darkGray}>см</Typography>}
                  padding={`12px ${theme.gapSizes.gap32} 12px 12px`}
                  error={!!errors.height}
                  onChange={handleInputChange}
                />
                <Input
                  name="weight"
                  visualtype="filled"
                  type="number"
                  placeholder={questionaryFormParameters.inputWeight}
                  register={register}
                  validationRules={weightRules}
                  icon={<Typography color={theme.colors.darkGray}>кг</Typography>}
                  padding={`12px ${theme.gapSizes.gap32} 12px 12px`}
                  error={!!errors.weight}
                  onChange={handleInputChange}
                />
              </WhiteBox>
              <WhiteBox dataname="radio-wrap">
                <Row
                  width="100%"
                  flexdirection="row"
                  $justifyContent="space-evenly"
                  $alignItems="center"
                  gap={theme.gapSizes.gap12}
                  $borderRadius={theme.borderRadius.radius20}
                  padding={`0 0 ${theme.gapSizes.gap8}`}
                >
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Radiobutton
                        variant={RadiobuttonVariantsList.filled}
                        id="male"
                        name="gender"
                        width="50%"
                        $justifyContent="center"
                        flexbasis="50%"
                        textalign="center"
                        value="male"
                        register={register}
                        validationRules={genderRules}
                        error={!!errors.gender}
                        onChange={e => {
                          onChange(e.target.value);
                        }}
                      >
                        {questionaryFormParameters.gender.male}
                      </Radiobutton>
                    )}
                  />
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Radiobutton
                        variant={RadiobuttonVariantsList.filled}
                        id="female"
                        name="gender"
                        value="female"
                        width="50%"
                        $justifyContent="center"
                        flexbasis="50%"
                        textalign="center"
                        register={register}
                        validationRules={genderRules}
                        error={!!errors.gender}
                        onChange={e => {
                          onChange(e.target.value);
                        }}
                      >
                        {questionaryFormParameters.gender.female}
                      </Radiobutton>
                    )}
                  />
                </Row>
                {(errors.weight || errors.height || errors.gender) && (
                  <Box
                    flexdirection="column"
                    width="100%"
                    maxwidth="800px"
                    gap={theme.gapSizes.gap8}
                  >
                    {errors.height && <ErrorMessage>{String(errors.height.message)}</ErrorMessage>}
                    {errors.weight && <ErrorMessage>{String(errors.weight.message)}</ErrorMessage>}
                    {errors.gender && <ErrorMessage>{String(errors.gender.message)}</ErrorMessage>}
                  </Box>
                )}
              </WhiteBox>
            </Box>
            <StickyBox
              flexbasis="10%"
              padding={theme.gapSizes.gap16}
              $justifyContent="center"
              $borderRadius={`${theme.borderRadius.radius20} ${theme.borderRadius.radius20} 0px 0px`}
            >
              <Button variant="primary" type="submit">
                {text.questionaryFormButtonNext}
              </Button>
            </StickyBox>
          </Box>
        </form>
      </Box>
      <BasicPopup
        isOpened={isPopupOpened}
        title={questionaryFormParameters.popupText.heading}
        contentSection={
          <Box flexdirection="column" $alignItems="flex-start" gap={theme.gapSizes.gap8}>
            <Typography variant="p">
              {isUnderweight
                ? questionaryFormParameters.popupText.lessThan
                : questionaryFormParameters.popupText.moreThan}
            </Typography>
            <Box flexdirection="column">
              <Typography variant="p" color={theme.colors.darkGray}>
                {questionaryFormParameters.popupText.cta1}
              </Typography>
              <Typography variant="p" color={theme.colors.darkGray}>
                {questionaryFormParameters.popupText.cta2}
              </Typography>
              <Typography variant="p" color={theme.colors.darkGray}>
                {questionaryFormParameters.popupText.final}
              </Typography>
            </Box>
          </Box>
        }
        actions={
          <Button variant="primary" type="submit" onClick={handlePopupNext}>
            {text.questionaryFormButtonNext}
          </Button>
        }
        onClose={() => setIsPopupOpened()}
      />
    </>
  );
};

export default Step1;
