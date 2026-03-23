'use client';
import { useEffect, useState } from 'react';

import Box from '@/components/Box/Box';
import { BackButton } from '@/components/Button/Button';
import { Row } from '@/components/Flex/Flex';
import Container from '@/components/FlexContainer/Container';
import { Typography } from '@/components/Typography/Typography';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import text from '@/locales/translation.json';
import { useAppDispatch } from '@/store';
import { initialState, setCurrentStep } from '@/store/reducer/questionarySlice';
import theme from '@/styles/theme/theme';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

export interface StepProps {
  setStep: (step: number) => void;
}

export enum StepsList {
  'parametersStep' = 0,
  'physicalActivityStep' = 1,
  'bodyTypeStep' = 2,
  'personalDataStep' = 3,
  'finalStep' = 4,
}

export const steps = [
  { title: text.questionaryStepName.params, step: StepsList.parametersStep, stepNumber: 1 },
  {
    title: text.questionaryStepName.physicalActivity,
    step: StepsList.physicalActivityStep,
    stepNumber: 2,
  },
  { title: text.questionaryStepName.bodyType, step: StepsList.bodyTypeStep, stepNumber: 4 },
  { title: text.questionaryStepName.personal, step: StepsList.personalDataStep, stepNumber: 6 },
];

export function Questionary() {
  const [step, setStep] = useState(StepsList.parametersStep);

  const blockWidth = useScreenWidth();
  const dispatch = useAppDispatch();

  const renderCurrentStep = (): JSX.Element | undefined => {
    switch (step) {
      case StepsList.parametersStep:
        return <Step1 setStep={setStep} />;
      case StepsList.physicalActivityStep:
        return <Step2 setStep={setStep} />;
      case StepsList.bodyTypeStep:
        return <Step3 setStep={setStep} />;
      case StepsList.personalDataStep:
        return <Step4 setStep={setStep} />;
      case StepsList.finalStep:
        return <Step5 />;
      default:
        return <Step1 setStep={setStep} />;
    }
  };

  const [storedValue, setValue] = useLocalStorage(
    'questionary-data',
    initialState.questionaryState,
  );

  useEffect(() => {
    storedValue.currentStep ? setStep(storedValue.currentStep) : setStep(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrevStep = () => {
    if (step === StepsList.parametersStep) {
      return;
    }
    const prevStepIndex = steps[step - 1];
    const prevStep = StepsList[prevStepIndex?.step as unknown as keyof typeof StepsList];
    setStep(StepsList[prevStep as unknown as keyof typeof StepsList]);
    dispatch(setCurrentStep(StepsList[prevStep as unknown as keyof typeof StepsList]));
    setValue({
      ...storedValue,
      currentStep: +StepsList[prevStep],
    });
  };

  const currentStepNumber = steps.find(el => el.step === step)?.stepNumber;

  return (
    <Box>
      <Container
        $justifyContent="space-between"
        background={theme.colors.lightGray}
        dataname="questionary-outer"
      >
        <WhiteBox
          width={blockWidth}
          $alignItems="flex-start"
          gap={theme.gapSizes.gap8}
          $borderRadius="0"
          dataname="step-header"
        >
          <Box flexdirection="column">
            {step !== StepsList.finalStep && (
              <>
                <BackButton
                  onClick={handlePrevStep}
                >{`${currentStepNumber} из ${steps.length}`}</BackButton>
                <Row $justifyContent="flex-start" $alignItems="center">
                  <Typography variant="h2">{steps[step]?.title}</Typography>
                </Row>
              </>
            )}
          </Box>
        </WhiteBox>
        {renderCurrentStep()}
      </Container>
    </Box>
  );
}
