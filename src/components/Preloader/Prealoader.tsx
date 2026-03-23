import styled from 'styled-components';

import theme from '@/styles/theme/theme';

interface PreloaderProps {
  color?: string;
  amount?: number;
  $fontSize?: string;
}

const PreloaderContainer = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  width: 100px;
  height: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const Dot = styled.span<PreloaderProps>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: ${theme.gapSizes.gap8};
  background: ${({ color }) => color || theme.colors.nutri};
  animation: wave 1.3s linear infinite;

  &:nth-child(2) {
    animation-delay: -1.1s;
  }
  &:nth-child(3) {
    animation-delay: -0.9s;
  }

  @keyframes wave {
    0%,
    60%,
    100% {
      transform: initial;
    }
    30% {
      transform: translateY(-15px);
      opacity: 0.5;
    }
  }
`;

export const PreloaderCircular = styled.span`
  width: 1em;
  height: 1em;
  color: ${theme.colors.nutri};
  border-radius: 50%;
  font-size: ${theme.fontSizes.fontSize16};
  text-indent: -9999em;
  animation: mulShdSpin 1.3s infinite linear;
  transform: translateZ(0);

  @keyframes mulShdSpin {
    0%,
    100% {
      box-shadow:
        0 -3em 0 0.2em,
        2em -2em 0 0em,
        3em 0 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 -1em,
        -3em 0 0 -1em,
        -2em -2em 0 0;
    }
    12.5% {
      box-shadow:
        0 -3em 0 0,
        2em -2em 0 0.2em,
        3em 0 0 0,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 -1em,
        -3em 0 0 -1em,
        -2em -2em 0 -1em;
    }
    25% {
      box-shadow:
        0 -3em 0 -0.5em,
        2em -2em 0 0,
        3em 0 0 0.2em,
        2em 2em 0 0,
        0 3em 0 -1em,
        -2em 2em 0 -1em,
        -3em 0 0 -1em,
        -2em -2em 0 -1em;
    }
    37.5% {
      box-shadow:
        0 -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0em 0 0,
        2em 2em 0 0.2em,
        0 3em 0 0em,
        -2em 2em 0 -1em,
        -3em 0em 0 -1em,
        -2em -2em 0 -1em;
    }
    50% {
      box-shadow:
        0 -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0 0 -1em,
        2em 2em 0 0em,
        0 3em 0 0.2em,
        -2em 2em 0 0,
        -3em 0em 0 -1em,
        -2em -2em 0 -1em;
    }
    62.5% {
      box-shadow:
        0 -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 0,
        -2em 2em 0 0.2em,
        -3em 0 0 0,
        -2em -2em 0 -1em;
    }
    75% {
      box-shadow:
        0em -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0em 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 0,
        -3em 0em 0 0.2em,
        -2em -2em 0 0;
    }
    87.5% {
      box-shadow:
        0em -3em 0 0,
        2em -2em 0 -1em,
        3em 0 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 0,
        -3em 0em 0 0,
        -2em -2em 0 0.2em;
    }
  }
`;

export const PreloaderCircularGradient = styled.span<PreloaderProps>`
  font-size: ${({ $fontSize }) => $fontSize || '10px'};
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  animation: mulShdSpin 1.1s infinite ease;
  transform: translateZ(0);

  @keyframes mulShdSpin {
    0%,
    100% {
      box-shadow:
        0em -2.6em 0em 0em ${theme.colors.nutri},
        1.8em -1.8em 0 0em rgba(25, 193, 82, 0.2),
        2.5em 0em 0 0em rgba(25, 193, 82, 0.2),
        1.75em 1.75em 0 0em rgba(25, 193, 82, 0.2),
        0em 2.5em 0 0em rgba(25, 193, 82, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 193, 82, 0.2),
        -2.6em 0em 0 0em rgba(25, 193, 82, 0.5),
        -1.8em -1.8em 0 0em rgba(25, 193, 82, 0.7);
    }
    12.5% {
      box-shadow:
        0em -2.6em 0em 0em rgba(25, 193, 82, 0.7),
        1.8em -1.8em 0 0em ${theme.colors.nutri},
        2.5em 0em 0 0em rgba(25, 193, 82, 0.2),
        1.75em 1.75em 0 0em rgba(25, 193, 82, 0.2),
        0em 2.5em 0 0em rgba(25, 193, 82, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 193, 82, 0.2),
        -2.6em 0em 0 0em rgba(25, 193, 82, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 193, 82, 0.5);
    }
    25% {
      box-shadow:
        0em -2.6em 0em 0em rgba(25, 193, 82, 0.5),
        1.8em -1.8em 0 0em rgba(25, 193, 82, 0.7),
        2.5em 0em 0 0em ${theme.colors.nutri},
        1.75em 1.75em 0 0em rgba(25, 193, 82, 0.2),
        0em 2.5em 0 0em rgba(25, 193, 82, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 193, 82, 0.2),
        -2.6em 0em 0 0em rgba(25, 193, 82, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 193, 82, 0.2);
    }
    37.5% {
      box-shadow:
        0em -2.6em 0em 0em rgba(25, 193, 82, 0.2),
        1.8em -1.8em 0 0em rgba(25, 193, 82, 0.5),
        2.5em 0em 0 0em rgba(25, 193, 82, 0.7),
        1.75em 1.75em 0 0em ${theme.colors.nutri},
        0em 2.5em 0 0em rgba(25, 193, 82, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 193, 82, 0.2),
        -2.6em 0em 0 0em rgba(25, 193, 82, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 193, 82, 0.2);
    }
    50% {
      box-shadow:
        0em -2.6em 0em 0em rgba(25, 193, 82, 0.2),
        1.8em -1.8em 0 0em rgba(25, 193, 82, 0.2),
        2.5em 0em 0 0em rgba(25, 193, 82, 0.5),
        1.75em 1.75em 0 0em rgba(25, 193, 82, 0.7),
        0em 2.5em 0 0em ${theme.colors.nutri},
        -1.8em 1.8em 0 0em rgba(25, 193, 82, 0.2),
        -2.6em 0em 0 0em rgba(25, 193, 82, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 193, 82, 0.2);
    }
    62.5% {
      box-shadow:
        0em -2.6em 0em 0em rgba(25, 193, 82, 0.2),
        1.8em -1.8em 0 0em rgba(25, 193, 82, 0.2),
        2.5em 0em 0 0em rgba(25, 193, 82, 0.2),
        1.75em 1.75em 0 0em rgba(25, 193, 82, 0.5),
        0em 2.5em 0 0em rgba(25, 193, 82, 0.7),
        -1.8em 1.8em 0 0em ${theme.colors.nutri},
        -2.6em 0em 0 0em rgba(25, 193, 82, 0.2),
        -1.8em -1.8em 0 0em rgba(25, 193, 82, 0.2);
    }
    75% {
      box-shadow:
        0em -2.6em 0em 0em rgba(25, 193, 82, 0.2),
        1.8em -1.8em 0 0em rgba(25, 193, 82, 0.2),
        2.5em 0em 0 0em rgba(25, 193, 82, 0.2),
        1.75em 1.75em 0 0em rgba(25, 193, 82, 0.2),
        0em 2.5em 0 0em rgba(25, 193, 82, 0.5),
        -1.8em 1.8em 0 0em rgba(25, 193, 82, 0.7),
        -2.6em 0em 0 0em ${theme.colors.nutri},
        -1.8em -1.8em 0 0em rgba(25, 193, 82, 0.2);
    }
    87.5% {
      box-shadow:
        0em -2.6em 0em 0em rgba(25, 193, 82, 0.2),
        1.8em -1.8em 0 0em rgba(25, 193, 82, 0.2),
        2.5em 0em 0 0em rgba(25, 193, 82, 0.2),
        1.75em 1.75em 0 0em rgba(25, 193, 82, 0.2),
        0em 2.5em 0 0em rgba(25, 193, 82, 0.2),
        -1.8em 1.8em 0 0em rgba(25, 193, 82, 0.5),
        -2.6em 0em 0 0em rgba(25, 193, 82, 0.7),
        -1.8em -1.8em 0 0em ${theme.colors.nutri};
    }
  }
`;

export const PrealoaderWave: React.FC<PreloaderProps> = ({ amount = 3, color }) => {
  return (
    <PreloaderContainer>
      {Array(amount)
        .fill('dot')
        .map(index => (
          <Dot key={index} color={color} />
        ))}
    </PreloaderContainer>
  );
};
