import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import theme from '@/styles/theme/theme';

interface LinkPprops {
  fontSize?: string;
  fontWeight?: number;
  fontStyle?: string;
  color: string;
  textDecoration: 'none' | 'underline';
  href?: string;
  icon?: ReactNode;
  $iconPosition?: 'left' | 'right';
  className?: string;
  children?: ReactNode;
  target?: '_blank' | '_self';
}

const IconContainer = styled.div<{ position?: 'left' | 'right' }>`
  position: absolute;
  ${props => (props.position === 'right' ? `right: 0;` : `left: 0;`)}
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const StyledLink = styled.a<LinkPprops>`
  position: relative;
  display: inline-flex;
  padding: 0;
  font-size: ${({ fontSize }) => fontSize || theme.fontSizes.fontSize16};
  font-style: ${({ fontStyle }) => fontStyle || 'regular'};
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  line-height: 1;
  text-decoration: ${({ textDecoration }) => textDecoration};
  color: ${({ color }) => color || 'inherit'};

  ${props => {
    switch (props.$iconPosition) {
      case 'left': {
        return css`
          padding-right: 0;
          padding-left: ${theme.gapSizes.gap32};
        `;
      }
      case 'right': {
        return css`
          padding-right: ${theme.gapSizes.gap32};
          padding-left: 0px;
        `;
      }
      default: {
        return css`
          padding-right: 0px;
          padding-left: 0px;
        `;
      }
    }
  }}
  }
`;

const StyledTwoRowsLink = styled.div<LinkPprops>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${theme.gapSizes.gap8};
  padding: ${theme.gapSizes.gap16};
  color: ${({ color }) => color || 'inherit'};
  text-decoration: none;

  & > p {
    cursor: pointer;
    transition: color 0.2s ease-in-out;
  }

  & > svg.stroke {
    transition: stroke 0.2s ease-in-out;
  }

  & > svg > path {
    transition: fill 0.2s ease-in-out;
  }

  &:hover > svg > path {
    fill: ${theme.colors.middleNutri};
  }

  &:hover > svg.stroke > path {
    fill: none;
    stroke: ${theme.colors.middleNutri};
  }

  &:hover > p {
    color: ${theme.colors.middleNutri};
  }

  &:active > svg > path,
  .isActive > & > svg > path {
    fill: ${theme.colors.darkNutri};
  }

  &:active > svg.stroke > path,
  .isActive > & > svg.stroke > path {
    fill: none;
    stroke: ${theme.colors.darkNutri};
  }

  &:active > p,
  .isActive > & > p {
    color: ${theme.colors.darkNutri};
  }

  @media (max-width: ${theme.screenSizes.mobile}) {
    padding: ${theme.gapSizes.gap2} ${theme.gapSizes.gap4};
    gap: ${theme.gapSizes.gap4};
  }
`;

export const CustomLink: React.FC<LinkPprops> = ({
  children,
  icon,
  $iconPosition,
  target = '_self',
  ...props
}) => {
  return (
    <StyledLink {...props} icon={icon} $iconPosition={$iconPosition} target={target}>
      {icon && <IconContainer position={$iconPosition}>{icon}</IconContainer>}
      {children}
    </StyledLink>
  );
};

export const TwoRowsLink: React.FC<LinkPprops> = ({ children, className, ...props }) => {
  return (
    <StyledTwoRowsLink className={className} {...props}>
      {children}
    </StyledTwoRowsLink>
  );
};

// export const RadiobuttonLink = () => {};
