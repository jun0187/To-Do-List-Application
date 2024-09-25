import {PayloadAction, createAction} from '@reduxjs/toolkit';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {TaskModel} from '../interface/task.interface';
import {setTask, setTaskList} from '../reducer/task.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY, TASK_NAV} from '../constant/task.constant';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export function* getMovieList(
  action: PayloadAction<{releaseDate: string; sortBy: string; page: number}>,
) {
  const {releaseDate, sortBy, page} = action.payload;

  try {
    if (page === 1) {
      // yield put(setMovieList(null));
    }

    // const movieList: MovieListRes = yield select(
    //   (state) => state.movie.movieList
    // );

    // yield put(setMovieList({ ...movieList, isLoading: true, isError: false }));

    // const { data } = yield call(() => {
    //   return axios.get(API.LISTING_API, {
    //     params: {
    //       api_key: API.API_KEY,
    //       "primary_release_date.lte": releaseDate,
    //       sort_by: sortBy,
    //       page: page,
    //     },
    //   });
    // });
    // yield put(
    //   setMovieList({
    //     ...data,
    //     isLoading: false,
    //     results: movieList?.results
    //       ? [...movieList?.results, ...data.results]
    //       : data.results,
    //   })
    // );
  } catch (e) {
    // const movieList: MovieListRes = yield select(
    //   (state) => state.movie.movieList
    // );
    // yield put(setMovieList({ ...movieList, isLoading: false, isError: true }));
  }
}

export function* savedTask(
  action: PayloadAction<{taskList: Array<TaskModel>}>,
) {
  try {
    console.log('aa', action.payload.taskList);
    yield put(setTaskList(action.payload.taskList));

    yield call(
      AsyncStorage.setItem,
      STORAGE_KEY,
      JSON.stringify(action.payload.taskList),
    );
    console.log('Data successfully saved');
  } catch (e) {
    console.log('Failed to save the data to the storage');
  }
}

export function* getTaskList() {
  try {
    // await AsyncStorage.clear();
    const value: string = yield call(AsyncStorage.getItem, STORAGE_KEY);

    if (value !== null) {
      yield put(setTask(JSON.parse(value)));
      console.log('value::', value);
    }
  } catch (e) {
    console.log('Failed to fetch the input from storage');
  }
}

export function* TaskSaga() {
  yield takeEvery(getMovieListAction.type, getMovieList);
  yield takeEvery(savedTaskAction.type, savedTask);
  yield takeEvery(getTaskListAction.type, getTaskList);
}

export const getMovieListAction: any = createAction<{
  releaseDate: string;
  sortBy: string;
  page: number;
}>('getMovieListAction');

export const savedTaskAction: any = createAction<{
  taskList: Array<TaskModel>;
}>('savedTaskAction');
export const getTaskListAction: any = createAction('getTaskListAction');
