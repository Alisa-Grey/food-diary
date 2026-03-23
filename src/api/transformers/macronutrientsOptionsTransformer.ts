import type { MacronutrientsOption, MacronutrientsOptionExtended } from '../types';

export const macronutrientsOptionsTransformer = (
  data: MacronutrientsOption[],
): MacronutrientsOptionExtended[] => {
  const result = data.map(item => {
    return { ...item, shortName: String(item.name.split(' ')[0]) };
  });

  return result;
};
