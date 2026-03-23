import type { DurationInputArg2 } from 'moment';
import moment from 'moment';

export const checkIsBeforeRegistrationDate = (
  activeDate: string,
  registrationDate: string,
  timeUnit: DurationInputArg2,
) => {
  return moment(activeDate).subtract(1, timeUnit).isBefore(registrationDate, timeUnit);
};

export const checkIsFutureDay = (activeDate: Date) => {
  return moment(activeDate, 'DD-MM-YYYY').isAfter(moment(new Date()), 'day');
};

export const checkIsCurrent = (activeDate: Date, timeUnit: DurationInputArg2) => {
  return moment(activeDate).isSame(new Date(), timeUnit);
};
