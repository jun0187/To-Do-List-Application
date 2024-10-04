import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {BIOMETRIC_TYPE} from '../constant/authentication.constant';
import {UserModel} from '../interface/authentication.interface';

export interface AuthenticationState {
  biometryType: BIOMETRIC_TYPE | null;
  user: UserModel | null;
  userList: Array<UserModel>;
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthenticationState = {
  biometryType: null,
  user: null,
  userList: [],
  accessToken: '',
  refreshToken: '',
};

export const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setBiometricType: (state, action: PayloadAction<BIOMETRIC_TYPE | null>) => {
      state.biometryType = action.payload;
    },
    setUser: (state, action: PayloadAction<UserModel | null>) => {
      state.user = action.payload;
    },
    setUserList: (state, action: PayloadAction<Array<UserModel>>) => {
      state.userList = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
  },
});

export const {
  setBiometricType,
  setUser,
  setUserList,
  setAccessToken,
  setRefreshToken,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
