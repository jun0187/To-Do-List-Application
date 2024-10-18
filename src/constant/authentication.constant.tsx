export const AUTH_NAV = {
  MAIN: 'Authentication',
  LOGIN: 'Login',
  REGISTRATION: 'Registration',
};

export enum BIOMETRIC_TYPE {
  FACE_ID = 'FaceID',
  TOUCH_ID = 'TouchID',
}

export enum KEYCHAIN_TYPE {
  USER = 'user',
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export enum TOKEN {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
}
