import {jwtDecode} from 'jwt-decode';
import {isNullOrEmpty} from './Validation.service';
import {
  getNewAccessTokenAction,
  handleLogoutUserAction,
} from '../saga/authentication.saga';
import {KEYCHAIN_TYPE} from '../constant/authentication.constant';
import * as Keychain from 'react-native-keychain';
import {apiRequest, EHttpMethod} from './Api.service';
import {UserRegisterModel} from '../interface/authentication.interface';
import {Alert} from 'react-native';
import {store} from '../store';

export const isTokenExpired = (token: string) => {
  try {
    if (isNullOrEmpty(token)) {
      return true;
    }

    const tokenExpTime = jwtDecode(token).exp;
    if (tokenExpTime === undefined) {
      return false; // Token doesn't have exp claim
    }
    const currentTime = Date.now() / 1000; // Current time in seconds
    console.log('CURRENT::', currentTime);
    console.log('EXPIRYT::', tokenExpTime, tokenExpTime < currentTime);
    return tokenExpTime < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // If there's an error, assume expired
  }
};

export const tokenExpiredAction = (
  accessToken: string,
  refreshToken: string,
) => {
  if (isTokenExpired(accessToken)) {
    return {type: getNewAccessTokenAction.type};
  } else if (isTokenExpired(refreshToken)) {
    return {type: handleLogoutUserAction.type};
  }
  return {type: ''};
};

export const getTokensFromKeychain = async () => {
  const accessToken = await Keychain.getGenericPassword({
    service: KEYCHAIN_TYPE.ACCESS_TOKEN,
  });
  const refreshToken = await Keychain.getGenericPassword({
    service: KEYCHAIN_TYPE.REFRESH_TOKEN,
  });
  const user = await Keychain.getGenericPassword({
    service: KEYCHAIN_TYPE.USER,
  });

  return {accessToken, refreshToken, user};
};

export const setTokensInKeychain = async (
  accessToken?: string,
  refreshToken?: string,
  email?: string,
  password?: string,
) => {
  accessToken &&
    (await Keychain.setGenericPassword(
      KEYCHAIN_TYPE.ACCESS_TOKEN,
      accessToken,
      {
        service: KEYCHAIN_TYPE.ACCESS_TOKEN,
      },
    ));
  refreshToken &&
    (await Keychain.setGenericPassword(
      KEYCHAIN_TYPE.REFRESH_TOKEN,
      refreshToken,
      {
        service: KEYCHAIN_TYPE.REFRESH_TOKEN,
      },
    ));
  email &&
    password &&
    (await Keychain.setGenericPassword(email, password, {
      service: KEYCHAIN_TYPE.USER,
    }));
};

// Function for user login
export const loginUser = async (email: string, password: string) => {
  const response = await apiRequest(
    EHttpMethod.POST,
    '/auth/authenticate',
    {
      email,
      password,
    },
    {withCredentials: false},
  );

  await setTokensInKeychain(
    response.data.access_token,
    response.data.refresh_token,
    email,
    password,
  );
  return response.data;
};

// Function for user registration
export const registerUser = async (userData: UserRegisterModel) => {
  const response = await apiRequest(
    EHttpMethod.POST,
    '/auth/register',
    userData,
    {withCredentials: false},
  );
  await setTokensInKeychain(
    response.data.access_token,
    response.data.refresh_token,
    userData.email,
    userData.password,
  );
  return response.data;
};

// Function to refresh access token
export const refreshAccessToken = async () => {
  const {refreshToken} = await getTokensFromKeychain();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  const response = await apiRequest(
    EHttpMethod.POST,
    '/auth/refresh-token',
    {
      refresh_token: refreshToken.password,
    },
    {useRefreshToken: true},
  );

  await setTokensInKeychain(
    response.data.access_token,
    response.data.refresh_token,
  );

  return response.data;
};

export const alertAccessTokenExpired = () => {
  Alert.alert('Idle for long time', 'Do you wish to logout or continue?', [
    {
      text: 'Logout',
      onPress: () => {
        store.dispatch(handleLogoutUserAction());
      },
      style: 'cancel',
    },
    {
      text: 'Continue',
      onPress: () => {
        store.dispatch(getNewAccessTokenAction());
      },
    },
  ]);
};
