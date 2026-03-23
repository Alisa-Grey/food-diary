import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { type User, UserFieldsList } from '@/api/types';

const initialState: User = {
  [UserFieldsList.userId]: '',
  name: '',
  lastname: '',
  birthdate: '',
  height: '',
  weight: '',
  phone: null,
  photo: null,
  email: '',
  gender: '',
  [UserFieldsList.physicalActivity]: '',
  goal: '',
  bodytype: '',
  [UserFieldsList.registrationDate]: '',
  [UserFieldsList.isWeightConfirmed]: false,
  [UserFieldsList.isMacronutrientsViewEnabled]: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      return {
        ...state,
        ...payload,
      };
    },
    setEmptyUser: state => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const { setUser, setEmptyUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
