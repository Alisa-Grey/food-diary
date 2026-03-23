import type { useForm } from 'react-hook-form';
import styled from 'styled-components';

import theme from '@/styles/theme/theme';

interface IndicatorProps {
  error?: boolean;
}

interface CheckboxProps extends IndicatorProps {
  id: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  register: ReturnType<typeof useForm>['register'];
  validationRules?: Object;
  variant?: 'standard' | 'block';
}

const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

const Label = styled.label`
  position: relative;
  display: inline-block;
  margin: 0;
  padding-left: ${theme.gapSizes.gap32};
  cursor: pointer;
`;

const Indicator = styled.div<IndicatorProps>`
  width: 20px;
  height: 20px;
  background: ${theme.colors.lightGray};
  position: absolute;
  top: 0;
  left: -0px;
  border: 1px solid ${({ error }) => (error ? theme.colors.darkWar : 'transparent')};
  border-radius: ${theme.borderRadius.radius4};
  transition-property: border-color, background, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease;

  &:hover,
  ${Label}:hover & {
    border-color: ${theme.colors.middleNutri};
  }

  &:active,
  ${Label}:active & {
    box-shadow: 0px 0px 0px 4px ${theme.colors.lightGray};
    border-color: ${theme.colors.darkNutri};
  }

  ${Input}:checked + & {
    background: url(/checkmark.svg);
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  error,
  children,
  validationRules = {},
  register,
}) => {
  return (
    <Label htmlFor={id}>
      {children}
      <Input id={id} type="checkbox" {...register(name, validationRules)} />
      <Indicator error={error} />
    </Label>
  );
};
