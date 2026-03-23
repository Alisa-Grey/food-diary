/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled, { css } from 'styled-components';

import theme from '@/styles/theme/theme';

export interface Props {}

export interface ListProps {
  variant?: 'ul' | 'ol';
  padding?: string;
  gap?: string;
  children: React.ReactNode;
}

interface ListItemProps {
  fontSize?: string;
  fontWeight?: number;
  color?: string;
}

const listStyles = css<ListProps>`
  display: flex;
  flex-direction: column;
  padding: ${({ padding }) => padding || '0'};
  gap: ${({ gap }) => gap || theme.gapSizes.gap4};
`;

const Ul = styled.ul<ListProps>`
  ${listStyles}
`;

const Ol = styled.ol<ListProps>`
  ${listStyles}
`;

const Li = styled.li<ListItemProps>`
  font-size: ${({ fontSize }) => fontSize || theme.fontSizes.fontSize16};
  font-weight: 400;
  color: ${({ color }) => color || theme.colors.black}}
`;

const ListContent: React.FC<ListProps & ListItemProps> = ({
  fontWeight,
  fontSize,
  color,
  children,
}) => {
  return (
    Array.isArray(children) &&
    children.map((el, index) => (
      <Li key={index} fontSize={fontSize} fontWeight={fontWeight} color={color}>
        {el}
      </Li>
    ))
  );
};

export const List: React.FC<ListProps & ListItemProps> = ({
  variant,
  children,
  fontSize,
  fontWeight,
  color,
  ...props
}) => {
  const List =
    variant === 'ul' ? (
      <Ul {...props}>
        <ListContent fontSize={fontSize} fontWeight={fontWeight} color={color}>
          {children}
        </ListContent>
      </Ul>
    ) : (
      <Ol {...props}>
        <ListContent fontSize={fontSize} fontWeight={fontWeight} color={color}>
          {children}
        </ListContent>
      </Ol>
    );

  return List;
};
