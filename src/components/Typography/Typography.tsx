// Typography.tsx
import type { ReactNode } from 'react';
import React from 'react';
import styled, { css } from 'styled-components';

import theme from '@/styles/theme/theme';

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'medium';
  color?: string;
  margin?: string;
  padding?: string;
  textalign?: 'left' | 'center' | 'right' | 'justify';
  fontSize?: string;
  fontWeight?: number;
  fontStyle?: string;
  lineheight?: string;
  className?: string;
  children: ReactNode;
  overflow?: string;
  $whiteSpace?: string;
  $textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  $textDecoration?: 'underline' | 'none';
  $wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'auto-phrase' | 'break-word';
}

const typographyStyles = css<TypographyProps>`
  color: ${({ color }) => color || theme.colors.black};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  text-align: ${({ textalign }) => textalign || 'left'};
  font-size: ${({ fontSize }) => fontSize || theme.fontSizes.fontSize16};
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  font-style: ${({ fontStyle }) => fontStyle || 'normal'};
  line-height: ${({ lineheight }) => lineheight || '1.1'};
  overflow: ${({ overflow }) => overflow || 'inherit'};
  white-space: ${({ $whiteSpace }) => $whiteSpace || 'pre-line'};
  text-transform: ${({ $textTransform }) => $textTransform || 'none'};
  text-decoration: ${({ $textDecoration }) => $textDecoration};
  word-break: ${({ $wordBreak }) => $wordBreak || 'auto-phrase'};
  hyphens: auto;
`;

const H1 = styled.h1<TypographyProps>`
  ${typographyStyles}
  font-size: ${({ fontSize }) => fontSize || theme.fontSizes.fontSize24};
  font-weight: 600;
  line-height: 1.1;

  @media (min-width: ${theme.screenSizes.desktop}) {
    & {
      font-size: ${theme.fontSizes.fontSize28};
    }
  }
`;

const H2 = styled.h2<TypographyProps>`
  ${typographyStyles}
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
`;

const H3 = styled.h3<TypographyProps>`
  ${typographyStyles}
  font-size: ${theme.fontSizes.fontSize18};
  font-weight: 600;
  line-height: 24px;
`;

// Добавьте H3, H4, H5, H6 и P с аналогичным образом

const P = styled.p<TypographyProps>`
  ${typographyStyles}
  font-size: ${({ fontSize }) => fontSize || theme.fontSizes.fontSize16};
  line-height: ${({ lineheight }) => lineheight || '20px'};
`;

const MediumText = styled.p<TypographyProps>`
  ${typographyStyles};
  color: ${({ color }) => color || theme.colors.darkGray};
  font-weight: ${({ fontWeight }) => fontWeight || 500};
  line-height: ${({ lineheight }) => lineheight || '20px'};
`;

export const Typography: React.FC<TypographyProps> = ({ variant, children, ...props }) => {
  switch (variant) {
    case 'h1':
      return <H1 {...props}>{children}</H1>;
    case 'h2':
      return <H2 {...props}>{children}</H2>;
    case 'h3':
      return <H3 {...props}>{children}</H3>;
    // Добавьте кейсы для H3, H4, H5, H6 и P
    case 'p':
      return <P {...props}>{children}</P>;
    case 'medium':
      return <MediumText {...props}>{children}</MediumText>;
    default:
      return <P {...props}>{children}</P>;
  }
};
