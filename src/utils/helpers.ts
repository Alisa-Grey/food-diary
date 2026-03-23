import 'moment/locale/ru';

import moment from 'moment';

import { ProductFieldsList } from '@/api/types';
import text from '@/locales/translation.json';
import theme from '@/styles/theme/theme';

import { BMIRange, countPercents, MathActionsList } from './calculation';

export enum DeviceTypeList {
  desktop = 'desktop',
  tablet = 'tablet',
  mobile = 'mobile',
}

export enum CaloriesStateList {
  empty = 'empty',
  isBelowNorm = 'isBelowNorm',
  exceedsNorm = 'exceedsNorm',
}

export const getDeviceType = () => {
  if (typeof window !== 'undefined') {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return DeviceTypeList.tablet;
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua,
      )
    ) {
      return DeviceTypeList.mobile;
    }
  }
  return DeviceTypeList.desktop;
};

export const formatBirthdate = (value: string) => {
  return value.split('-').reverse().join('.');
};

export const formatGender = (value: string): string => {
  const { gender } = text.userProfileScreen;
  const [male, female] = gender;

  let genderName;
  if (value) {
    genderName = value === 'male' ? male : female;
  }
  return genderName ? genderName : '';
};

export const formatDateToLocal = (value: string) => {
  const date = new Date(convertStringToDate(value));

  const dateString = date.toLocaleString('ru-RU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return dateString.substring(0, dateString.length - 3);
};

export const formatDateWithWeekday = (value: string) => {
  const { weekdays } = text;

  const date = new Date(value);
  const today = new Date();

  const dateString = date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });
  const index = date.getDay();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const weekday = date.toDateString() === today.toDateString() ? weekdays[7] : weekdays[index];

  return `${weekday}, ${dateString}`;
};

export const formatFloat = (value: number) => {
  return value.toString().replace('.', ',');
};

export const capitalizeString = (value: string) => {
  if (!value) {
    return '';
  }
  const valueTrimmed = value.trim();
  const firstLetter = valueTrimmed.slice(0, 1).toUpperCase();
  const rest = valueTrimmed.slice(1);
  return firstLetter + rest;
};

export const formatTimeToDatetime = (time: string | Date, format = 'YYYY-MM-DD  HH:mm:ss') => {
  const dateNow =
    typeof time === 'string'
      ? moment(new Date()).format('YYYY-MM-DD')
      : moment(time).format('YYYY-MM-DD');
  const datetime =
    typeof time === 'string'
      ? moment(`${dateNow} ${time}`).format(format)
      : moment(time).format(format);

  return datetime;
};

export const checkIfObjectValuesEmpty = (obj: {}) => {
  return Object.values(obj).every(x => x === null || x === '' || typeof x === 'undefined');
};

export const getProductFullName = (
  nameMainPart: string,
  nameSecondaryPart: string | null,
  nameThirdPart: string | null,
) => {
  const mainPart = nameMainPart || ' ';
  const secondPart = nameSecondaryPart && nameSecondaryPart !== '0' ? nameSecondaryPart : ' ';
  const thirdPart = nameThirdPart && nameThirdPart !== '0' ? nameThirdPart : ' ';

  const fullName = capitalizeString(`${mainPart} ${secondPart} ${thirdPart}`.trim());

  return fullName;
};

export const getCorrectWordFormByAmount = (amount: number, words: string[]) => {
  amount = Math.abs(amount) % 100;
  const num = amount % 10;

  if (amount > 10 && amount < 20) {
    return words[2];
  }
  if (num > 1 && num < 5) {
    return words[1];
  }
  if (num === 1) {
    return words[0];
  }
  return words[2];
};

export const createDate = (datetime: string) => {
  let arr = datetime.split(/[- :]/);

  arr = arr.filter(el => el !== '');

  const [year, month, day, hours, minutes, seconds] = arr;
  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours) ? Number(hours) : 0,
    Number(minutes) ? Number(minutes) : 0,
    Number(seconds) ? Number(seconds) : 0,
  );

  return date;
};

export const getTimeString = (datetime: string, format = 'HH:mm') => {
  const date = createDate(datetime);

  return moment(date).format(format);
};

export const convertStringToDate = (value: string) => {
  const dateParts = value.split('.');

  const date = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));

  return date;
};

export const formatDate = (value: string, format: string) => {
  const date = convertStringToDate(value);

  const dateFormatted = moment(date).format(format);

  return dateFormatted;
};

export const getBMIRange = (age: number) => {
  return age <= 50 ? BMIRange.maxValueUnder50 : BMIRange.maxValueOver50;
};

export const getMonthName = (month: string, isFormatted = false): string => {
  const { monthNames, monthNamesFormatted } = text;
  const monthNum = Number(month);
  const monthName = isFormatted ? monthNamesFormatted[monthNum - 1] : monthNames[monthNum - 1];
  return monthName as string;
};

export const getLastMonth = (date: Date) => {
  const lastMonth = moment(date).subtract(1, 'month').startOf('month');
  return lastMonth.locale('ru').format('MMMM');
};

export const formatMonthName = (month: string | number) => {
  return getMonthName(month.toString()).toLocaleLowerCase();
};

export const getDaysInMonth = (date: Date) => {
  const daysInMonth = moment(date, 'YYYY-MM').daysInMonth();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const daysArray = Array.from({ length: daysInMonth }, (_value, index) => index + 1);
  const result = daysArray.map(el => {
    return { day: el.toString(), value: '' };
  });
  return result;
};

export const getLocalYearMonth = (date: Date, locale: string) => {
  const result = date
    .toLocaleDateString(locale, {
      month: 'long',
      year: 'numeric',
    })
    .split('');

  result[0] = (result[0] as string).toUpperCase();
  return result.slice(0, -3).join('');
};

export const getCharsAfterDot = (value: number) => {
  return value.toString().split('.')[1] ? (value.toString().split('.')[1] as string).length : 0;
};

export const clearLocalStorage = (exclude: string[]) => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key && !exclude.includes(key)) {
      localStorage.removeItem(key);
    }
  }
};

export interface NutrientTextContentProps {
  id: string | ProductFieldsList;
  shortTitle: string;
  title: string;
  fullTitle: string;
  portionName: string;
}

export const getNutrientsTextContent = (
  isMacronutrientsViewEnabled: boolean,
): NutrientTextContentProps[] => {
  const { diaryScreen, questionaryFormDailyNorms, bulbsPopups } = text;
  const { combined } = bulbsPopups;
  const [, milkShort, proteinShort, vegetableShort, starchShort, fatShort, friutShort] =
    questionaryFormDailyNorms.portionName;
  const [proteinsShort, fatsShort, carbohydratesShort] = diaryScreen.macronutrientsShort;
  const [proteinsTitle, fatsTitle, carbohydratesTitle] = diaryScreen.macronutrients;
  const [proteinsFullTitle, fatsFullTitle, carbohydratesFullTitle] = diaryScreen.macronutrientsFull;
  const [milk, protein, vegetable, starch, fat, friut] = questionaryFormDailyNorms.portionFullName;

  if (isMacronutrientsViewEnabled) {
    return [
      {
        id: 'protein',
        shortTitle: proteinsShort as string,
        title: proteinsTitle as string,
        fullTitle: proteinsFullTitle as string,
        portionName: 'protein',
      },
      {
        id: 'fats',
        shortTitle: fatsShort as string,
        title: fatsTitle as string,
        fullTitle: fatsFullTitle as string,
        portionName: 'fats',
      },
      {
        id: 'carbs',
        shortTitle: carbohydratesShort as string,
        title: carbohydratesTitle as string,
        fullTitle: carbohydratesFullTitle as string,
        portionName: 'carbs',
      },
    ];
  } else {
    return [
      {
        id: ProductFieldsList.milkPortionNum,
        shortTitle: milkShort as string,
        title: milk as string,
        portionName: ProductFieldsList.milkPortionNum,
        fullTitle: combined.milk_portion.title,
      },
      {
        id: ProductFieldsList.proteinPortionNum,
        shortTitle: proteinShort as string,
        title: protein as string,
        portionName: ProductFieldsList.proteinPortionNum,
        fullTitle: combined.protein_portion.title,
      },
      {
        id: ProductFieldsList.vegetablePortionNum,
        shortTitle: vegetableShort as string,
        title: vegetable as string,
        portionName: ProductFieldsList.vegetablePortionNum,
        fullTitle: combined.vegetable_portion.title,
      },
      {
        id: ProductFieldsList.starchPortionNum,
        shortTitle: starchShort as string,
        title: starch as string,
        portionName: ProductFieldsList.starchPortionNum,
        fullTitle: combined.starch_portion.title,
      },
      {
        id: ProductFieldsList.fatPortionNum,
        shortTitle: fatShort as string,
        title: fat as string,
        portionName: ProductFieldsList.fatPortionNum,
        fullTitle: combined.fat_portion.title,
      },
      {
        id: ProductFieldsList.fruitPortionNum,
        shortTitle: friutShort as string,
        title: friut as string,
        portionName: ProductFieldsList.fruitPortionNum,
        fullTitle: combined.fruit_portion.title,
      },
    ];
  }
};

export const getCaloriesState = (caloriesDifference: number) => {
  if (caloriesDifference === 0) {
    return CaloriesStateList.empty;
  } else if (caloriesDifference > 0) {
    return CaloriesStateList.isBelowNorm;
  } else {
    return CaloriesStateList.exceedsNorm;
  }
};

export const formatNumber = (value: number) => {
  return value % 1 === 0 ? value : value.toFixed(1);
};

export const getBulbColor = (currentValue: number, valueNorm: number, percentage: number) => {
  let backgroundColor = theme.colors.gray;

  const greyZonePercentage = 80;

  const isGreyZone = percentage < greyZonePercentage;

  const minNorm = countPercents(valueNorm, 20, MathActionsList.substract);
  const maxNorm = countPercents(valueNorm, 20, MathActionsList.add);
  const maxAllowedForRest = countPercents(valueNorm, 10, MathActionsList.add);

  const isGreenZoneTypeOne = minNorm <= currentValue && currentValue <= valueNorm;
  const isGreenZoneTypeTwo = valueNorm <= currentValue && currentValue < maxNorm;
  const isGreenZone = isGreenZoneTypeOne || isGreenZoneTypeTwo;

  const isRedZoneTypeOne = valueNorm < currentValue;
  const isRedZoneTypeTwo = maxNorm <= currentValue;
  const isRedZoneForRest = maxAllowedForRest <= currentValue;
  const isRedZone = isRedZoneTypeOne || isRedZoneTypeTwo || isRedZoneForRest;

  if (isGreyZone) {
    backgroundColor = theme.colors.gray;
  } else if (isGreenZone) {
    backgroundColor = theme.colors.lightNutri;
  } else if (isRedZone) {
    backgroundColor = theme.colors.lightDist;
  }

  return backgroundColor;
};
