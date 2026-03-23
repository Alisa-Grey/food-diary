import type { NormFiledNamesList, UserDataFieldsList } from '@/store/type';

export enum NutritionNormsList {
  milkPortionNum = 'milk_portion',
  fruitPortionNum = 'fruit_portion',
  vegetablePortionNum = 'vegetable_portion',
  starchPortionNum = 'starch_portion',
  proteinPortionNum = 'protein_portion',
  fatPortionNum = 'fat_portion',
  waterNorm = 'water_norm',
  protein = 'protein',
  fats = 'fats',
  carbs = 'carbs',
  kcalMin = 'kcal_min',
  kcalMax = 'kcal-_max',
  unrecommendedKcal = 'unrecomend_kcal',
  NutritionNormsList = 'NutritionNormsList',
}

export enum NutritionCurrentList {
  milkPortionCurrentNum = 'milk_portion_current',
  fruitPortionCurrentNum = 'fruit_portion_current',
  vegetablePortionCurrentNum = 'vegetable_portion_current',
  starchPortionCurrentNum = 'starch_portion_current',
  proteinPortionCurrentNum = 'protein_portion_current',
  fatPortionCurrentNum = 'fat_portion_current',
  waterNormCurrent = 'water_norm_current',
}

export enum ProductFieldsList {
  productNamePartOne = 'product_name_1',
  productNamePartTwo = 'product_name_2',
  productNamePartThree = 'product_name_3',
  milkPortionNum = 'milk_portion',
  fruitPortionNum = 'fruit_portion',
  vegetablePortionNum = 'vegetable_portion',
  starchPortionNum = 'starch_portion',
  proteinPortionNum = 'protein_portion',
  fatPortionNum = 'fat_portion',
  unrecommendedKcal = 'unrecommended_kcal',
  exceedKcal = 'exceed_kcal',
  recomendCode = 'recomend_code',
  productId = 'product_id',
  databaseItemId = 'id',
  mealProductId = 'meal_product_id',
}

export enum AuthCheckResponseFields {
  userId = 'user_id',
}

export enum MealFieldsList {
  mealId = 'meal_id',
}

export enum ProductStoreFieldsList {
  storeName = 'store_name',
}

export enum CountedNutrientsList {
  milkPortionNum = 'milk_portion',
  fruitPortionNum = 'fruit_portion',
  vegetablePortionNum = 'vegetable_portion',
  starchPortionNum = 'starch_portion',
  proteinPortionNum = 'protein_portion',
  fatPortionNum = 'fat_portion',
  waterNorm = 'water_norm',
  exceedKcal = 'exceed_kcal',
  fatPortionCurrentNum = 'fatPortionCurrentNum',
  unrecommendedKcal = 'unrecomend_kcal',
}

export enum AnalyticsFieldsList {
  milk = 'milk_portion',
  fruit = 'fruit_portion',
  vegetable = 'vegetable_portion',
  starch = 'starch_portion',
  protein = 'protein_portion',
  fat = 'fat_portion',
  unrecommendedKcal = 'unrecomend_kcal',
}

export enum UserFieldsList {
  physicalActivity = 'physical_activity',
  userId = 'user_id',
  registrationDate = 'registration_date',
  isWeightConfirmed = 'is_cweight_confirmed',
  isMacronutrientsViewEnabled = 'is_macronutrients_enabled',
}

export interface ErrorProps {
  code: number;
  error: string;
  message: string;
}

export interface ErrorResponse {
  message: string;
  code: number;
}

export interface BasicResponse {
  status: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface AuthCheckResponse {
  status: string;
  data?: {
    [AuthCheckResponseFields.userId]: string;
  };
}

export interface UserData {
  weight: number;
  height: number;
  gender: string;
  [UserDataFieldsList.bodyType]: number;
  [UserDataFieldsList.physicalActivity]: number;
  name: string;
  lastname?: string;
  birthdate: string;
}

export interface UserDataResponse {
  id: string;
  name: string | null;
  lastname: string;
  email: string;
  phone: string | null;
  role: string | null;
  password: string;
  gender: string | null;
  birthdate: string | null;
  height: string | null;
  photo: string | null;
}

export interface User {
  [UserFieldsList.userId]: string;
  birthdate: string;
  bodytype: string;
  [UserFieldsList.registrationDate]: string;
  email: string;
  gender: string;
  goal: string;
  weight: string;
  height: string;
  lastname: string;
  name: string;
  phone: string | null;
  photo: string | null;
  [UserFieldsList.physicalActivity]: string;
  [UserFieldsList.isWeightConfirmed]: boolean;
  [UserFieldsList.isMacronutrientsViewEnabled]: boolean;
}

export interface GetUserDataResponse {
  code: number;
  data: User;
}

export interface SendQuestionaryData {
  code: number;
  message: string;
}

export interface UserDayNorms {
  [NormFiledNamesList.weightMin]: number;
  [NormFiledNamesList.weightMax]: number;
  [NutritionNormsList.milkPortionNum]: number;
  [NutritionNormsList.fruitPortionNum]: number;
  [NutritionNormsList.vegetablePortionNum]: number;
  [NutritionNormsList.starchPortionNum]: number;
  [NutritionNormsList.proteinPortionNum]: number;
  [NutritionNormsList.fatPortionNum]: number;
  [NormFiledNamesList.waterNorm]: number;
  [NormFiledNamesList.unrecommendedKcal]: number;
  [NutritionNormsList.kcalMin]: number;
  [NutritionNormsList.kcalMax]: number;
  [NutritionNormsList.unrecommendedKcal]: number;
  protein: number;
  fats: number;
  carbs: number;
}

export interface UserDayNormDataResponse {
  data: UserDayNorms;
}

export interface UserDayNormData {
  date: string;
  goal: string;
  physicalActivity: number;
}

export interface WaterRequest {
  waterGlassNum: number;
  datetime: string;
}

export interface GetWaterResponse {
  data: {
    waterGlassNum: number;
  };
}

export interface WaterResponse {
  status: string;
}

export interface Product {
  [ProductFieldsList.databaseItemId]?: number;
  [ProductFieldsList.mealProductId]: number;
  [ProductFieldsList.productId]: number;
  [ProductFieldsList.productNamePartOne]: string;
  [ProductFieldsList.productNamePartTwo]: string;
  [ProductFieldsList.productNamePartThree]: string;
  portion: string;
  [ProductFieldsList.milkPortionNum]: number;
  [ProductFieldsList.fruitPortionNum]: number;
  [ProductFieldsList.vegetablePortionNum]: number;
  [ProductFieldsList.starchPortionNum]: number;
  [ProductFieldsList.proteinPortionNum]: number;
  [ProductFieldsList.fatPortionNum]: number;
  [ProductFieldsList.unrecommendedKcal]: number;
  kcal: number;
  protein: number;
  fats: number;
  carbs: number;
  [ProductFieldsList.recomendCode]: number;
  amount?: number;
  isRecomended: boolean;
  isunrecommended: boolean;
}

export interface ProductInMeal {
  [ProductFieldsList.mealProductId]: number;
  [ProductFieldsList.productId]: number;
  [ProductFieldsList.productNamePartOne]: string;
  [ProductFieldsList.productNamePartTwo]: string;
  [ProductFieldsList.productNamePartThree]: string;
  [ProductFieldsList.milkPortionNum]: number;
  [ProductFieldsList.fruitPortionNum]: number;
  [ProductFieldsList.vegetablePortionNum]: number;
  [ProductFieldsList.starchPortionNum]: number;
  [ProductFieldsList.proteinPortionNum]: number;
  [ProductFieldsList.fatPortionNum]: number;
  [ProductFieldsList.unrecommendedKcal]: number;
  amount: number;
  kcal: number;
  protein: number;
  fats: number;
  carbs: number;
}

export interface Meal {
  [MealFieldsList.mealId]: number;
  datetime: string;
  products: ProductInMeal[];
}

export interface GetUsersMealsResponse {
  status: string;
  data: Meal[];
}

export interface GetUsersMealByIdResponse {
  status: string;
  data: Meal;
}

export interface CountedNutrientsData {
  [CountedNutrientsList.milkPortionNum]: number;
  [CountedNutrientsList.fruitPortionNum]: number;
  [CountedNutrientsList.vegetablePortionNum]: number;
  [CountedNutrientsList.starchPortionNum]: number;
  [CountedNutrientsList.proteinPortionNum]: number;
  [CountedNutrientsList.fatPortionNum]: number;
  [CountedNutrientsList.unrecommendedKcal]: number;
  [CountedNutrientsList.exceedKcal]: number;
  [CountedNutrientsList.unrecommendedKcal]: number;
  kcal: number;
  protein: number;
  fats: number;
  carbs: number;
}
export interface GetCountedNutrientsResponse {
  status: string;
  data: CountedNutrientsData;
}

export interface SetMealTimeRequest {
  datetime: string;
  mealId: number;
}

export interface SetUserWeightRequestData {
  weight: number;
  date: string;
}

export interface SetUserWeightResponse {
  success: string;
  data: {
    isGoalAchived: boolean;
    isBmiLowerThenNorm: boolean;
    isBmiHigherThenNorm: boolean;
  };
}

export interface EditProfileRequest {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  photo?: string | File;
  isAllowedNotifications: boolean;
}

export interface MealTimeSate {
  time: string;
}

export interface UpdateWeightRequest {
  weight: number;
  date: string;
}

export interface CheckNormChangedResponse {
  status: string;
  data: {
    isNormChanged: boolean;
  };
}

export interface AnalyticsData {
  date: string;
  water: number;
  [AnalyticsFieldsList.milk]: number;
  [AnalyticsFieldsList.fruit]: number;
  [AnalyticsFieldsList.vegetable]: number;
  [AnalyticsFieldsList.starch]: number;
  [AnalyticsFieldsList.protein]: number;
  [AnalyticsFieldsList.fat]: number;
  kcal: number;
  [AnalyticsFieldsList.unrecommendedKcal]: number;
}

export interface AxisData {
  water: number[];
  [AnalyticsFieldsList.milk]: number[];
  [AnalyticsFieldsList.fruit]: number[];
  [AnalyticsFieldsList.vegetable]: number[];
  [AnalyticsFieldsList.starch]: number[];
  [AnalyticsFieldsList.protein]: number[];
  [AnalyticsFieldsList.fat]: number[];
  kcal: number[];
  [AnalyticsFieldsList.unrecommendedKcal]: number[];
}

export interface MonthlyAnalyticsResponse {
  status: number;
  data: {
    graphNumbers: AnalyticsData[];
    axisNumbers: AxisData;
  };
}

export interface FilledDay {
  date: string;
  isKcalExceed: boolean;
}

export interface FilledDaysResponse {
  status: string;
  data: {
    isFilledDates: FilledDay[];
  };
}

export interface CalendarState {
  date: string;
}
