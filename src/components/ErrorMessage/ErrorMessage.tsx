import styled from 'styled-components';

import theme from '@/styles/theme/theme';

import type { FlexProps } from '../Flex/Flex';

interface ErrorMessageProps {
  width?: string;
  color?: string;
  children: string;
}

const StyledErrorMessage = styled.p`
  color: ${({ color }) => color || theme.colors.darkWar};
  font-size: ${theme.fontSizes.fontSize16};
  line-height: 1.5;
  padding-left: 8px;
`;

const ErrorIcon = styled.div`
  display: inline-block;
  width: ${theme.iconSizes.regular};
  height: ${theme.iconSizes.regular};
  background-image: url(/alarm.png);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: contain;
`;

const Container = styled.div<FlexProps>`
  display: grid;
  grid-template-columns: 24px 95%;
`;

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, width = '100%' }) => {
  return (
    <Container width={width} $justifyContent="flex-start" $alignItems="flex-start">
      <ErrorIcon />
      <StyledErrorMessage>{children}</StyledErrorMessage>
    </Container>
  );
};
