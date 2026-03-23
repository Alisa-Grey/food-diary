import theme from '@/styles/theme/theme';

import type { IconProps } from './type';

const BackIcon = ({ color }: IconProps) => (
  <svg width="15" height="12" viewBox="0 0 15 12" xmlns="http://www.w3.org/2000/svg" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.716629 6.01668C0.716629 6.36185 0.996451 6.64168 1.34163 6.64168L13.8333 6.64168C14.1785 6.64168 14.4583 6.36186 14.4583 6.01668C14.4583 5.6715 14.1785 5.39168 13.8333 5.39168L1.34163 5.39168C0.996451 5.39168 0.716629 5.6715 0.716629 6.01668Z"
      fill={color ?? theme.colors.black}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.78603 11.452C7.03013 11.2079 7.03016 10.8122 6.78611 10.5681L2.21877 6.00001L6.78611 1.43192C7.03017 1.18782 7.03013 0.79209 6.78603 0.548031C6.54194 0.303974 6.14621 0.304008 5.90215 0.548105L0.892984 5.5581C0.648955 5.80217 0.648955 6.19784 0.892983 6.44191L5.90215 11.4519C6.14621 11.696 6.54193 11.696 6.78603 11.452Z"
      fill={color ?? theme.colors.black}
    />
  </svg>
);

export default BackIcon;
