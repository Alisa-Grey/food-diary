export enum FieldNamesList {
  physicalActivity = 'physical_activity',
  bodyType = 'bodytype',
  water = 'water_norm',
}

export enum UserDataFieldsList {
  bodyType = 'bodytype',
  physicalActivity = 'physicalActivity',
}

export interface AuthState {
  isAuth: boolean;
}

export interface RegistrationState {
  email: string;
  password: string;
}

export interface QuestionaryState {
  questionaryState: {
    currentStep: number;
    weight: number | null;
    height: number | null;
    BMI?: number | null;
    gender: string | null;
    [FieldNamesList.physicalActivity]: number | null;
    [FieldNamesList.bodyType]: number | null;
    name: string;
    lastname?: string;
    birthdate: string;
  };
}

export interface UserChoiceState {
  [FieldNamesList.physicalActivity]: number | null;
  [FieldNamesList.bodyType]: number | null;
}
export interface UserChoiceProps {
  field: keyof UserChoiceState;
  value: number;
}

export interface ParamsState {
  weight: number;
  height: number;
  gender: string;
  BMI: number;
}

export interface PersonalDataState {
  name: string;
  lastname?: string;
  birthdate: string;
}

export enum NormFiledNamesList {
  weightMax = 'weight_max',
  weightMin = 'weight_min',
  waterNorm = 'water_norm',
  unrecommendedKcal = 'unrecommended_kcal',
  kcalMin = 'kcal_min',
  kcalMax = 'kcal_max',
}

export interface LatestMealState {
  time: string;
}
