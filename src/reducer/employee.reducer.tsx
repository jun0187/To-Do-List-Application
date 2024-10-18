import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {
  EmployeeListApiRes,
  EmployeeModel,
} from '../interface/employee.interface';

export interface EmployeeState {
  employee: EmployeeModel | null;
  employeeList: EmployeeListApiRes | null;
}

const initialState: EmployeeState = {
  employee: null,
  employeeList: null,
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployee: (state, action: PayloadAction<EmployeeModel | null>) => {
      state.employee = action.payload;
    },
    setEmployeeList: (
      state,
      action: PayloadAction<EmployeeListApiRes | null>,
    ) => {
      state.employeeList = action.payload;
    },
  },
});

export const {setEmployee, setEmployeeList} = employeeSlice.actions;

export default employeeSlice.reducer;
