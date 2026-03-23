import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { type MealTimeSate } from '@/api/types';

const initialState: MealTimeSate = {
  time: '',
};

export const mealTimeSlice = createSlice({
  name: 'mealTime',
  initialState,
  reducers: {
    setMealTime: (state, { payload }: PayloadAction<string>) => {
      state.time = payload;
    },
  },
});

export const { setMealTime } = mealTimeSlice.actions;
export const mealTimeReducer = mealTimeSlice.reducer;
