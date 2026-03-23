'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import type { FieldError, FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useRegisterUser } from '@/api/requestQuery/userInfo';
import type { ErrorProps } from '@/api/types';
import BackIcon from '@/assets/icons/BackIcon';
import EyeHiddenIcon from '@/assets/icons/EyeHiddenIcon';
import EyeVisibleIcon from '@/assets/icons/EyeVisibleIcon';
import { RoutesList } from '@/components/AuthCheck/AuthCheck';
import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import { CustomLink } from '@/components/CustomLink/CustomLink';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { Row } from '@/components/Flex/Flex';
import { Input } from '@/components/Input/Input';
import { PrealoaderWave } from '@/components/Preloader/Prealoader';
import StickyBox from '@/components/StickyBox/StickyBox';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';
import { checkboxRules, emailRules, passwordRules, passworRepeatRules } from '@/utils/validation';

export interface FormProps {
  email: string;
  password: string;
  passwordRepeat: string;
  rulesAgreement: boolean;
  marketingAgreement?: boolean;
  gender: string;
}

export function Registration() {
  const { registrationCheckboxes } = text;
  const router = useRouter();

  const blockWidth = useScreenWidth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormProps | FieldValues>({
    mode: 'onChange',
  });

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isRepeatShown, setIsRepeatShown] = useState(false);
  const [error, setError] = useState('');

  const registerUser = useRegisterUser();

  const togglePassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const togglePasswordRepeat = () => {
    setIsRepeatShown(!isRepeatShown);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors(e.target.name);
  };

  const onSubmit: SubmitHandler<FormProps | FieldValues> = (data: FormProps | FieldValues) => {
    registerUser.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push(RoutesList.questionary);
        },
        onError: error => {
          setError((error as ErrorProps).message);
        },
      },
    );
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      padding={`${theme.gapSizes.gap16}`}
      background={theme.colors.white}
      flexdirection="column"
      $justifyContent="flex-start"
      $alignItems="center"
      gap={theme.gapSizes.gap16}
    >
      <Row
        height="52px"
        $justifyContent="flex-start"
        $alignItems="center"
        width={blockWidth}
        padding={`0 ${theme.gapSizes.gap16}`}
      >
        <Link passHref legacyBehavior href="/login">
          <CustomLink
            color={theme.colors.black}
            textDecoration="none"
            fontWeight={500}
            icon={<BackIcon />}
            $iconPosition="left"
          >
            {text.registrationFormTitle}
          </CustomLink>
        </Link>
      </Row>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box
          width="100vw"
          flexbasis="90vh"
          background={theme.colors.white}
          flexdirection="column"
          $justifyContent="flex-start"
          $alignItems="center"
          gap={theme.gapSizes.gap4}
        >
          <Box
            flexdirection="column"
            $justifyContent="center"
            $alignItems="center"
            gap={theme.gapSizes.gap12}
            width={blockWidth}
            maxwidth={theme.maxWidth.width750}
            padding={`0 ${theme.gapSizes.gap16}`}
          >
            <Input
              id="email"
              visualtype="filled"
              type="email"
              name="email"
              placeholder={text.registrationFormInputEmail}
              error={!!errors.email}
              register={register}
              validationRules={emailRules}
              onChange={handleInputChange}
            />
            <Input
              id="password"
              disabled={false}
              visualtype="filled"
              name="password"
              type={isPasswordShown ? 'text' : 'password'}
              placeholder={text.registrationFormInputPassword}
              error={!!errors.password}
              register={register}
              icon={isPasswordShown ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
              validationRules={passwordRules}
              onClick={togglePassword}
              onChange={handleInputChange}
            />
            <Input
              id="passwordRepeat"
              disabled={false}
              visualtype="filled"
              name="passwordRepeat"
              type={isRepeatShown ? 'text' : 'password'}
              placeholder={text.registrationFormInputPasswordRepeat}
              error={!!errors.passwordRepeat}
              register={register}
              icon={isRepeatShown ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
              validationRules={passworRepeatRules}
              onClick={togglePasswordRepeat}
              onChange={handleInputChange}
            />
          </Box>
          <Box
            flexdirection="column"
            width={blockWidth}
            maxwidth="800px"
            padding={`${theme.gapSizes.gap16} ${theme.gapSizes.gap24}`}
          >
            {Object.entries(errors).map(
              ([key, value]) =>
                typeof value === 'object' && (
                  <ErrorMessage key={key}>{(value as FieldError).message as string}</ErrorMessage>
                ),
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Box>
          <Box
            flexdirection="column"
            $justifyContent="center"
            $alignItems="start"
            gap={theme.gapSizes.gap8}
            width={blockWidth}
            margin={`0 0 ${theme.gapSizes.gap16}`}
            padding={`0 ${theme.gapSizes.gap16}`}
          >
            <Checkbox
              id="rulesAgreement"
              name="rulesAgreement"
              error={!!errors.rulesAgreement}
              register={register}
              validationRules={checkboxRules}
              onChange={() => clearErrors('rulesAgreement')}
            >
              {registrationCheckboxes.rulesAgreement.plainText}
              <CustomLink
                color={theme.colors.nutri}
                textDecoration="underline"
                href=""
                target="_blank"
              >
                {registrationCheckboxes.rulesAgreement.linkText}
              </CustomLink>
            </Checkbox>
            <Checkbox id="marketingAgreement" name="marketingAgreement" register={register}>
              {registrationCheckboxes.marketingAgreement}
            </Checkbox>
          </Box>
          <StickyBox
            $justifyContent="center"
            $alignItems="stretch"
            margin="auto 0 0 0"
            padding={theme.gapSizes.gap16}
          >
            <Button variant="primary" type="submit">
              {!registerUser.isLoading ? text.registrationFormButtonRegister : <PrealoaderWave />}
            </Button>
          </StickyBox>
        </Box>
      </form>
    </Box>
  );
}
