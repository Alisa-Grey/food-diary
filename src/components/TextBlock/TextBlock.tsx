import theme from '@/styles/theme/theme';

import { Typography } from '../Typography/Typography';

interface TextBlockProps {
  text: string[];
  fontSize?: string;
  fontWeight: number;
  $textAlign?: 'left' | 'center' | 'right' | 'justify';
  children: React.ReactNode;
}

export const TextBlock = ({ text, fontSize, fontWeight, $textAlign, children }: TextBlockProps) => {
  return (
    <Typography
      fontSize={fontSize ?? theme.fontSizes.fontSize16}
      fontWeight={fontWeight}
      textalign={$textAlign ?? 'left'}
    >
      {text[0]} {children}
      {text[1]}
    </Typography>
  );
};
