// Button.tsx
import type { ReactNode } from 'react';
import React from 'react';
import styled, { css } from 'styled-components';

import BackIcon from '@/assets/icons/BackIcon';
import theme from '@/styles/theme/theme';

import { Row } from '../Flex/Flex';

export interface ButtonProps {
  backgroundcolor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  activeBackgroundColor?: string;
  activeTextColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: number;
  padding?: string;
  margin?: string;
  $borderRadius?: string;
  border?: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  onClick?:
    | (() => void)
    | ((e: React.MouseEvent<HTMLElement>) => void)
    | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  children: ReactNode;
  icon?: React.ReactNode;
  $iconPosition?: 'left' | 'right' | 'static';
  iconLeft?: string;
  iconRight?: string;
  $justifyContent?: string;
  type?: string;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  id?: number | string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'info'
    | 'text'
    | 'fancy'
    | 'primary-soft'
    | 'outlined';
}

const IconContainer = styled.div<{
  position?: 'left' | 'right' | 'static';
  left?: string;
  right?: string;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;

  ${props => {
    switch (props.position) {
      case 'right':
        return css`
          right: ${props.right ?? theme.gapSizes.gap16};
        `;
      case 'left':
        return css`
          left: ${props.left ?? theme.gapSizes.gap16};
        `;
      case 'static':
        return css`
          position: static;
          transform: none;
          margin-right: ${theme.gapSizes.gap8};
        `;
      default:
        return css`
          left: ${theme.gapSizes.gap16};
        `;
    }
  }}
  }}
`;

const StyledButton = styled.button<ButtonProps>`
  position: ${({ icon }) => (icon ? 'relative' : 'static')};
  display: inline-flex;
  justify-content: ${({ $justifyContent }) => $justifyContent || 'center'};
  align-items: center;
  width: ${({ width }) => width || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || '100%'};
  height: ${({ height }) => height || 'auto'};
  margin: ${({ margin }) => margin || '0'};
  font-family: 'Inter', sans-serif;
  font-size: ${({ fontSize }) => fontSize || theme.fontSizes.fontSize16};
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  border-radius: ${({ $borderRadius }) => $borderRadius || theme.borderRadius.radius8};
  border: ${({ border }) => border || 'none'};
  cursor: pointer;
  transition-property: transform, background-color, color, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease;
  &:active {
    box-shadow: 0px 0px 0px 4px ${theme.colors.lightGray};
  }
  &:disabled {
    pointer-events: none;
  }

  & > svg > path,
  & > svg > circle {
    transition-property: fill, stroke;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }

  &:active {
    box-shadow: none;
  }

  &:active > svg > circle {
    stroke: ${theme.colors.darkNutri};
  }

  &:disabled > svg > path {
    fill: ${theme.colors.darkGray};
  }

  &:disabled > svg > circle {
    stroke: ${theme.colors.darkGray};
  }

  ${props => {
    switch (props.$iconPosition) {
      case 'left':
        return css`
          padding: ${props.padding ??
            `${theme.gapSizes.gap12} ${theme.gapSizes.gap16} ${theme.gapSizes.gap12}`}
            ${theme.gapSizes.gap42};
        `;
      case 'right':
        return css`
          padding: ${props.padding
            ? props.padding
            : `${theme.gapSizes.gap12} ${theme.gapSizes.gap16}`};
        `;
      case 'static':
        return css`
          padding: ${props.padding
            ? props.padding
            : `${theme.gapSizes.gap12} ${theme.gapSizes.gap16}`};
        `;
      default:
        return css`
          padding: ${props.padding
            ? props.padding
            : `${theme.gapSizes.gap12} ${theme.gapSizes.gap16}`};
        `;
    }
  }}

  ${props => {
    switch (props.variant) {
      case 'primary':
        return css`
         margin=${theme.gapSizes.gap8} ${theme.gapSizes.gap8} ${theme.gapSizes.gap16};
          background-color: ${theme.colors.nutri};
          color: ${theme.colors.white};
          font-weight: 500;

          &:hover {
            background-color: ${theme.colors.middleNutri};
            color: ${theme.colors.white};
          }
         
          &:hover > svg > path {
            fill: ${theme.colors.white};
          }

          &:active {
            color: ${theme.colors.white};
            background-color: ${theme.colors.darkNutri};
          }

          &:disabled {
            background-color: ${theme.colors.lightGray};
            color: ${theme.colors.middleGray};
          }
        `;
      case 'secondary':
        return css`
          background-color: ${theme.colors.lightGray};
          color: ${props.color ? props.color : theme.colors.black};
          font-weight: 500;
          &:disabled {
            color: ${theme.colors.middleGray};
            border: 1px solid ${theme.colors.middleGray};
            background-color: transparent;
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          font-weight: ${props.fontWeight ?? 400};
          color: ${props.color ? props.color : theme.colors.black};
          padding: ${props.padding
            ? props.padding
            : `${theme.gapSizes.gap12} ${theme.gapSizes.gap4}`};

          &:hover {
            color: ${theme.colors.middleNutri};
          }

          &:active {
            color: ${theme.colors.darkNutri};
          }

          &:disabled {
            color: ${theme.colors.middleGray};
            border: 1px solid ${theme.colors.middleGray};
            background-color: transparent;
          }
        `;
      case 'danger':
        return css`
          background-color: ${theme.colors.softDist};
          color: ${theme.colors.darkDist};
          font-weight: 500;

          &:disabled {
            color: #ef6d7e;
            border: 1px solid ${theme.colors.middleGray};
            background-color: transparent;
          }
        `;
      case 'info':
        return css`
          background-color: ${theme.colors.softWater};
          color: ${theme.colors.water};

          &:hover {
            background-color: #dbf4ff;
          }
          &:disabled {
            color: ${theme.colors.middleGray};
            background-color: ${theme.colors.lightGray};
          }
        `;
      case 'fancy':
        return css`
          position: relative;
          padding: ${theme.gapSizes.gap16} ${theme.gapSizes.gap42};
          background: linear-gradient(160deg, rgba(25, 193, 82, 1) 44%, rgba(128, 255, 172, 1) 98%);
          color: ${theme.colors.white};
          border-radius: ${theme.borderRadius.radius12};

          &::after {
            content: '';
            position: absolute;
            top: -4px;
            right: -4px;
            bottom: -4px;
            left: -4px;
            border: 2px solid ${theme.colors.nutri};
            border-radius: 15px;
            transition: border-color 0.2s ease;
          }

          &:hover::after {
            border-color: #84eda5;
          }
        `;
      case 'primary-soft':
        return css`
          background-color: ${theme.colors.softNutri};
          color: ${theme.colors.nutri};
          font-weight: 500;

          &:disabled {
            color: ${theme.colors.middleGray};
            cursor: not-allowed;
          }

          &:disabled > div > svg > path {
            fill: ${theme.colors.middleGray};
          }
        `;
      case 'outlined':
        return css`
          color: ${theme.colors.nutri};
          background-color: ${theme.colors.white};
          border: 1px solid ${theme.colors.nutri};
        `;
      default:
        return css`
          background-color: ${props.backgroundcolor ? props.backgroundcolor : theme.colors.nutri};
          color: ${props.color ? props.color : theme.colors.white};

          &:hover {
            color: ${props.hoverTextColor ? props.hoverTextColor : theme.colors.white};
          }

          &:active {
            background-color: ${props.activeBackgroundColor
              ? props.activeBackgroundColor
              : theme.colors.darkNutri};
            color: ${props.activeTextColor ? props.activeTextColor : theme.colors.white};
          }

          &:disabled {
            color: ${theme.colors.middleGray};
            border: 1px solid ${theme.colors.middleGray};
            background-color: transparent;
          }
        `;
    }
  }};
`;

export const BackButton = ({ onClick, children }: ButtonProps) => {
  return (
    <Row $justifyContent="flex-start" $alignItems="center" width="100%">
      <Button
        variant="text"
        color={theme.colors.black}
        padding={theme.gapSizes.gap8}
        icon={<BackIcon />}
        $iconPosition="static"
        fontWeight={500}
        onClick={onClick}
      >
        {children}
      </Button>
    </Row>
  );
};

export const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  $iconPosition,
  className,
  ariaLabel,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      icon={icon}
      $iconPosition={$iconPosition}
      className={className}
      aria-label={ariaLabel}
      disabled={disabled}
      id={props.id}
      fontWeight={props.fontWeight}
      maxWidth={props.maxWidth}
      {...props}
    >
      {icon && (
        <IconContainer position={$iconPosition} left={props.iconLeft} right={props.iconRight}>
          {icon}
        </IconContainer>
      )}
      {children}
    </StyledButton>
  );
};
