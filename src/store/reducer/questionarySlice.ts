import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { PersonalDataState, UserChoiceProps } from '../type';
import { FieldNamesList, type ParamsState, type QuestionaryState } from '../type';

export const initialState: QuestionaryState = {
  questionaryState: {
    currentStep: 0,
    weight: null,
    height: null,
    BMI: null,
    gender: null,
    [FieldNamesList.physicalActivity]: null,
    [FieldNamesList.bodyType]: null,
    name: '',
    lastname: '',
    birthdate: '',
  },
};

export const questionarySlice = createSlice({
  name: 'questionary',
  initialState,
  reducers: {
    setCurrentStep: (
      state: { questionaryState: { currentStep: number } },
      action: PayloadAction<number>,
    ) => {
      state.questionaryState.currentStep = action.payload;
    },
    setUserChoice: (state, action: PayloadAction<UserChoiceProps>) => {
      state.questionaryState[action.payload.field] = action.payload.value;
    },
    setParams: (state, action: PayloadAction<ParamsState>) => {
      state.questionaryState.weight = action.payload.weight;
      state.questionaryState.height = action.payload.height;
      state.questionaryState.gender = action.payload.gender;
      state.questionaryState.BMI = action.payload.BMI;
    },
    setPersonalData: (
      state: {
        questionaryState: PersonalDataState;
      },
      action: PayloadAction<PersonalDataState>,
    ) => {
      state.questionaryState.name = action.payload.name;
      state.questionaryState.lastname = action.payload.lastname;
      state.questionaryState.birthdate = action.payload.birthdate;
    },
    setEmptyQuestionary: (state: QuestionaryState) => {
      state.questionaryState.currentStep = 0;
      state.questionaryState.weight = null;
      state.questionaryState.height = null;
      state.questionaryState.BMI = null;
      state.questionaryState.gender = null;
      state.questionaryState[FieldNamesList.physicalActivity] = null;
      state.questionaryState[FieldNamesList.bodyType] = null;
      state.questionaryState.name = '';
      state.questionaryState.lastname = '';
      state.questionaryState.birthdate = '';
    },
  },
});

export const { setCurrentStep, setUserChoice, setParams, setPersonalData, setEmptyQuestionary } =
  questionarySlice.actions;
export const questionaryReducer = questionarySlice.reducer;
