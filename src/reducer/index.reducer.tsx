import taskReducer from './task.reducer';
import {combineReducers} from '@reduxjs/toolkit';

export const combinedReducers = combineReducers({
  task: taskReducer,
});
