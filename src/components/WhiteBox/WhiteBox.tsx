import { styled } from 'styled-components';

import theme from '@/styles/theme/theme';

import type { BoxProps } from '../Box/Box';

const StyledWhiteBox = styled.div<BoxProps>`
  display: ${({ display }) => display || 'flex'};
  flex-direction: ${({ flexdirection }) => flexdirection || 'column'};
  justify-content: ${({ $justifyContent }) => $justifyContent || 'center'};
  align-items: ${({ $alignItems }) => $alignItems || 'center'};
  flex-wrap: ${({ $flexWrap }) => $flexWrap || 'nowrap'};
  flex-basis: ${({ flexbasis }) => flexbasis || 'auto'};
  gap: ${({ gap }) => gap || theme.gapSizes.gap8};
  width: ${({ width }) => width || '35vw'};
  max-width: 900px;
  height: ${({ height }) => height || 'auto'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || theme.gapSizes.gap16};

  background: ${({ background }) => background || theme.colors.white};
  border-radius: ${({ $borderRadius }) => $borderRadius || theme.borderRadius.radius20};

  @media (max-width: ${theme.screenSizes.tablet}) {
    width: ${({ width }) => width || '70vw'};
  }

  @media (max-width: ${theme.screenSizes.mobile}) {
    width: ${({ width }) => width || '100vw'};
  }
`;

function WhiteBox({ dataname, children, ...props }: BoxProps) {
  return (
    <StyledWhiteBox data-name={dataname} onClick={props.onClick} {...props}>
      {children}
    </StyledWhiteBox>
  );
}

export default WhiteBox;
