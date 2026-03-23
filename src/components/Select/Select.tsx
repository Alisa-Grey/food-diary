import styled, { css } from 'styled-components';

import theme from '@/styles/theme/theme';

interface SelectProps {
  width?: string;
  height?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: number;
  bordercolor?: string;
  $justifyContent?: string;
  id: string;
  value: string | number;
  children?: React.ReactNode;
  icon?: boolean;
  placeholder?: string;
  disabled?: boolean;
  hasMarker?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

interface MarkerProps {
  color?: string;
  $backgroundColor?: string;
  children?: React.ReactNode;
}

const StyledSelect = styled.div<SelectProps>`
  position: relative;
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent || 'flex-start'};
  align-items: center;
  font-size: ${theme.fontSizes.fontSize16};
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  width: ${({ width }) => width || 'max-content'};
  height: ${({ height }) => height || 'auto'};
  max-width: ${theme.maxWidth.width750};
  min-height: 44px;
  padding: 12px ${({ icon }) => (icon ? theme.gapSizes.gap32 : '12px')} 12px 12px;
  box-sizing: border-box;
  border-radius: ${theme.borderRadius.radius8};
  color: ${theme.colors.black};
  text-align: ${({ icon }) => (icon ? 'left' : 'center')};
  cursor: pointer;
  outline: none;
  background-color: ${theme.colors.lightGray};
  border: 1px solid ${({ bordercolor }) => bordercolor || 'transparent'};
  transition: border-color 0.2s ease;

  &::after {
    content: '';
    display: ${({ icon }) => (icon ? 'block' : 'none')};
    position: absolute;
    top: 50%;
    right: 12px;
    width: 16px;
    height: 16px;
    background-image: url(/arrowDown.svg);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    transform: translateY(-50%);
    transition: transform 0.2s ease;
  }

  &.isOpened::after {
    transform: translateY(-50%) rotate(180deg);
  }

  ${props => {
    switch (props.disabled) {
      case false:
        return css`
          &::after {
            display: ${props.icon ? 'block' : 'none'};
          }
        `;

      case true:
        return css`
          pointer-events: none;
          &::after {
            display: none;
          }
        `;
      default:
        return css`
          &::after {
            display: ${props.icon ? 'block' : 'none'};
          }
        `;
    }
  }};
  }

  @media (max-width: ${theme.screenSizes.tablet}) {
    width: ${({ width }) => width || '90%'};
  }

  @media (max-width: ${theme.screenSizes.mobile}) {
    width: ${({ width }) => width || '80%'};
  }
`;

const StyledPlaceholder = styled.p`
  position: absolute;
  display: block;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: ${theme.colors.middleGray};
  font-size: ${theme.fontSizes.fontSize16};
`;

const StyledMarker = styled.div<MarkerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  min-width: 20px;
  height: 20px;
  margin-right: ${theme.gapSizes.gap8};
  border-radius: ${theme.borderRadius.radius4};
  color: ${({ color }) => color || theme.colors.white};
  font-size: ${theme.fontSizes.fontSize12};
  font-weight: 500;
  background-color: ${({ $backgroundColor }) => $backgroundColor || theme.colors.nutri};
`;

export const Select: React.FC<SelectProps & MarkerProps> = ({
  width,
  padding,
  bordercolor,
  id,
  value,
  icon = true,
  placeholder,
  disabled,
  hasMarker,
  className,
  onClick,
  ...props
}) => {
  return (
    <StyledSelect
      id={id}
      value={value}
      width={width}
      padding={padding}
      bordercolor={bordercolor}
      icon={icon}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      onClick={onClick}
      {...props}
    >
      {hasMarker && (
        <StyledMarker color={props.color} $backgroundColor={props.$backgroundColor}>
          {props.children}
        </StyledMarker>
      )}
      {value}
      {!value && placeholder && <StyledPlaceholder>{placeholder}</StyledPlaceholder>}
    </StyledSelect>
  );
};
