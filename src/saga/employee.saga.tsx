import {createAction, PayloadAction} from '@reduxjs/toolkit';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {apiRequestWithAccessToken, EHttpMethod} from '../services/Api.service';
import {setIsLoader} from '../reducer/common.reducer';
import {setEmployeeList} from '../reducer/employee.reducer';
import {
  EmployeeListApiRes,
  EmployeeModel,
} from '../interface/employee.interface';
import {AxiosResponse} from 'axios';
import {Alert} from 'react-native';

export function* getEmployeeList(
  action: PayloadAction<{pageNo?: number; pageSize?: number}>,
) {
  const {pageNo = 0, pageSize = 8} = action.payload;

  try {
    if (pageNo === 0) {
      yield put(setEmployeeList(null));
    }
    const employeeList: EmployeeListApiRes = yield select(
      (state: any) => state.employee.employeeList,
    );
    yield put(
      setEmployeeList({
        ...employeeList,
        data: {...employeeList?.data, isLoading: true, isError: false},
      }),
    );
    const {data}: AxiosResponse<EmployeeListApiRes> = yield call(
      apiRequestWithAccessToken,
      EHttpMethod.GET,
      '/employees/pagination',
      {pageNo, pageSize},
    );
    yield put(
      setEmployeeList({
        ...data,
        data: {
          ...data.data,
          isLoading: false,
          content: employeeList?.data?.content
            ? [...employeeList?.data?.content, ...data.data.content]
            : data.data.content,
        },
      }),
    );
  } catch (e: any) {
    const employeeList: EmployeeListApiRes = yield select(
      state => state.employee.employeeList,
    );
    yield put(
      setEmployeeList({
        ...employeeList,
        data: {
          ...employeeList.data,
          content: [],
          isError: true,
          isLoading: false,
        },
      }),
    );
  }
}
export function* addEmployee(action: PayloadAction<EmployeeModel>) {
  try {
    yield put(setIsLoader(true));
    yield call(
      apiRequestWithAccessToken,
      EHttpMethod.POST,
      '/employees',
      action.payload,
    );
  } catch (e: any) {
    Alert.alert('Error to add employee: ', e.message);
  } finally {
    yield put(setIsLoader(false));
  }
}
export function* updateEmployee(action: PayloadAction<EmployeeModel>) {
  try {
    yield put(setIsLoader(true));
    yield call(
      apiRequestWithAccessToken,
      EHttpMethod.PUT,
      `/employees/${action.payload.id}`,
      action.payload,
    );
  } catch (e: any) {
    Alert.alert('Error to update employee: ', e.message);
  } finally {
    yield put(setIsLoader(false));
  }
}
export function* deleteEmployee(action: PayloadAction<EmployeeModel>) {
  try {
    yield put(setIsLoader(true));
    yield call(
      apiRequestWithAccessToken,
      EHttpMethod.DELETE,
      `/employees/${action.payload.id}`,
      action.payload,
    );
  } catch (e: any) {
    Alert.alert('Error to update employee: ', e.message);
  } finally {
    yield put(setIsLoader(false));
  }
}
export function* EmployeeSaga() {
  yield takeEvery(getEmployeeListAction.type, getEmployeeList);
  yield takeEvery(addEmployeeAction.type, addEmployee);
  yield takeEvery(updateEmployeeAction.type, updateEmployee);
  yield takeEvery(deleteEmployeeAction.type, deleteEmployee);
}

export const getEmployeeListAction: any = createAction<{
  pageNo?: number;
  pageSize?: number;
}>('getEmployeeListAction');

export const addEmployeeAction: any =
  createAction<EmployeeModel>('addEmployeeAction');

export const updateEmployeeAction: any = createAction<EmployeeModel>(
  'updateEmployeeAction',
);

export const deleteEmployeeAction: any = createAction<EmployeeModel>(
  'deleteEmployeeAction',
);
