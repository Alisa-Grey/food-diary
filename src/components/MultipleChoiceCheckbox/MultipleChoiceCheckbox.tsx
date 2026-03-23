import { type FieldPath } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import theme from '@/styles/theme/theme';

import Box from '../Box/Box';
import { Typography } from '../Typography/Typography';

interface MultipleChoiceCheckboxProps {
  id: string;
  name: FieldPath<string[]> | string;
  value: string;
  label: string;
}

const StyledLabel = styled.label`
  display: inline-flex;
  width: 100%;
  max-width: 280px;
  padding: ${theme.gapSizes.gap8};
  background-color: ${theme.colors.lightGray};
  border: 1px solid ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.radius4};
  cursor: pointer;
`;

const StyledInput = styled.input`
  width: 1px;
  height: 1px;
  opacity: 0;

  &:checked + label {
    color: ${theme.colors.nutri};
    border-color: ${theme.colors.nutri};
    background-color: ${theme.colors.softNutri};
  }

  &:checked + label > p {
    color: ${theme.colors.nutri};
  }
`;

export const MultipleChoiceCheckbox = ({ id, name, value, label }: MultipleChoiceCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Box width="fit-content">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <StyledInput
              id={id}
              type="checkbox"
              checked={(field.value as string[]).includes(value)}
              onChange={() => {
                const newValue = (field.value as string[]).includes(value)
                  ? (field.value as string[]).filter((v: string) => v !== value)
                  : [...field.value, value];
                field.onChange(newValue);
              }}
            />
            <StyledLabel htmlFor={id}>
              <Typography variant="medium">{label}</Typography>
            </StyledLabel>
          </>
        )}
      />
    </Box>
  );
};
