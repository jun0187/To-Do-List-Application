import {all} from 'redux-saga/effects';
import {TaskSaga} from './task.saga';
import {AuthenticationSaga} from './authentication.saga';

function* rootSaga() {
  yield all([TaskSaga(), AuthenticationSaga()]);
}

export default rootSaga;
