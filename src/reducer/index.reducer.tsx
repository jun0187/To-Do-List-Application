import authenticationReducer from './authentication.reducer';
import taskReducer from './task.reducer';
import {combineReducers} from '@reduxjs/toolkit';

export const combinedReducers = combineReducers({
  task: taskReducer,
  auth: authenticationReducer,
});
