import React from 'react';
import type { useForm } from 'react-hook-form';
import styled from 'styled-components';

import theme from '@/styles/theme/theme';

export interface TextFieldProps {
  id?: string;
  placeholder?: string;
  value?: string;
  name: string;
  fontSize?: string;
  $textAlign?: string;
  bordercolor?: string;
  backgroundcolor?: string;
  width?: string;
  padding?: string;
  error?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
  $iconPosition?: 'left' | 'right';
  visualtype: 'filled' | 'outlined' | 'custom';
  type: 'text' | 'email' | 'number' | 'password' | 'date' | 'time';
  disabled?: boolean;
  register: ReturnType<typeof useForm>['register'];
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onFocus?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  validationRules?: Object;
  autocomplete?: string;
  max?: string;
  min?: string;
  step?: string;
  autoFocus?: boolean;
}

const StyledInput = styled.input<TextFieldProps>`
  font-size: ${({ fontSize }) => fontSize || '16px'};
  border: 1px solid ${({ bordercolor }) => bordercolor || 'transparent'};
  background-color: ${({ backgroundcolor }) => backgroundcolor || theme.colors.lightGray};
  width: ${({ width }) => width || '100%'};
  padding: ${({ padding }) => padding || theme.gapSizes.gap8};
  box-sizing: border-box;
  border-radius: 8px;
  margin-bottom: ${theme.gapSizes.gap8};

  &:focus {
    outline: none;
    border-color: ${({ bordercolor }) => bordercolor || '#007bff'};
  }
`;

export const TextField: React.FC<TextFieldProps> = ({ placeholder, value, onChange, ...props }) => {
  return <StyledInput placeholder={placeholder} value={value} onChange={onChange} {...props} />;
};
