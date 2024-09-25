import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {combinedReducers} from './reducer/index.reducer';
import rootSaga from './saga/index.saga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combinedReducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
