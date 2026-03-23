import theme from '@/styles/theme/theme';

import Box from '../Box/Box';

interface Props {
  progress: number;
  color: string;
  children: React.ReactNode;
}

export const CircularProgressbar = ({ progress, children, color }: Props) => {
  const radius = 60;
  const pi = 3.14;
  const circumference = 2 * pi * radius;
  const offset = circumference * ((100 - progress) / 100);

  return (
    <Box
      flexbasis="40%"
      width="140px"
      height="140px"
      $justifyContent="center"
      $alignItems="center"
      dataname="kcal-block"
      position="relative"
    >
      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          r={radius}
          cx="70"
          cy="70"
          fill="transparent"
          stroke={`${theme.colors.lightGray}`}
          stroke-width="8"
          stroke-dasharray={`${circumference}px`}
          stroke-dashoffset="0"
        ></circle>
        {/* progress scale */}
        <circle
          r={radius}
          cx="70"
          cy="70"
          stroke={color}
          stroke-width="8"
          stroke-linecap="round"
          stroke-dashoffset={`${offset > 0 ? offset : 0}px`}
          fill="transparent"
          stroke-dasharray={`${circumference}px`}
        ></circle>
      </svg>
      <Box
        position="absolute"
        flexdirection="column"
        $alignItems="center"
        gap={theme.gapSizes.gap4}
      >
        {children}
      </Box>
    </Box>
  );
};
