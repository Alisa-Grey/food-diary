'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useLoginUser } from '@/api/requestQuery/userInfo';
import type { ErrorResponse } from '@/api/types';
import EyeHiddenIcon from '@/assets/icons/EyeHiddenIcon';
import EyeVisibleIcon from '@/assets/icons/EyeVisibleIcon';
import { RoutesList } from '@/components/AuthCheck/AuthCheck';
import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { Row } from '@/components/Flex/Flex';
import { Input } from '@/components/Input/Input';
import { PrealoaderWave } from '@/components/Preloader/Prealoader';
import StickyBox from '@/components/StickyBox/StickyBox';
import { Typography } from '@/components/Typography/Typography';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';
import { DeviceTypeList, getDeviceType } from '@/utils/helpers';
import { emailRules, passwordRules } from '@/utils/validation';

interface FormProps extends FieldValues {
  email: string;
  password: string;
}

export function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormProps | FieldValues>({ mode: 'all' });

  const logoDesktopPath = '/nutrimania_logo_desktop.svg';
  const logoMobilePath = '/nutrimania_logo_mobile.svg';

  const deviceType = getDeviceType();

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const router = useRouter();

  const login = useLoginUser();

  const blockWidth = useScreenWidth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormFilled(!!e.target.value.length);
    setValue(e.target.name, e.target.value.trim());
  };

  const onSubmit: SubmitHandler<FormProps | FieldValues> = (data: FormProps | FieldValues) => {
    login.mutate(
      {
        email: data.email || getValues().email,
        password: data.password || getValues().password,
      },
      {
        onSuccess: () => {
          router.push(RoutesList.questionary);
        },
      },
    );
  };

  const handleRegisterClick = () => {
    router.push(RoutesList.registration);
  };

  const togglePassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <Box>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box
          width="100vw"
          height="100vh"
          padding={`${theme.gapSizes.gap24} ${theme.gapSizes.gap24} 0`}
          background={theme.colors.white}
          flexdirection="column"
          $justifyContent="flex-start"
          $alignItems="center"
          gap={theme.gapSizes.gap16}
        >
          <Row width="100vw" height="52px" $justifyContent="center" $alignItems="center">
            {deviceType === DeviceTypeList.mobile ? (
              <Image src={logoMobilePath} alt={text.description} width={117} height={24} />
            ) : (
              <Image src={logoDesktopPath} alt={text.description} width={140} height={24} />
            )}
          </Row>
          <Box
            flexdirection="column"
            $justifyContent="center"
            $alignItems="center"
            gap={theme.gapSizes.gap12}
            padding={`0 ${theme.gapSizes.gap16}`}
            width={blockWidth}
            maxwidth={theme.maxWidth.width750}
          >
            <Input
              type="email"
              name="email"
              placeholder={text.registrationFormInputEmail}
              register={register}
              validationRules={emailRules}
              error={!!errors.email?.message}
              visualtype="filled"
              onChange={handleChange}
            />
            <Input
              disabled={false}
              name="password"
              visualtype="filled"
              type={isPasswordShown ? 'text' : 'password'}
              placeholder={text.registrationFormInputPassword}
              register={register}
              validationRules={passwordRules}
              error={!!errors.password?.message}
              icon={isPasswordShown ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
              onClick={togglePassword}
              onChange={handleChange}
            />
            <Box width="100%" maxwidth="800px" padding={`0 ${theme.gapSizes.gap16}`}>
              {(errors.email || errors.password) && (
                <ErrorMessage>
                  {errors.email?.message
                    ? String(errors.email.message)
                    : String(errors.password?.message)}
                </ErrorMessage>
              )}
              {login.isError && (
                <ErrorMessage>{(login.error as ErrorResponse).message}</ErrorMessage>
              )}
            </Box>
          </Box>
          <StickyBox
            $justifyContent="center"
            $alignItems="stretch"
            gap={theme.gapSizes.gap16}
            maxwidth="850px"
            margin="auto 0 0 0"
            padding={theme.gapSizes.gap16}
          >
            <Button type="submit" variant={isFormFilled ? 'primary' : 'secondary'}>
              {!login.isLoading ? text.registrationFormButtonLogin : <PrealoaderWave />}
            </Button>
            <Button variant={isFormFilled ? 'secondary' : 'primary'} onClick={handleRegisterClick}>
              {text.registrationFormButtonRegister}
            </Button>
            <Row width="100%" $justifyContent="center" $alignItems="center">
              <Typography
                variant="p"
                color={theme.colors.middleGray}
                fontSize={theme.fontSizes.fontSize12}
              >
                {text.copywrite}
              </Typography>
            </Row>
          </StickyBox>
        </Box>
      </form>
    </Box>
  );
}
