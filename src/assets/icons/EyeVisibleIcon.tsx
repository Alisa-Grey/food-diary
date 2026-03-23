import theme from '@/styles/theme/theme';

import type { IconProps } from './type';

const EyeVisibleIcon = ({ color }: IconProps) => (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={theme.colors.black}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.11799 12.467C2.96099 12.176 2.96099 11.823 3.11799 11.532C5.00999 8.033 8.50499 5 12 5C15.495 5 18.99 8.033 20.882 11.533C21.039 11.824 21.039 12.177 20.882 12.468C18.99 15.967 15.495 19 12 19C8.50499 19 5.00999 15.967 3.11799 12.467Z"
      stroke={color ?? theme.colors.black}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.1213 9.87868C15.2929 11.0502 15.2929 12.9497 14.1213 14.1213C12.9497 15.2929 11.0502 15.2929 9.87868 14.1213C8.70711 12.9497 8.70711 11.0502 9.87868 9.87868C11.0502 8.70711 12.9497 8.70711 14.1213 9.87868"
      stroke={color ?? theme.colors.black}
      strokeWidth="1.4286"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EyeVisibleIcon;
