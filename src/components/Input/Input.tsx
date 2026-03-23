import styled, { css } from 'styled-components';

import type { TextFieldProps } from '@/components/TextField/TextField';
import theme from '@/styles/theme/theme';

export interface ContainerProps {
  $justifyContent?: string;
}

export const InputContainer = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent || 'center'};
  align-items: center;
  width: 100%;
`;

export interface IconContainerProps {
  $iconPosition?: 'left' | 'right';
  right?: string;
  left?: string;
  disabled?: boolean;
}

export const IconContainer = styled.div<IconContainerProps>`
  position: absolute;
  display: flex;
  align-items: center;

  ${props => {
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (props.$iconPosition) {
      case 'right':
        return css`
          right: ${props.right ? props.right : '6%'};
        `;
      case 'left':
        return css`
          left: ${props.left ? props.left : '6%'};

          @media (min-width: ${theme.screenSizes.largeDesktop}) {
            left: 1vw;
          }
        `;
    }
  }}
`;

export const StyledInput = styled.input<TextFieldProps>`
  font-size: ${({ fontSize }) => fontSize || theme.fontSizes.fontSize16};
  width: ${({ width }) => width || '100%'};
  max-width: 750px;
  min-height: 48px;
  padding: ${({ padding }) => padding || '12px'};
  box-sizing: border-box;
  border-radius: ${theme.borderRadius.radius8};
  color: ${theme.colors.black};
  text-align: ${({ $textAlign }) => $textAlign || 'left'};
  outline: none;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${theme.colors.middleGray};
  }
  &:not([value='']):hover {
    border-color: ${theme.colors.middleGray};
  }

  &:focus,
  &:focus-within {
    border-color: ${theme.colors.nutri};
  }
  &:not([value='']):focus {
    border-color: ${theme.colors.nutri};
  }

  &:active {
    border-color: ${theme.colors.nutri};
  }

  &::placeholder {
    color: ${theme.colors.middleGray};
    font-family: Inter;
    font-size: 16px;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  ${props => {
    switch (props.visualtype) {
      case 'filled':
        return css`
          background-color: ${theme.colors.lightGray};
          border: 1px solid ${!props.error ? 'transparent' : theme.colors.darkWar};

          &:not([value='']) {
            background-color: ${theme.colors.lightGray};
            border: 1px solid ${!props.error ? 'transparent' : theme.colors.darkWar};
          }
          &:focus {
            border-color: ${props.error ? theme.colors.darkWar : theme.colors.nutri};
          }
          &:not([value='']):focus {
            border-color: ${props.error ? theme.colors.darkWar : theme.colors.nutri};
          }
          &:disabled {
            color: ${theme.colors.middleGray};
          }
        `;
      case 'outlined':
        return css`
          background-color: 'transparent';
          border: 1px solid ${props.error ? theme.colors.darkWar : theme.colors.nutri};

          &:not([value='']) {
            background-color: 'transparent';
            border-color: ${props.error ? theme.colors.darkWar : theme.colors.nutri};
          }
          &:focus {
            border-color: ${props.error ? theme.colors.darkWar : theme.colors.nutri};
          }
          &:not([value='']):focus {
            border-color: ${props.error ? theme.colors.darkWar : theme.colors.nutri};
          }
        `;
      case 'custom':
        return css`
          background-color: ${props.backgroundcolor ? props.backgroundcolor : theme.colors.white};
          border: ${props.error
            ? `1px solid ${theme.colors.darkWar}`
            : `1px solid ${props.bordercolor ? props.bordercolor : theme.colors.middleGray}`};

          &:focus {
            border-color: ${theme.colors.nutri};
          }
        `;
      default:
        return css`
          background-color: ${props.backgroundcolor
            ? props.backgroundcolor
            : theme.colors.lightGray};
          border: ${props.bordercolor ? `1px solid ${props.bordercolor}` : 'none'};
        `;
    }
  }}

  &[type='date']:in-range::-webkit-datetime-edit-year-field,
  &[type='date']:in-range::-webkit-datetime-edit-month-field,
  &[type='date']:in-range::-webkit-datetime-edit-day-field,
  &[type='date']:in-range::-webkit-datetime-edit-text {
    color: ${theme.colors.middleGray};
  }

  &[type='date'],
  &[type='time'] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    min-width: ${({ width }) => width || '96%'};
    height: 44px;
    border: 1px solid ${({ error }) => (error ? theme.colors.darkWar : 'transparent')};
  }

  &[type='date']:hover,
  &[type='time']:hover,
  &[type='date']:focus,
  &[type='time']:focus,
  &[type='date']:active,
  &[type='time']:active {
    border-color: ${({ error }) => (error ? theme.colors.darkWar : 'transparent')};
  }

  @media (max-width: ${theme.screenSizes.tablet}) {
    &[type='date']:in-range::-webkit-datetime-edit-year-field,
    &[type='date']:in-range::-webkit-datetime-edit-month-field,
    &[type='date']:in-range::-webkit-datetime-edit-day-field,
    &[type='date']:in-range::-webkit-datetime-edit-text {
      color: transparent;
    }

    &[type='date']::before {
      content: attr(placeholder);
      position: absolute;
      font-family: Inter;
      font-size: 16px;
      color: ${theme.colors.middleGray};
    }

    &[type='date']:focus::before,
    &[type='date'].not-empty::before {
      content: '';
    }
  }
`;

// TODO type for register
export const Input: React.FC<TextFieldProps & ContainerProps & IconContainerProps> = ({
  id,
  name,
  icon,
  register,
  $iconPosition = 'right',
  type = 'text',
  error,
  disabled = false,
  onClick,
  onFocus,
  validationRules = {},
  autocomplete = 'off',
  autoFocus,
  ...props
}) => {
  return (
    <InputContainer $justifyContent={props.$justifyContent}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
      {/*// @ts-ignore*/}
      <StyledInput
        {...register(name, validationRules)}
        autoFocus={autoFocus}
        error={error}
        icon={icon}
        type={type}
        id={id}
        min={props.min}
        max={props.max}
        step={props.step}
        autoComplete={autocomplete}
        disabled={disabled}
        onFocus={onFocus}
        onInput={props.onInput}
        {...props}
      />
      {icon && (
        <IconContainer
          id={id}
          $iconPosition={$iconPosition}
          right={props.right}
          left={props.left}
          disabled={disabled}
          onClick={onClick}
        >
          {icon}
        </IconContainer>
      )}
    </InputContainer>
  );
};
