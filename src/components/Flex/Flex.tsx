// Flex.tsx
import styled from 'styled-components';

export interface FlexProps {
  flexdirection?: 'row' | 'column';
  $justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  $alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  $flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexbasis?: string;
  gap?: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  border?: string;
  $borderRadius?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ flexdirection }) => flexdirection || 'row'};
  justify-content: ${({ $justifyContent }) => $justifyContent || 'flex-start'};
  align-items: ${({ $alignItems }) => $alignItems || 'stretch'};
  flex-wrap: ${({ $flexWrap }) => $flexWrap || 'nowrap'};
  flex-basis: ${({ flexbasis }) => flexbasis || 'auto'};
  gap: ${({ gap }) => gap || '0'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  padding: ${({ padding }) => padding || '0'};
  margin: ${({ margin }) => margin || '0'};
  border-bottom: ${({ border }) => border || 'none'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '0'};
`;

export const Row = styled(Flex).attrs({
  flexdirection: 'row',
})``;
