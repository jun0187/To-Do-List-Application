import {all} from 'redux-saga/effects';
import {TaskSaga} from './task.saga';

function* rootSaga() {
  yield all([TaskSaga()]);
}

export default rootSaga;
