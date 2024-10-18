import authenticationReducer from './authentication.reducer';
import commonReducer from './common.reducer';
import employeeReducer from './employee.reducer';
import taskReducer from './task.reducer';
import {combineReducers} from '@reduxjs/toolkit';

export const combinedReducers = combineReducers({
  task: taskReducer,
  auth: authenticationReducer,
  common: commonReducer,
  employee: employeeReducer,
});
