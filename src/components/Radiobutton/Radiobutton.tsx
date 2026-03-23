import React from 'react';
import type { FieldValues, useForm, UseFormRegister } from 'react-hook-form';
import styled, { css } from 'styled-components';

import theme from '@/styles/theme/theme';

import Box from '../Box/Box';

export enum RadiobuttonVariantsList {
  filled = 'filled',
  text = 'text',
  special = 'special',
}

interface LabelProps {
  children: React.ReactNode;
  flexbasis?: string;
  width?: string;
  $justifyContent?: string;
  backgroundcolor?: string;
  color?: string;
  error?: boolean;
  variant:
    | RadiobuttonVariantsList.filled
    | RadiobuttonVariantsList.text
    | RadiobuttonVariantsList.special;
  textalign?: string;
}

export interface RadiobuttonProps {
  key?: string;
  name?: string;
  id: string;
  value: string | number;
  register?: ReturnType<typeof useForm>['register'];
  validationRules?: Object;
  variant:
    | RadiobuttonVariantsList.filled
    | RadiobuttonVariantsList.text
    | RadiobuttonVariantsList.special;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ColorMarkProps {
  background?: string;
}

export const StyledRadiobutton = styled.input<RadiobuttonProps>`
  width: 1px;
  height: 1px;
  opacity: 0.1;

  ${props => {
    switch (props.variant) {
      case RadiobuttonVariantsList.filled:
        return css`
          &:checked + label {
            color: ${theme.colors.white};
            background-color: ${theme.colors.nutri};
          }

          &:checked + label > p {
            color: ${theme.colors.white};
          }
        `;
      case RadiobuttonVariantsList.text:
        return css`
          &:checked + label {
            position: relative;
            color: ${theme.colors.nutri};
          }
          &:checked + label > p,
          &:checked + label > div > p {
            color: ${theme.colors.nutri};
          }
          &:checked + label::after {
            content: '';
            position: absolute;
            top: 25%;
            right: 2px;
            transform: rotate(45deg);
            color: ${theme.colors.nutri};
            display: inline-block;
            transform:;
            height: 17px;
            width: 8px;
            border-bottom: 2px solid ${theme.colors.nutri};
            border-right: 2px solid ${theme.colors.nutri};
          }
        `;
      case RadiobuttonVariantsList.special:
        return css`
          &:checked + label {
            border: 1px solid ${theme.colors.nutri};
            background-color: ${theme.colors.softNutri};
          }
        `;
    }
  }}

}`;

export const StyledLabel = styled.label<LabelProps>`
  flex-basis: ${({ flexbasis }) => flexbasis || 'auto'};
  display: block;
  width: ${({ width }) => width || '100%'};
  max-width: 640px;

  cursor: pointer;
  transition-property: color, background-color, border-color, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  text-align: ${({ textalign }) => textalign || 'left'};
  font-size: ${theme.fontSizes.fontSize16};
  border-radius: ${theme.borderRadius.radius12};
  border: 1px solid ${({ error }) => (error ? theme.colors.darkWar : 'transparent')};

  &:active {
    box-shadow: 0px 0px 0px 4px ${theme.colors.lightGray};
  }

  ${props => {
    switch (props.variant) {
      case RadiobuttonVariantsList.filled:
        return css`
          padding: 14px ${theme.gapSizes.gap16};
          color: ${theme.colors.black};
          background-color: ${theme.colors.lightGray};

          &:hover {
            border-color: ${theme.colors.middleNutri};
          }

          &:active {
            box-shadow: 0px 0px 0px 4px ${theme.colors.lightGray};
          }
        `;
      case RadiobuttonVariantsList.text:
        return css`
          padding: ${theme.gapSizes.gap8} 0 0;
          font-weight: 600;
          color: ${theme.colors.darkBlack};
          background: transparent;

          &:hover {
            color: ${theme.colors.middleNutri};
          }
        `;
      case RadiobuttonVariantsList.special:
        return css`
          display: flex;
          align-items: center;
          gap: 6px;
          padding: ${theme.gapSizes.gap12};
          color: ${theme.colors.darkGray};
          font-weight: 500;
          background-color: ${theme.colors.white};
          border: 1px solid ${theme.colors.darkGray};
          border-radius: ${theme.borderRadius.radius12};
        `;
    }
  }}
`;

const ColorMark = styled.div<ColorMarkProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.background};
`;

export const Radiobutton: React.FC<RadiobuttonProps & LabelProps & ColorMarkProps> = ({
  key,
  children,
  name,
  id,
  value,
  error,
  register,
  validationRules,
  variant = RadiobuttonVariantsList.filled,
  onChange,
  ...props
}) => {
  return (
    <Box
      width={props.width}
      flexdirection="column"
      $justifyContent={props.$justifyContent}
      $alignItems="stretch"
    >
      <StyledRadiobutton
        key={key}
        id={id}
        value={value}
        type="radio"
        variant={variant}
        {...(register as UseFormRegister<FieldValues>)(String(name), validationRules)}
        onChange={onChange}
        {...props}
      />
      <StyledLabel
        htmlFor={id}
        flexbasis={props.flexbasis}
        textalign={props.textalign}
        error={error}
        variant={variant}
      >
        {variant === RadiobuttonVariantsList.special && <ColorMark background={props.background} />}
        {children}
      </StyledLabel>
    </Box>
  );
};
