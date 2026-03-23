import type { Product, ProductFieldsList, ProductInMeal } from '@/api/types';

import { convertStringToDate, getTimeString } from './helpers';
import { millInGlass, millInLiters, minPortionAmount } from './variables';

export enum MathActionsList {
  add = 'add',
  substract = 'substract',
}

export const calculateBMI = (weight: number, height: number) => {
  return +(weight / Math.pow(height / 100, 2)).toFixed(1);
};

export const calculateAge = (birthdate: string | undefined) => {
  if (!birthdate) {
    return 0;
  }
  const currentDate = new Date();
  const dob = birthdate.includes('.')
    ? convertStringToDate(birthdate)
    : convertStringToDate(getTimeString(birthdate, 'DD.MM.YYYY'));

  return currentDate.getFullYear() - dob.getFullYear();
};

export enum BmiStateList {
  isLess = 'isLess',
  normal = 'normal',
  lowerNormal = 'lowerNormal',
  upperNormal = 'upperNormal',
  isMore = 'isMore',
}
export const BMIRange = {
  minValue: 18.5,
  normMinValue: 20.5,
  normMaxValueUnder50: 23,
  maxValueUnder50: 25,
  maxValueOver50: 27,
};

export const getPercentageOfDayNorm = (current: number, total: number) => {
  const diff = (100 * current) / total;

  return isNaN(diff) ? 0 : diff;
};

export const getPortionsInMeal = (
  portion: number,
  amount: number,
  needsRecalculcalation = true,
  isCalories = false,
) => {
  const portionNum = needsRecalculcalation ? (portion / 100) * amount : portion;
  let res = portionNum >= minPortionAmount ? portionNum : 0;
  res = isCalories ? Math.round(portionNum) : Number(portionNum.toFixed(1));
  return res ? res : 0;
};

export const getMealCalories = (
  products: Product[] | ProductInMeal[],
  needsRecalculcalation = true,
) => {
  const totalCalories = needsRecalculcalation
    ? products.reduce(
        (partialSum, product) =>
          partialSum + Number(getPortionsInMeal(product.kcal, Number(product.amount))),
        0,
      )
    : products.reduce((partialSum, product) => partialSum + product.kcal, 0);

  return Math.round(totalCalories);
};

export const getTotalPortionsInMeal = (
  products: ProductInMeal[],
  portionName: string | ProductFieldsList[],
  needsRecalculcalation = true,
  isInteger = false,
): number => {
  const totalPortions = needsRecalculcalation
    ? products.reduce(
        (partialSum, product) =>
          partialSum +
          Number(getPortionsInMeal(+product[portionName as keyof typeof product], product.amount)),
        0,
      )
    : products.reduce(
        (partialSum, product) => partialSum + Number(product[portionName as keyof typeof product]),
        0,
      );

  const result = isInteger ? Math.round(totalPortions) : Number(totalPortions.toFixed(1));
  return totalPortions > 0 ? result : 0;
};

export const getWaterInLiters = (value: number) => {
  return (value * millInGlass) / millInLiters;
};

export const countPercents = (value: number, percent: number, action: MathActionsList) => {
  const addedPercents = value * (1 + percent / 100);
  const substractedPercents = value * (1 - percent / 100);

  return action === MathActionsList.add ? addedPercents : substractedPercents;
};
