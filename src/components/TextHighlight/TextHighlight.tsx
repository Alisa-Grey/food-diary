import { styled } from 'styled-components';

import theme from '@/styles/theme/theme';

import type { TypographyProps } from '../Typography/Typography';

export interface TextHighlightProps extends TypographyProps {
  opacity?: string;
  padding?: string;
}

const StyledText = styled.span<TextHighlightProps>`
  color: ${({ color }) => color || theme.colors.black};
  text-align: ${({ textalign }) => textalign || 'left'};
  font-size: ${({ fontSize }) => fontSize || 'inherit'};
  font-weight: ${({ fontWeight }) => fontWeight || 'inherit'};
  font-style: ${({ fontStyle }) => fontStyle || 'inherit'};
  line-height: ${({ lineheight }) => lineheight || 'inherit'};
  opacity: ${({ opacity }) => opacity || '1'};
  padding: ${({ padding }) => padding || '0'};
`;

export const TextHighlight: React.FC<TextHighlightProps> = ({ children, ...props }) => {
  return <StyledText {...props}>{children}</StyledText>;
};
