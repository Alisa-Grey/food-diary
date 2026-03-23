import text from '@/locales/translation.json';
import type { FormProps } from '@/screens/Registration/Registration';

import { calculateAge } from './calculation';
import {
  maxAgeValue,
  maxHeight,
  maxLastNameLength,
  maxNameLength,
  maxPasswordLength,
  maxPhoneLength,
  maxWeight,
  minAgeValue,
  minHeight,
  minPasswordLength,
  minWeight,
} from './variables';

const {
  errorMessages,
  questionaryFormParameters,
  questionaryFormPersonalData,
  questionaryFormPhysicalActivity,
  noValueError,
} = text;

export const emailRules = {
  required: errorMessages.noEmailError,
  pattern: {
    value: /^\S+@\S+\.\S+$/,
    message: errorMessages.emailValidationError,
  },
};

export const passwordRules = {
  required: errorMessages.noPasswordError,
  minLength: {
    value: minPasswordLength,
    message: errorMessages.shortPasswordError,
  },
  maxLength: {
    value: maxPasswordLength,
    message: errorMessages.longPasswordError,
  },
};

export const passworRepeatRules = {
  required: errorMessages.noValueError,
  validate: {
    validate: (value1: string, value2: FormProps) => {
      if (value1 !== value2.password) {
        return errorMessages.passwordsMismatchError;
      }
    },
  },
};

export const checkboxRules = {
  required: errorMessages.noAgreementError,
};

export const weightRules = {
  required: questionaryFormParameters.errors.noWeight,
  validate: {
    validate: (value: number) => {
      if (value < minWeight || value > maxWeight) {
        return questionaryFormParameters.errors.weight;
      }
    },
  },
};

export const heightRules = {
  required: questionaryFormParameters.errors.noHeight,
  validate: {
    validate: (value: number) => {
      if (value < minHeight || value > maxHeight) {
        return questionaryFormParameters.errors.height;
      }
    },
  },
};

export const genderRules = {
  required: questionaryFormParameters.errors.gender,
};

export const physicalActivityRules = {
  required: questionaryFormPhysicalActivity.error,
};

export const radiobuttonRules = {
  required: noValueError,
};

export const nameRules = {
  required: questionaryFormPersonalData.errors.name,
  maxLength: {
    value: maxNameLength,
    message: questionaryFormPersonalData.errors.longName,
  },
};

export const lastNameRules = {
  maxLength: {
    value: maxLastNameLength,
    message: questionaryFormPersonalData.errors.longLastName,
  },
};

export const birthdateRules = {
  required: questionaryFormPersonalData.errors.noBirthdate,
  pattern: {
    value: /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[.]([0]?[1-9]|[1][0-2])[.]([0-9]{4}|[0-9]{2})$/,
    message: questionaryFormPersonalData.errors.birthdateFormatError,
  },
  validate: {
    validate: (value: string) => {
      if (new Date(value) > new Date()) {
        return questionaryFormPersonalData.errors.futureBirthdate;
      }
      if (calculateAge(value) < minAgeValue) {
        return questionaryFormPersonalData.errors.minAge;
      }
      if (calculateAge(value) > maxAgeValue) {
        return questionaryFormPersonalData.errors.maxAge;
      }
    },
  },
};

export const phoneRules = {
  maxLength: {
    value: maxPhoneLength,
    message: errorMessages.phoneError,
  },
  pattern: {
    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,5}$/im,
    message: errorMessages.phoneError,
  },
};

export const phoneRequiredRule = {
  required: errorMessages.phoneError,
  maxLength: {
    value: maxPhoneLength,
    message: errorMessages.phoneError,
  },
  pattern: {
    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,5}$/im,
    message: errorMessages.phoneError,
  },
};
