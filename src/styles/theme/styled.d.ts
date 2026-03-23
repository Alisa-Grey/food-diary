import 'styled-components';

import type { Theme } from './theme'; // Импортируйте тип Theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {} // Расширяем DefaultTheme
}
