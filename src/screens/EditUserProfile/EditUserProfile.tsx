'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import { useEditProfile, useLogoutUser } from '@/api/requestQuery/userInfo';
import type { ErrorResponse } from '@/api/types';
import DoorIcon from '@/assets/icons/DoorIcon';
import PencilIcon from '@/assets/icons/PencilIcon';
import { RoutesList } from '@/components/AuthCheck/AuthCheck';
import Box, { PageContainer } from '@/components/Box/Box';
import { BackButton, Button } from '@/components/Button/Button';
import ClickableBox from '@/components/ClickableBox/ClickableBox';
import { ErrorsSection } from '@/components/ErrorsSection/ErrorsSection';
import { FileUploader } from '@/components/FileUploader/FileUploader';
import { Row } from '@/components/Flex/Flex';
import { Input } from '@/components/Input/Input';
import { PageLayout } from '@/components/PageLatout/PageLayout';
import { PopupContainer } from '@/components/Popup/Popup';
import { PopupHeader } from '@/components/Popup/PopupHeader/PopupHeader';
import StickyBox from '@/components/StickyBox/StickyBox';
import { Toggle } from '@/components/Toggle/Toggle';
import { Typography } from '@/components/Typography/Typography';
import WhiteBox from '@/components/WhiteBox/WhiteBox';
import text from '@/locales/translation.json';
import { ConfirmationPopup } from '@/popups/ConfirmationPopup/ConfirmationPopup';
import { useAppDispatch, useAppSelector } from '@/store';
import { setEmptyUser } from '@/store/reducer/userSlice';
import theme from '@/styles/theme/theme';
import { clearLocalStorage, formatBirthdate, formatGender } from '@/utils/helpers';
import { emailRules, lastNameRules, nameRules, phoneRules } from '@/utils/validation';

interface FormProps {
  name: string;
  lastname?: string;
  email: string;
  phone?: string;
  photo?: File;
  isAllowedNotifications?: boolean;
}

enum PopupStateList {
  photoUploader = 'photoUploader',
  saveUpdates = 'saveUpdates',
  logout = 'logout',
}

export function EditUserProfile() {
  const { userProfileScreen } = text;
  const {
    personalData,
    changePhoto,
    personalOffers,
    saveButton,
    exitPopup,
    placeholders,
    avatarPlaceholder,
    uploadPhoto,
    saveUpdatesPopup,
  } = userProfileScreen;
  const [name, lastname, email, phone] = placeholders;
  const [title, description] = personalOffers;
  const [heading, primaryButton, secondaryButton] = exitPopup;
  const [saveUpdatesPrimary, saveUpdatesSecondary] = saveUpdatesPopup.buttons;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const logout = useLogoutUser();
  const editProfile = useEditProfile();

  const user = useAppSelector(store => store.user);

  const birthdate = formatBirthdate(user.birthdate);
  const avatarPath = user.photo ?? '/avatar.png';
  const userGender = formatGender(user.gender);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps | FieldValues>({
    defaultValues: {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      photo: user.photo,
    },
  });

  const [isNotifications, setIsNotifications] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [popupState, setPopupState] = useState<PopupStateList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [image, setImage] = useState('');

  const toggleNotifications = () => {
    setIsNotifications(!isNotifications);
    setIsChanged(true);
  };

  const handleBack = () => {
    router.push(RoutesList.profile);
  };

  const onBackButtonClick = () => {
    if (isChanged) {
      setPopupState(PopupStateList.saveUpdates);
    } else {
      handleBack();
    }
  };

  const handleInput = () => {
    setIsChanged(true);
    setError('');
  };

  const closePopup = () => {
    setPopupState(null);
  };

  const handleLogout = () => {
    logout.mutate();
  };

  const handleUploadPhoto = () => {
    setImage(URL.createObjectURL(files[0] as File));
    setIsChanged(true);
    setPopupState(null);
  };

  const handleCancelUpload = () => {
    setFiles([]);
    closePopup();
  };

  const onSubmit: SubmitHandler<FormProps | FieldValues> = (data: FormProps | FieldValues) => {
    editProfile.mutate(
      {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone ?? '',
        photo: files[0],
        isAllowedNotifications: isNotifications,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['userData'] });
          closePopup();
          setFiles([]);
          router.push(RoutesList.profile);
        },
      },
    );

    setIsChanged(false);
  };

  useEffect(() => {
    if (editProfile.error) {
      setError((editProfile.error as ErrorResponse).message);
    }
  }, [editProfile.error]);

  useEffect(() => {
    setImage(files.length ? URL.createObjectURL(files[0] as File) : '');
  }, [files]);

  useEffect(() => {
    if (logout.isSuccess) {
      clearLocalStorage(['wasChanged']);
      dispatch(setEmptyUser());
      router.push(RoutesList.login);
    }
  }, [dispatch, logout.isSuccess, router]);

  return (
    <PageContainer>
      <PageLayout>
        <WhiteBox
          padding={`${theme.gapSizes.gap16} ${theme.gapSizes.gap8}`}
          $borderRadius={`0 0 ${theme.borderRadius.radius20}  ${theme.borderRadius.radius20}`}
        >
          <Box
            width="100%"
            background={theme.colors.white}
            flexdirection="column"
            $justifyContent="center"
            $alignItems="flex-start"
            dataname="header"
            $borderRadius={`0px 0px ${theme.borderRadius.radius20} ${theme.borderRadius.radius20}`}
          >
            <BackButton onClick={onBackButtonClick}>{personalData}</BackButton>
            <Box flexdirection="column" $alignItems="center" width="100%">
              <Row width="100%" $justifyContent="flex-end">
                <Button
                  variant="text"
                  padding={theme.gapSizes.gap4}
                  className="button-with-svg--danger"
                  onClick={() => setPopupState(PopupStateList.logout)}
                >
                  <DoorIcon />
                </Button>
              </Row>
              <Box
                flexdirection="column"
                width="100%"
                $alignItems="center"
                gap={theme.gapSizes.gap8}
              >
                <ClickableBox
                  width="60px"
                  height="60px"
                  position="relative"
                  onClick={() => setPopupState(PopupStateList.photoUploader)}
                >
                  <Image
                    src={image ? image : avatarPath}
                    alt={avatarPlaceholder}
                    layout="fill"
                    objectFit="cover"
                    style={{ borderRadius: '50%' }}
                  />
                  <Box
                    position="absolute"
                    width="60px"
                    height="60px"
                    $borderRadius="50%"
                    $justifyContent="center"
                    $alignItems="center"
                    background={theme.colors.darkTransparent}
                  >
                    <PencilIcon color={theme.colors.white} />
                  </Box>
                </ClickableBox>
                <Typography>{changePhoto}</Typography>
              </Box>
            </Box>
          </Box>
        </WhiteBox>
        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <Box flexdirection="column" width="100%" gap={theme.gapSizes.gap8}>
            <WhiteBox gap={theme.gapSizes.gap12} width="100%">
              <Row $justifyContent="space-between" width="100%">
                <Typography fontSize={theme.fontSizes.fontSize14} color={theme.colors.darkGray}>
                  {userGender}
                </Typography>
                <Typography fontSize={theme.fontSizes.fontSize14} color={theme.colors.darkGray}>
                  {birthdate}
                </Typography>
              </Row>
              <Box flexdirection="column" gap={theme.gapSizes.gap12} width="100%">
                <Input
                  name="name"
                  visualtype="filled"
                  type="text"
                  placeholder={name}
                  register={register}
                  validationRules={nameRules}
                  error={!!errors.name}
                  onInput={handleInput}
                />
                <Input
                  name="lastname"
                  visualtype="filled"
                  type="text"
                  placeholder={lastname}
                  register={register}
                  validationRules={lastNameRules}
                  error={!!errors.lastname}
                  onInput={handleInput}
                />
                <Input
                  disabled
                  name="email"
                  visualtype="filled"
                  type="text"
                  placeholder={email}
                  register={register}
                  validationRules={emailRules}
                  error={!!errors.email}
                  onInput={handleInput}
                />
                <Input
                  name="phone"
                  visualtype="filled"
                  type="text"
                  placeholder={phone}
                  register={register}
                  validationRules={phoneRules}
                  error={!!errors.phone}
                  onInput={handleInput}
                />
              </Box>
              <ErrorsSection formErrors={errors} error={error} />
            </WhiteBox>
            <WhiteBox flexdirection="row" $justifyContent="space-between" $alignItems="center">
              <Box flexdirection="column" gap={theme.gapSizes.gap4}>
                <Typography fontWeight={500}>{title}</Typography>
                <Typography fontSize={theme.fontSizes.fontSize12} color={theme.colors.middleGray}>
                  {description}
                </Typography>
              </Box>
              <Toggle
                id="isPersonalNotifications"
                checked={isNotifications}
                onChange={toggleNotifications}
              ></Toggle>
            </WhiteBox>
            <StickyBox>
              <Button variant="primary" disabled={!isChanged}>
                {saveButton}
              </Button>
            </StickyBox>
          </Box>
        </form>
      </PageLayout>
      <PopupContainer isopened={!!popupState} onClose={closePopup}>
        {popupState === PopupStateList.logout && (
          <ConfirmationPopup
            title={heading as string}
            actions={
              <>
                <Button variant="primary" onClick={closePopup}>
                  {primaryButton}
                </Button>
                <Button
                  variant="secondary"
                  icon={<DoorIcon />}
                  $iconPosition="static"
                  iconRight="20%"
                  onClick={handleLogout}
                >
                  {secondaryButton}
                </Button>
              </>
            }
            onClose={closePopup}
          />
        )}
        {popupState === PopupStateList.photoUploader && (
          <>
            <PopupHeader title={uploadPhoto.title} onClose={handleCancelUpload} />
            <FileUploader
              name="profilePhoto"
              files={files}
              setFiles={setFiles}
              onClick={handleUploadPhoto}
              onClose={handleCancelUpload}
            />
          </>
        )}
        {popupState === PopupStateList.saveUpdates && (
          <ConfirmationPopup
            title={saveUpdatesPopup.title}
            actions={
              <>
                <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                  {saveUpdatesPrimary}
                </Button>
                <Button variant="secondary" iconRight="20%" onClick={handleBack}>
                  {saveUpdatesSecondary}
                </Button>
              </>
            }
            onClose={closePopup}
          />
        )}
      </PopupContainer>
    </PageContainer>
  );
}
