import styled from 'styled-components';

import theme from '@/styles/theme/theme';

interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.gapSizes.gap10};
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 44px;
  height: 24px;
  background: ${theme.colors.middleGray};
  border-radius: 24px;
  padding: 2px;
  transition: 0.3s all;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 24px;
    background: ${theme.colors.white};
    transform: translate(0, -50%);
    transition: 0.3s all;
  }
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: ${theme.colors.nutri};

    &:before {
      transform: translate(20px, -50%);
    }
  }
`;

export const Toggle: React.FC<ToggleProps> = ({ id, checked, onChange }) => {
  return (
    <Label>
      <Input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <Switch />
    </Label>
  );
};
