import {jwtDecode} from 'jwt-decode';
import {isNullOrEmpty} from './Validation.service';
import {
  getNewAccessTokenAction,
  handleLogoutUserAction,
} from '../saga/authentication.saga';

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

export const isBothTokenExpired = (
  accessToken: string,
  refreshToken: string,
) => {
  return {
    accessToken: isTokenExpired(accessToken),
    refreshToken: isTokenExpired(refreshToken),
  };
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
