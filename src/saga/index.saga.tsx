import {all} from 'redux-saga/effects';
import {TaskSaga} from './task.saga';
import {AuthenticationSaga} from './authentication.saga';
import {EmployeeSaga} from './employee.saga';

function* rootSaga() {
  yield all([TaskSaga(), AuthenticationSaga(), EmployeeSaga()]);
}

export default rootSaga;
