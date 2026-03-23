import { styled } from 'styled-components';

import theme from '@/styles/theme/theme';

import type { BoxProps } from '../Box/Box';

const StyledContainer = styled.div<BoxProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ $justifyContent }) => $justifyContent || 'center'};
  align-items: ${({ $alignItems }) => $alignItems || 'center'};
  flex-wrap: ${({ $flexWrap }) => $flexWrap || 'nowrap'};
  flex-basis: ${({ flexbasis }) => flexbasis || 'auto'};
  gap: ${({ gap }) => gap || theme.gapSizes.gap8};
  width: ${({ width }) => width || '100vw'};

  min-height: 100vh;
  margin: ${({ margin }) => margin || '0'};
  padding: ${theme.gapSizes.gap24} ${theme.gapSizes.gap24} 0;
  background: ${({ background }) => background || theme.colors.white};

  @media (max-width: ${theme.screenSizes.mobile}) {
    padding: 0;
    height: 100svh;
  }
`;

function Container({ dataname, children, ...props }: BoxProps) {
  return (
    <StyledContainer data-name={dataname} {...props}>
      {children}
    </StyledContainer>
  );
}

export default Container;
