// theme.ts
export interface Theme {
  colors: {
    lightNutri: string;
    softNutri: string;
    gentleNutri: string;
    middleNutri?: string;
    nutri: string;
    darkNutri: string;
    softDist: string;
    softWar: string;
    middleWar: string;
    darkWar: string;
    darkDist: string;
    white: string;
    lightGray: string;
    middleGray: string;
    gray: string;
    darkGray: string;
    black: string;
    darkBlack: string;
    softWater: string;
    water: string;
    darkTransparent: string;
    calories?: string;
    milk?: string;
    protein?: string;
    vegetables?: string;
    starch?: string;
    fat?: string;
    fruits?: string;
    macroProtein: string;
    macroFat: string;
    macroCarbs: string;
    lightDist: string;
  };
  borderRadius: {
    radius4: string;
    radius8: string;
    radius12: string;
    radius16: string;
    radius20?: string;
  };
  fontSizes: {
    fontSize10: string;
    fontSize12?: string;
    fontSize14?: string;
    fontSize16: string;
    fontSize18: string;
    fontSize20?: string;
    fontSize24?: string;
    fontSize28?: string;
    fontSize36?: string;
    fontSize40: string;
    fontSize64?: string;
  };
  gapSizes: {
    gap2?: string;
    gap4?: string;
    gap6?: string;
    gap8?: string;
    gap10: string;
    gap12: string;
    gap16: string;
    gap24: string;
    gap32?: string;
    gap42?: string;
    gap64?: string;
  };
  screenSizes: {
    mobile: string;
    tablet: string;
    desktop: string;
    largeDesktop?: string;
  };
  iconSizes: {
    regular: string;
  };
  maxWidth: {
    width750: string;
  };
}

export const theme: Theme = {
  colors: {
    nutri: '#19c152',
    softNutri: '#edfaf1',
    gentleNutri: '#afe5c6',
    lightNutri: '#ade9c2',
    middleNutri: '#24b656',
    darkNutri: '#2fab59',
    softDist: '#fdf1ee',
    darkDist: '#c51616',
    softWar: '#fff8e0',
    middleWar: '#f4b718',
    darkWar: '#e8a731',
    white: '#fff',
    black: '#363949',
    darkBlack: '#16171d',
    lightGray: '#eff3f7',
    middleGray: '#b1b3c0',
    gray: '#d7d8df',
    darkGray: '#797c8b',
    softWater: '#e9f8ff',
    water: '#04b4ff',
    darkTransparent: 'rgba(0, 0, 0, 0.4)',
    calories: '#39ff7d',
    milk: '#bd00ff',
    protein: '#2411ff',
    vegetables: '#edff18',
    starch: '#ff05aa',
    fat: '#ffa63e',
    fruits: '#00f0ff',
    macroProtein: '#ff6eff',
    macroFat: '#adc527',
    macroCarbs: '#34bb87',
    lightDist: '#ec9d9d',
  },
  borderRadius: {
    radius4: '4px',
    radius8: '8px',
    radius12: '12px',
    radius16: '16px',
    radius20: '20px',
  },
  fontSizes: {
    fontSize10: '10px',
    fontSize12: '12px',
    fontSize14: '14px',
    fontSize16: '16px',
    fontSize18: '18px',
    fontSize20: '20px',
    fontSize24: '24px',
    fontSize28: '28px',
    fontSize36: '36px',
    fontSize40: '40px',
    fontSize64: '64px',
  },
  gapSizes: {
    gap2: '2px',
    gap4: '4px',
    gap8: '8px',
    gap6: '6px',
    gap10: '10px',
    gap12: '12px',
    gap16: '16px',
    gap24: '24px',
    gap32: '32px',
    gap42: '42px',
    gap64: '64px',
  },
  screenSizes: {
    mobile: '430px',
    tablet: '820px',
    desktop: '1340px',
    largeDesktop: '1920px',
  },
  iconSizes: {
    regular: '24px',
  },
  maxWidth: { width750: '750px' },
};

export default theme;
