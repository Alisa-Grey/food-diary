import theme from '@/styles/theme/theme';

import type { IconProps } from './type';

const DoorIcon = ({ color }: IconProps) => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={theme.colors.white}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.5 19.392V7.50298C11.5 6.81298 11.145 6.17198 10.56 5.80698L6.56 3.30698C5.228 2.47498 3.5 3.43198 3.5 5.00298V16.891C3.5 17.581 3.855 18.222 4.44 18.587L8.44 21.087C9.772 21.92 11.5 20.962 11.5 19.392Z"
      stroke={color ?? theme.colors.black}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.5 11H21.5"
      stroke={color ?? theme.colors.black}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.5 13L21.5 11L19.5 9"
      stroke={color ?? theme.colors.black}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.5 19H15.5C16.605 19 17.5 18.105 17.5 17V16"
      stroke={color ?? theme.colors.black}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.5 6V5C17.5 3.895 16.605 3 15.5 3H5.5"
      stroke={color ?? theme.colors.black}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default DoorIcon;
