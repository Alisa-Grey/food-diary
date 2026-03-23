import React from 'react';
import styled, { css } from 'styled-components';

// Определение интерфейса для пропсов
export interface BoxProps {
  id?: string | number;
  position?: string;
  top?: string;
  left?: string;
  right?: string;
  display?: string;
  flexdirection?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $flexWrap?: string;
  flexbasis?: string;
  gap?: string;
  margin?: string;
  padding?: string;
  background?: string;
  width?: string;
  maxwidth?: string;
  height?: string;
  $minHeight?: string;
  $maxHeight?: string;
  largeDesctopwidth?: string;
  $border?: string;
  $borderRadius?: string;
  $boxShadow?: string;
  dataname?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const StyledBox = styled.div<BoxProps>`
  display: ${({ display }) => display || 'flex'};
  flex-direction: ${({ flexdirection }) => flexdirection || 'row'};
  justify-content: ${({ $justifyContent }) => $justifyContent || 'flex-start'};
  align-items: ${({ $alignItems }) => $alignItems || 'stretch'};
  flex-wrap: ${({ $flexWrap }) => $flexWrap || 'nowrap'};
  flex-basis: ${({ flexbasis }) => flexbasis || 'auto'};
  gap: ${({ gap }) => gap || '0'};
  margin: ${({ margin }) => margin || '0'};
  max-width: ${({ maxwidth }) => maxwidth || 'none'};
  padding: ${({ padding }) => padding || '0'};
  background: ${({ background }) => background || 'transparent'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  max-height: ${({ $maxHeight }) => $maxHeight};
  border: ${({ $border }) => $border || 'none'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '0'};
  min-height: ${({ $minHeight }) => $minHeight};
  ${props => {
    switch (props.position) {
      case 'absolute':
        return css`
          position: absolute;
          top: ${props.top};
          left: ${props.left};
          right: ${props.right};
          z-index: 2;
        `;
      case 'relative':
        return css`
          position: relative;
        `;
      case 'fixed':
        return css`
          position: fixed;
        `;
      default:
        return css`
          position: static;
        `;
    }
  }};
`;

export const PageContainer = ({ children, ...props }: BoxProps) => {
  return (
    <StyledBox position="relative" flexdirection="column" width="100%" {...props}>
      {children}
    </StyledBox>
  );
};

function Box({ dataname, children, className, ...props }: BoxProps) {
  return (
    <StyledBox data-name={dataname} className={className} {...props}>
      {children}
    </StyledBox>
  );
}

export default Box;
