/* eslint-disable @typescript-eslint/naming-convention */
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { ErrorCode, useDropzone } from 'react-dropzone';

import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';

import Box from '../Box/Box';
import { Button } from '../Button/Button';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Typography } from '../Typography/Typography';
import { FileInput } from './InputFileUploader/InputFileUploader';
import {
  convertPdfToImages,
  getFileFromBase64,
  previewHeight,
  previewWidth,
  resizeFile,
} from './utils/fileUploaderUtils';

interface Props {
  isCertificate?: boolean;
  isMultiple?: boolean;
  name: string;
  files: File[];
  setFiles: (value: File[]) => void;
  onClick: () => void;
  onClose: () => void;
}

interface FileWithPreview extends File {
  preview?: string;
}

export const FileUploader: React.FC<Props> = ({
  isCertificate,
  isMultiple,
  files,
  name,
  setFiles,
  onClick,
  onClose,
}: Props) => {
  const { addFiles, uploadPhoto } = text.userProfileScreen;
  const { filesAmount } = text.errorMessages;
  const [primaryButton, secondaryButton] = uploadPhoto.buttons;
  const [error, setError] = useState('');

  const aspectRatio = isCertificate ? 16 / 12 : 1 / 1;

  const onDrop = useCallback(
    async (files: File[]) => {
      setError('');
      await Promise.all(
        files.map(async file => {
          let fileItem = file;
          if (file.type.includes('pdf')) {
            const base64Url = await convertPdfToImages(file);
            fileItem = await getFileFromBase64(base64Url);
          }

          return resizeFile(fileItem);
        }),
      ).then(filesUploaded => {
        filesUploaded.forEach((file: unknown) => {
          Object.assign(file as File, {
            preview: URL.createObjectURL(file as File),
          });
        });
        const filesArr = (prevValues: File[]) => [...prevValues, ...filesUploaded];
        setFiles(filesArr as unknown as File[]);
      });
    },
    [setFiles],
  );

  const { getRootProps, getInputProps } = useDropzone({
    multiple: isMultiple,
    maxFiles: 10,
    accept: {
      'image/*': ['.jpeg', 'jpg', '.png'],
      'application/pdf': ['.pdf'],
    },
    onDrop,
    onDropRejected(fileRejections) {
      fileRejections.map(item => {
        if (item.errors.some(error => error.code === ErrorCode.TooManyFiles)) {
          setError(filesAmount);
        }
      });
    },
  });

  const thumbs = files.map((file: FileWithPreview) => (
    <Box key={file.name}>
      <Box>
        <Image
          width={previewWidth}
          height={previewHeight / aspectRatio}
          layout="responsive"
          alt={file.name}
          src={file.preview as string}
        />
      </Box>
    </Box>
  ));

  return (
    <>
      <Box
        {...getRootProps()}
        flexdirection="column"
        width="100%"
        height="100%"
        $alignItems="center"
        gap={theme.gapSizes.gap12}
        padding={`${theme.gapSizes.gap8} 0 0`}
      >
        {!!files.length && (
          <Box
            $flexWrap="wrap"
            $justifyContent="center"
            gap={theme.gapSizes.gap8}
            className="scrollable-block"
          >
            {thumbs}
          </Box>
        )}
        <Box
          flexdirection="column"
          width="100%"
          $alignItems="center"
          gap={theme.gapSizes.gap12}
          padding={`0 0 ${theme.gapSizes.gap24}`}
          className="file-uploader"
        >
          <FileInput name={name} {...getInputProps()} />
          <Typography color={theme.colors.darkGray} $textDecoration="underline">
            {addFiles}
          </Typography>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Box>
      </Box>
      <Box
        flexdirection="column"
        $alignItems="stretch"
        width="100%"
        $justifyContent="center"
        padding="0"
        dataname="buttons-wrap"
        gap={theme.gapSizes.gap8}
      >
        {files.length > 0 ? (
          <Box
            width="100%"
            $justifyContent="space-between"
            gap={theme.gapSizes.gap16}
            margin={`${theme.gapSizes.gap12} 0 `}
          >
            <Box flexbasis="40%" flexdirection="column" $alignItems="stretch">
              <Button variant="secondary" onClick={onClose}>
                {secondaryButton}
              </Button>
            </Box>
            <Box flexbasis="60%" flexdirection="column" $alignItems="stretch">
              <Button variant="primary" onClick={onClick}>
                {primaryButton}
              </Button>
            </Box>
          </Box>
        ) : (
          <Button variant="secondary" onClick={onClose}>
            {secondaryButton}
          </Button>
        )}
      </Box>
    </>
  );
};
