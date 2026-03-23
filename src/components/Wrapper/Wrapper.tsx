import { styled } from 'styled-components';

import theme from '@/styles/theme/theme';

import type { BoxProps } from '../Box/Box';

const StyledWrapper = styled.div<BoxProps>`
  display: ${({ display }) => display || 'flex'};
  flex-direction: ${({ flexdirection }) => flexdirection || 'column'};
  justify-content: ${({ $justifyContent }) => $justifyContent || 'space-between'};
  align-items: ${({ $alignItems }) => $alignItems || 'center'};
  flex-wrap: ${({ $flexWrap }) => $flexWrap || 'nowrap'};
  flex-basis: ${({ flexbasis }) => flexbasis || 'auto'};
  gap: ${({ gap }) => gap || theme.gapSizes.gap16};
  width: ${({ width }) => width || '35vw'};
  height: ${({ height }) => height || 'auto'};
  min-height: ${({ $minHeight }) => $minHeight || 'auto'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || 0};
  background: ${({ background }) => background || 'transparent'};

  @media (max-width: ${theme.screenSizes.tablet}) {
    width: 70vw;
  }

  @media (max-width: ${theme.screenSizes.mobile}) {
    width: 100vw;
  }
`;

function Wrapper({ dataname, children, ...props }: BoxProps) {
  return (
    <StyledWrapper data-name={dataname} onClick={props.onClick} {...props}>
      {children}
    </StyledWrapper>
  );
}

export default Wrapper;
