import styled from 'styled-components';

import theme from '@/styles/theme/theme';

interface DividerProps {
  height: string;
  width: string;
  color?: string;
}

const StyledDivider = styled.span<DividerProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '1px'};
  background-color: ${({ color }) => color || theme.colors.lightGray};
`;

export const Divider: React.FC<DividerProps> = ({ width, height, ...props }) => {
  return <StyledDivider width={width} height={height} {...props} />;
};
