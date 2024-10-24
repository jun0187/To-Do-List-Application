import {createAction, PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeEvery} from 'redux-saga/effects';
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
import {
  TokenModel,
  UserModel,
  UserRegisterModel,
} from '../interface/authentication.interface';
import * as Keychain from 'react-native-keychain';
import {setIsLoader} from '../reducer/common.reducer';
import {
  getTokensFromKeychain,
  loginUser,
  refreshAccessToken,
  registerUser,
} from '../services/Token.service';

export function* getBiometryType() {
  try {
    yield put(setIsLoader(true));
    const bioType: BIOMETRIC_TYPE = yield call(getBiometricType);
    yield put(setBiometricType(bioType));
  } catch (e: any) {
    Alert.alert('Could not get biometry Type: ', e.message);
  } finally {
    yield put(setIsLoader(false));
  }
}

export function* handleLoginUser(action: PayloadAction<{user: UserModel}>) {
  const {user} = action.payload;
  try {
    yield put(setIsLoader(true));

    const response: TokenModel = yield call(
      loginUser,
      user.email,
      user.password,
    );

    yield put(setUser({email: user.email, password: user.password}));
    yield put(setAccessToken(response.access_token));
    yield put(setRefreshToken(response.refresh_token));
  } catch (e: any) {
    Alert.alert('Invalid credentials for login: ', e.message);
  } finally {
    yield put(setIsLoader(false));
  }
}

export function* getNewAccessToken() {
  try {
    yield put(setIsLoader(true));
    const response: TokenModel = yield call(refreshAccessToken);
    yield put(setAccessToken(response.access_token));
    yield put(setRefreshToken(response.refresh_token));
  } catch (e: any) {
    // Alert.alert('Invalid access token: ', e.message);
  } finally {
    yield put(setIsLoader(false));
  }
}

export function* getLoginUser() {
  try {
    const {accessToken, refreshToken, user} = yield call(getTokensFromKeychain);

    console.log('User::', user);
    console.log('Access Token::', accessToken);
    console.log('RefreshToken::', refreshToken);

    if (user) {
      yield put(setUser({email: user.username, password: user.password}));
    }
    if (accessToken) {
      yield put(setAccessToken(accessToken.password));
    }
    if (refreshToken) {
      yield put(setRefreshToken(refreshToken.password));
    }
  } catch (e: any) {
    Alert.alert('Failed to get user from keychain: ', e.message);
  }
}

export function* handleLogoutUser() {
  try {
    yield put(setIsLoader(true));
    yield call(Keychain.resetGenericPassword, {
      service: KEYCHAIN_TYPE.ACCESS_TOKEN,
    });
    yield call(Keychain.resetGenericPassword, {
      service: KEYCHAIN_TYPE.REFRESH_TOKEN,
    });

    yield put(setUser(null));
    yield put(setAccessToken(''));
    yield put(setRefreshToken(''));
  } catch (e: any) {
    Alert.alert('Failed to reset keychain: ', e.message);
  } finally {
    yield put(setIsLoader(false));
  }
}

export function* registerNewUser(
  action: PayloadAction<{user: UserRegisterModel}>,
) {
  const {user} = action.payload;
  try {
    yield put(setIsLoader(true));
    const response: TokenModel = yield call(registerUser, user);
    yield put(setUser({email: user.email, password: user.password}));
    yield put(setAccessToken(response.access_token));
    yield put(setRefreshToken(response.refresh_token));
  } catch (e: any) {
    Alert.alert('Invalid credentials for register: ', e.message);
  } finally {
    yield put(setIsLoader(false));
  }
}

export function* AuthenticationSaga() {
  yield takeEvery(getBiometryTypeAction.type, getBiometryType);
  yield takeEvery(handleLoginUserAction.type, handleLoginUser);
  yield takeEvery(getNewAccessTokenAction.type, getNewAccessToken);
  yield takeEvery(getLoginUserAction.type, getLoginUser);
  yield takeEvery(handleLogoutUserAction.type, handleLogoutUser);
  yield takeEvery(registerNewUserAction.type, registerNewUser);
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
export const registerNewUserAction: any = createAction<{
  user: UserRegisterModel;
}>('registerNewUserAction');
