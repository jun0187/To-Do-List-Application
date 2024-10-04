import {createAction, PayloadAction} from '@reduxjs/toolkit';
import {call, delay, put, takeEvery} from 'redux-saga/effects';
import {getBiometricType} from '../services/Biometric.service';
import {
  setAccessToken,
  setBiometricType,
  setRefreshToken,
  setUser,
} from '../reducer/authentication.reducer';
import {Alert} from 'react-native';
import {
  BIOMETRIC_TYPE,
  KEYCHAIN_TYPE,
} from '../constant/authentication.constant';
import {UserModel} from '../interface/authentication.interface';
import {
  accessTokenMock1,
  accessTokenMock2,
  refreshTokenMock,
} from '../../__mocks__/authentication.mock';
import * as Keychain from 'react-native-keychain';

export function* getBiometryType() {
  try {
    const bioType: BIOMETRIC_TYPE = yield call(getBiometricType);
    yield put(setBiometricType(bioType));
  } catch (e: any) {
    Alert.alert('Could not get biometry Type: ', e.message);
  }
}

export function* handleLoginUser(action: PayloadAction<{user: UserModel}>) {
  const {user} = action.payload;
  try {
    // const { accessToken, refreshToken } = await axios.post(`${API_URL}/login`, {
    //   username,
    //   password,
    // });
    // Simulate API call delay
    yield delay(1000);

    yield call(
      Keychain.setGenericPassword,
      KEYCHAIN_TYPE.ACCESS_TOKEN,
      accessTokenMock1,
      {
        service: KEYCHAIN_TYPE.ACCESS_TOKEN,
      },
    );

    yield call(
      Keychain.setGenericPassword,
      KEYCHAIN_TYPE.REFRESH_TOKEN,
      refreshTokenMock,
      {
        service: KEYCHAIN_TYPE.REFRESH_TOKEN,
      },
    );

    yield call(Keychain.setGenericPassword, user.userName, user.password, {
      service: KEYCHAIN_TYPE.USER,
    });
    yield call(getLoginUserAction);
  } catch (e) {
    console.log('Invalid credentials::', e);
  }
}

export function* getNewAccessToken() {
  try {
    const refreshToken: any = yield call(Keychain.getGenericPassword, {
      service: KEYCHAIN_TYPE.REFRESH_TOKEN,
    });
    // Simulate API call delay
    yield delay(1000);
    if (refreshToken === refreshTokenMock) {
      yield call(
        Keychain.setGenericPassword,
        KEYCHAIN_TYPE.ACCESS_TOKEN,
        accessTokenMock2,
        {
          service: KEYCHAIN_TYPE.ACCESS_TOKEN,
        },
      );
      yield call(getLoginUserAction);
    }
  } catch (e) {
    console.log('Invalid access token::', e);
  }
}

export function* getLoginUser() {
  try {
    const user: any = yield call(Keychain.getGenericPassword, {
      service: KEYCHAIN_TYPE.USER,
    });
    const accessToken: any = yield call(Keychain.getGenericPassword, {
      service: KEYCHAIN_TYPE.ACCESS_TOKEN,
    });
    const refreshToken: any = yield call(Keychain.getGenericPassword, {
      service: KEYCHAIN_TYPE.REFRESH_TOKEN,
    });
    console.log('User::', user);
    console.log('Access Token::', accessToken);
    console.log('RefreshToken::', refreshToken);

    if (user) {
      yield put(setUser({userName: user.username, password: user.password}));
    }
    if (accessToken) {
      yield put(setAccessToken(accessToken));
    }
    if (refreshToken) {
      yield put(setRefreshToken(refreshToken));
    }
  } catch (e) {
    console.log('Failed to get user from keychain::', e);
  }
}

export function* handleLogoutUser() {
  try {
    yield call(Keychain.resetGenericPassword, {
      service: KEYCHAIN_TYPE.USER,
    });
    yield call(Keychain.resetGenericPassword, {
      service: KEYCHAIN_TYPE.ACCESS_TOKEN,
    });
    yield call(Keychain.resetGenericPassword, {
      service: KEYCHAIN_TYPE.REFRESH_TOKEN,
    });

    yield put(setUser(null));
    yield put(setAccessToken(''));
    yield put(setRefreshToken(''));
  } catch (e) {
    console.log('Failed to reset keychain::', e);
  }
}

export function* AuthenticationSaga() {
  yield takeEvery(getBiometryTypeAction.type, getBiometryType);
  yield takeEvery(handleLoginUserAction.type, handleLoginUser);
  yield takeEvery(getNewAccessTokenAction.type, getNewAccessToken);
  yield takeEvery(getLoginUserAction.type, getLoginUser);
  yield takeEvery(handleLogoutUserAction.type, handleLogoutUser);
}

export const getBiometryTypeAction: any = createAction('getBiometryTypeAction');
export const handleLoginUserAction: any = createAction<{
  user: UserModel;
}>('handleLoginUserAction');
export const getNewAccessTokenAction: any = createAction(
  'getNewAccessTokenAction',
);
export const getLoginUserAction: any = createAction('getLoginUserAction');
export const handleLogoutUserAction: any = createAction(
  'handleLogoutUserAction',
);
