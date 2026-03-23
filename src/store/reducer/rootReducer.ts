import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './authSlice';
import { mealTimeReducer } from './mealTimeSlice';
import { questionaryReducer } from './questionarySlice';
import { userReducer } from './userSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  questionary: questionaryReducer,
  user: userReducer,
  mealTime: mealTimeReducer,
});
