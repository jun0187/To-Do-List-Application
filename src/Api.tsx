import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {KEYCHAIN_TYPE} from './constant/authentication.constant';
import {UserRegisterModel} from './interface/authentication.interface';
import {handleLogoutUserAction} from './saga/authentication.saga';
import {store} from './store';

export enum EHttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
export const API_BASE_URL =
  'https://disastrous-ursola-tajjgroup-5d7bcd12.koyeb.app/api/v1/auth/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set tokens in Keychain
const setTokensInKeychain = async (
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

// Function to get tokens from Keychain
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

const apiRequest = async (
  method: EHttpMethod,
  endpoint: string,
  data: any = null,
) => {
  const {refreshToken} = await getTokensFromKeychain();
  if (refreshToken) {
    api.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${refreshToken.password}`;
  }

  const config = {
    method,
    url: endpoint,
    data,
  };

  try {
    return await api(config);
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log('Token expired, attempting to refresh...');
      const data: any = await refreshAccessToken();
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.refresh_token}`;

      return await api({
        ...config,
      });
    }
    if (error.response && error.response.status === 403) {
      store.dispatch(handleLogoutUserAction());
    }
    throw error; // Rethrow if not a 401 error
  }
};

// Function for user login
export const loginUser = async (email: string, password: string) => {
  const response = await apiRequest(EHttpMethod.POST, '/authenticate', {
    email,
    password,
  });

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
  const response = await apiRequest(EHttpMethod.POST, '/register', userData);
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
  const response = await apiRequest(EHttpMethod.POST, '/refresh-token', {
    refreshToken: refreshToken.password,
  });

  await setTokensInKeychain(
    response.data.access_token,
    response.data.refresh_token,
  );

  return response.data;
};

export default {
  getTokensFromKeychain,
  loginUser,
  registerUser,
  refreshAccessToken,
};
