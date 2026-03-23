import theme from '@/styles/theme/theme';

import type { IconProps } from './type';

const PencilIcon = ({ color }: IconProps) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.45841 2.96658L11.0334 5.54158M1.41091 10.0157L10.0159 1.41074C10.3409 1.08574 10.8684 1.08574 11.1934 1.41074L12.5901 2.80741C12.9151 3.13241 12.9151 3.65991 12.5901 3.98491L3.98425 12.5891C3.82841 12.7457 3.61675 12.8332 3.39591 12.8332H1.16675V10.6041C1.16675 10.3832 1.25425 10.1716 1.41091 10.0157Z"
      stroke={color ?? theme.colors.nutri}
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.16675 12.8335H12.8334"
      stroke={color ?? theme.colors.nutri}
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default PencilIcon;
