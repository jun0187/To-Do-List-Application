import {PayloadAction, createAction} from '@reduxjs/toolkit';
import {call, put, takeEvery} from 'redux-saga/effects';
import {TaskModel} from '../interface/task.interface';
import {setTaskList} from '../reducer/task.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '../constant/task.constant';

export function* savedTask(
  action: PayloadAction<{taskList: Array<TaskModel>}>,
) {
  try {
    yield put(setTaskList(action.payload.taskList));

    yield call(
      AsyncStorage.setItem,
      STORAGE_KEY,
      JSON.stringify(action.payload.taskList),
    );
  } catch (e) {
    console.log('Failed to save the data to the storage::', e);
  }
}

export function* getTaskList() {
  try {
    // await AsyncStorage.clear();
    const value: string = yield call(AsyncStorage.getItem, STORAGE_KEY);

    if (value !== null) {
      yield put(setTaskList(JSON.parse(value)));
      console.log('Value::', value);
    }
  } catch (e) {
    console.log('Failed to fetch the input from storage::', e);
  }
}

export function* TaskSaga() {
  yield takeEvery(savedTaskAction.type, savedTask);
  yield takeEvery(getTaskListAction.type, getTaskList);
}

export const savedTaskAction: any = createAction<{
  taskList: Array<TaskModel>;
}>('savedTaskAction');
export const getTaskListAction: any = createAction('getTaskListAction');
