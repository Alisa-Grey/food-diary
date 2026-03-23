import styled, { css } from 'styled-components';

import theme from '@/styles/theme/theme';

interface TooltipProps {
  id?: string;
  background?: string;
  visibility: string;
  children: React.ReactNode;
  variant: 'bottom' | 'top';
}

const StyledTooltip = styled.div<TooltipProps>`
  position: absolute;
  width: 160px;
  padding: ${theme.gapSizes.gap8};
  background-color: ${({ background }) => background || theme.colors.black};
  text-align: center;
  border-radius: ${theme.borderRadius.radius8};
  z-index: 1;
  visibility: ${({ visibility }) => visibility || 'hidden'};
  transition: visibility 0.1s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent ${({ background }) => background || theme.colors.black}
      transparent;
  }

  @media (max-width: ${theme.screenSizes.mobile}) {
    & {
      right: 7%;
    }
  }

  ${props => {
    switch (props.variant) {
      case 'bottom':
        return css`
          & {
            top: 110%;
            right: -67px;
          }
          &::after {
            bottom: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent
              ${props.background ? props.background : theme.colors.black} transparent;
          }
        `;
      case 'top':
        return css`
          & {
            bottom: 100%;
            left: 20%;
          }
          &::after {
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: ${props.background ? props.background : theme.colors.black} transparent
              transparent;
          }
        `;
    }
  }}
`;

export const Tooltip: React.FC<TooltipProps> = ({
  id,
  children,
  background,
  visibility,
  variant = 'bottom',
}) => {
  return (
    <StyledTooltip id={id} background={background} visibility={visibility} variant={variant}>
      {children}
    </StyledTooltip>
  );
};
