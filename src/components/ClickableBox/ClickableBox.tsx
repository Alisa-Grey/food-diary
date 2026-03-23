import { styled } from 'styled-components';

import type { BoxProps } from '../Box/Box';

interface ClickableBoxProps extends BoxProps {
  onClick?: ((e: React.MouseEvent<HTMLElement>) => void) | (() => void);
}

const StyledClickableBox = styled.div<ClickableBoxProps>`
  position: relative;
  display: ${({ display }) => display || 'flex'};
  flex-direction: ${({ flexdirection }) => flexdirection || 'row'};
  justify-content: ${({ $justifyContent }) => $justifyContent || 'flex-start'};
  align-items: ${({ $alignItems }) => $alignItems || 'stretch'};
  flex-wrap: ${({ $flexWrap }) => $flexWrap || 'nowrap'};
  flex-basis: ${({ flexbasis }) => flexbasis || 'auto'};
  gap: ${({ gap }) => gap || '0'};
  margin: ${({ margin }) => margin || '0'};
  max-width: ${({ maxwidth }) => maxwidth || 'none'};
  min-width: 0;
  padding: ${({ padding }) => padding || '0'};
  background: ${({ background }) => background || 'transparent'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '0'};
  box-shadow: ${({ $boxShadow }) => $boxShadow};
`;

const WrappingButton = styled.button<ClickableBoxProps>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: transparent;
  border: none;
  outline: none;
  z-index: 10;
`;

function ClickableBox({ dataname, children, className, id, onClick, ...props }: ClickableBoxProps) {
  return (
    <StyledClickableBox data-name={dataname} className={className} {...props}>
      {children}
      <WrappingButton id={id} onClick={onClick} />
    </StyledClickableBox>
  );
}

export default ClickableBox;
