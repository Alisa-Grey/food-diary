import moment from 'moment';
import { useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useSendQuestionaryData } from '@/api/requestQuery/userInfo';
import type { ErrorResponse } from '@/api/types';
import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { Row } from '@/components/Flex/Flex';
import { Input } from '@/components/Input/Input';
import { PopupContainer } from '@/components/Popup/Popup';
import { PopupCloseButton } from '@/components/PopupCloseButton/PopupCloseButton';
import StickyBox from '@/components/StickyBox/StickyBox';
import { Typography } from '@/components/Typography/Typography';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToggle } from '@/hooks/useToggle';
import text from '@/locales/translation.json';
import type { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store';
import { initialState, setCurrentStep, setPersonalData } from '@/store/reducer/questionarySlice';
import { FieldNamesList, UserDataFieldsList } from '@/store/type';
import theme from '@/styles/theme/theme';
import {
  capitalizeString,
  convertStringToDate,
  DeviceTypeList,
  formatDate,
  formatDateToLocal,
  getDeviceType,
} from '@/utils/helpers';
import { birthdateRules, lastNameRules, nameRules } from '@/utils/validation';

import { type StepProps, StepsList } from './Questionary';

interface FormProps {
  name: string;
  lastname: string;
  birthdate: string;
}

const Step4 = ({ setStep }: StepProps) => {
  const dispatch = useAppDispatch();
  const questionaryState = useAppSelector((state: RootState) => state.questionary.questionaryState);

  const [isPopupOpened, togglePopup] = useToggle();
  const [birthdate, seteBirthdate] = useState('');
  const [formData, setFormData] = useState<FormProps>({ name: '', lastname: '', birthdate: '' });

  const { questionaryFormPersonalData } = text;

  const deviceType = getDeviceType();

  const [storedValue, setValue] = useLocalStorage(
    'questionary-data',
    initialState.questionaryState,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormProps | FieldValues>({
    defaultValues: {
      name: questionaryState.name ? questionaryState.name : storedValue.name,
      lastname: questionaryState.lastname ? questionaryState.lastname : storedValue.lastname,
      birthdate: storedValue.birthdate
        ? moment(convertStringToDate(storedValue.birthdate)).format('DD.MM.YYYY')
        : questionaryState.birthdate,
    },
  });

  const sendQuestionaryData = useSendQuestionaryData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = capitalizeString(e.target.value);
  };

  const onSubmit: SubmitHandler<FormProps | FieldValues> = (data: FormProps | FieldValues) => {
    if (data.birthdate) {
      const dateFormatted = formatDate(data.birthdate, 'DD.MM.YYYY');
      seteBirthdate(dateFormatted);
      setFormData({ name: data.name, lastname: data.lastname, birthdate: data.birthdate });
      togglePopup();
    }
  };

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const len = e.currentTarget.value.length;

    if (len === 7 && !e.currentTarget.value.includes('.')) {
      e.currentTarget.value =
        e.currentTarget.value.slice(0, 2) +
        '.' +
        e.currentTarget.value.slice(2, 4) +
        '.' +
        e.currentTarget.value.slice(4);
    }

    if (len > 10) {
      e.currentTarget.value = e.currentTarget.value.substring(0, 10);
    }

    e.currentTarget.value = e.currentTarget.value.replace(/[а-яА-Яa-zA-Z]/g, '');
  };

  const handlePopupNext = () => {
    dispatch(setPersonalData(formData));

    togglePopup();

    setValue({
      ...storedValue,
      name: getValues().name,
      lastname: getValues().lastname,
      birthdate: formatDate(getValues().birthdate, 'DD.MM.YYYY'),
    });

    const birthdate = formatDate(getValues().birthdate, 'YYYY-MM-DD');

    sendQuestionaryData.mutate(
      {
        weight: storedValue.weight as number,
        height: storedValue.height as number,
        gender: storedValue.gender as string,
        name: getValues().name,
        lastname: getValues().lastname,
        birthdate: String(birthdate),
        [UserDataFieldsList.physicalActivity]: storedValue[
          FieldNamesList.physicalActivity
        ] as number,
        [UserDataFieldsList.bodyType]: storedValue[UserDataFieldsList.bodyType] as number,
      },
      {
        onSuccess: () => {
          setStep(StepsList.finalStep);
          dispatch(setCurrentStep(StepsList.finalStep));
          setValue({
            ...storedValue,
            name: getValues().name,
            lastname: getValues().lastname,
            birthdate: getValues().birthdate,
            currentStep: StepsList.finalStep,
          });
        },
      },
    );
  };

  const renderPopup = () => {
    return (
      <>
        <Row
          $alignItems="center"
          $justifyContent="center"
          width="100%"
          margin={`0 0 ${theme.gapSizes.gap16} 0`}
          padding={theme.gapSizes.gap16}
        >
          <Typography fontWeight={600} color={theme.colors.black}>
            {questionaryFormPersonalData.birthdatePopup.heading}
          </Typography>
        </Row>
        <PopupCloseButton onClick={togglePopup} />
        <Row
          margin={`0 0 ${theme.gapSizes.gap32} 0`}
          $alignItems="center"
          $justifyContent={deviceType === DeviceTypeList.desktop ? 'center' : 'flex-start'}
          width="95%"
        >
          <Typography
            variant="p"
            textalign={deviceType === DeviceTypeList.desktop ? 'center' : 'left'}
          >
            {questionaryFormPersonalData.birthdatePopup.text}
          </Typography>
        </Row>
        <Box
          margin={`0 0 ${theme.gapSizes.gap32} 0`}
          flexdirection="column"
          $alignItems={deviceType === DeviceTypeList.desktop ? 'center' : 'flex-start'}
          $justifyContent="center"
          width="95%"
        >
          <Typography
            variant="p"
            fontWeight={600}
            textalign={deviceType === DeviceTypeList.desktop ? 'center' : 'left'}
          >
            {questionaryFormPersonalData.birthdatePopup.birthdateConfitmation}{' '}
            {`${formatDateToLocal(birthdate)}`}?
          </Typography>
        </Box>
        <Box
          width="100%"
          margin={`0 0 ${theme.gapSizes.gap32} 0`}
          flexdirection="column"
          $alignItems="stretch"
          $justifyContent="center"
          gap={theme.gapSizes.gap24}
        >
          <Button variant="primary" type="submit" onClick={handlePopupNext}>
            {questionaryFormPersonalData.buttons.confirm}
          </Button>
        </Box>
      </>
    );
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
            <WhiteBox
              gap={theme.gapSizes.gap12}
              padding={theme.gapSizes.gap16}
              $borderRadius={theme.borderRadius.radius20}
              dataname="inputs-wrap"
            >
              <Input
                name="name"
                visualtype="filled"
                type="text"
                placeholder={questionaryFormPersonalData.inputName}
                register={register}
                validationRules={nameRules}
                padding={`12px ${theme.gapSizes.gap32} 12px 12px`}
                error={!!errors.name}
                onChange={handleChange}
              />
              <Input
                name="lastname"
                visualtype="filled"
                type="text"
                placeholder={questionaryFormPersonalData.inputLastName}
                register={register}
                padding={`12px ${theme.gapSizes.gap32} 12px 12px`}
                validationRules={lastNameRules}
                error={!!errors.lastname}
                onChange={handleChange}
              />
              <Input
                name="birthdate"
                visualtype="filled"
                type="text"
                placeholder={questionaryFormPersonalData.inputBirthdate}
                register={register}
                validationRules={birthdateRules}
                padding={`12px ${theme.gapSizes.gap32} 12px 12px`}
                error={!!errors.birthdate}
                onInput={handleInput}
              />
              {(errors.name || errors.birthdate || sendQuestionaryData.isError) && (
                <Box
                  flexdirection="column"
                  $alignItems="flex-start"
                  width="100%"
                  padding={`${theme.gapSizes.gap8}`}
                  dataname="errors-wrap"
                >
                  {errors.name && (
                    <ErrorMessage width="100%">{String(errors.name.message)}</ErrorMessage>
                  )}
                  {errors.lastname && (
                    <ErrorMessage width="100%">{String(errors.lastname.message)}</ErrorMessage>
                  )}
                  {errors.birthdate && (
                    <ErrorMessage>{String(errors.birthdate.message)}</ErrorMessage>
                  )}
                </Box>
              )}
              <Box width="100%" maxwidth="800px" padding={`0 ${theme.gapSizes.gap16}`}>
                {sendQuestionaryData.isError && (
                  <ErrorMessage>
                    {(sendQuestionaryData.error as ErrorResponse).message}
                  </ErrorMessage>
                )}
              </Box>
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
      <PopupContainer isopened={isPopupOpened} onClose={togglePopup}>
        {renderPopup()}
      </PopupContainer>
    </>
  );
};

export default Step4;
