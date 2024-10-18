import axios from 'axios';
import {handleLogoutUserAction} from '../saga/authentication.saga';
import {store} from '../store';
import {Alert} from 'react-native';
import {alertAccessTokenExpired, getTokensFromKeychain} from './Token.service';

export enum EHttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const api = axios.create({
  baseURL: 'https://disastrous-ursola-tajjgroup-5d7bcd12.koyeb.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  async (config: any) => {
    const {accessToken, refreshToken} = await getTokensFromKeychain();

    // Check if the endpoint requires an access token
    if (config.withCredentials && accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken.password}`;
    }

    // Use refresh token for specific auth requests if needed
    if (config.useRefreshToken && refreshToken) {
      config.headers['Authorization'] = `Bearer ${refreshToken.password}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response Interceptor
api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response) {
      console.log('error.response::', error.response.status);
      if (error.response.status === 403) {
        // access token expired
        console.log('refresh new token');
        alertAccessTokenExpired();
      } else if (error.response.status === 401) {
        // refresh token expired
        console.log('logout');
        store.dispatch(handleLogoutUserAction());
      } else {
        Alert.alert('Error communicating with server', error.message);
      }
    }

    return Promise.reject(error);
  },
);

// General API request function
export const apiRequest = async (
  method: EHttpMethod,
  endpoint: string,
  data: any = undefined,
  options: {
    withCredentials?: boolean;
    useRefreshToken?: boolean;
    params?: any;
  } = {},
) => {
  const fieldName = method === EHttpMethod.GET ? 'params' : 'data';

  const config = {
    [fieldName]: data,
    method,
    url: endpoint,
    withCredentials: options.withCredentials, // Optional flag for auth requirement
    useRefreshToken: options.useRefreshToken, // Optional flag for using refresh token
  };
  return await api(config);
};

export const apiRequestWithAccessToken = async (
  method: EHttpMethod,
  link: string,
  payload: object | null = null,
) => {
  return await apiRequest(method, link, payload, {
    withCredentials: true,
  });
};
