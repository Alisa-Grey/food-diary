import theme from '@/styles/theme/theme';

import type { IconProps } from './type';

const ArrowRightIcon = ({ color }: IconProps) => (
  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.646486 0.97972C0.451202 1.17496 0.451167 1.49154 0.646407 1.68683L4.95966 6.00104L0.64898 10.3132C0.453751 10.5084 0.453803 10.825 0.649098 11.0203C0.844393 11.2155 1.16098 11.2154 1.3562 11.0201L6.02028 6.35451C6.21547 6.15926 6.21546 5.84275 6.02026 5.6475L1.35359 0.979799C1.15835 0.784515 0.84177 0.78448 0.646486 0.97972Z"
      fill={color ?? theme.colors.black}
    />
  </svg>
);

export default ArrowRightIcon;
