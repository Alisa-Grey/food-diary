import { styled } from 'styled-components';

import theme from '@/styles/theme/theme';

import type { BoxProps } from '../Box/Box';

interface StickyBoxProps extends BoxProps {
  position?: 'sticky' | 'fixed';
  $boxShadow?: string;
}

const StyledWhiteBox = styled.div<StickyBoxProps>`
  display: ${({ display }) => display || 'flex'};
  flex-direction: ${({ flexdirection }) => flexdirection || 'column'};
  justify-content: ${({ $justifyContent }) => $justifyContent || 'center'};
  align-items: ${({ $alignItems }) => $alignItems || 'stretch'};
  flex-wrap: ${({ $flexWrap }) => $flexWrap || 'nowrap'};
  flex-basis: ${({ flexbasis }) => flexbasis || 'auto'};
  gap: ${({ gap }) => gap || theme.gapSizes.gap8};
  width: ${({ width }) => width || '100%'};
  max-width: 900px;
  height: ${({ height }) => height || 'auto'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || theme.gapSizes.gap16};
  background: ${theme.colors.white};
  border-radius: ${({ $borderRadius }) => $borderRadius || theme.borderRadius.radius20};
  z-index: 10;

  @media (max-width: ${theme.screenSizes.tablet}) {
    width: ${({ width }) => width || '70vw'};
    position: ${({ position }) => position || 'fixed'};
    right: 0;
    bottom: 0;
    left: 0;
    align-items: ${({ $alignItems }) => $alignItems || 'stretch'};
    border-radius: ${theme.borderRadius.radius20} ${theme.borderRadius.radius20} 0 0;
  }

  @media (max-width: ${theme.screenSizes.mobile}) {
    width: ${({ width }) => width || '100vw'};
    padding: ${({ padding }) => padding || theme.gapSizes.gap16};
    box-shadow: ${({ $boxShadow }) => $boxShadow || '0 -14px 64px 0 rgba(98, 148, 170, 0.12)'};
  }
`;

function StickyBox({ dataname, position, children, ...props }: StickyBoxProps) {
  return (
    <StyledWhiteBox data-name={dataname} position={position} onClick={props.onClick} {...props}>
      {children}
    </StyledWhiteBox>
  );
}

export default StickyBox;
