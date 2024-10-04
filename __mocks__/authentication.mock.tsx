import {UserModel} from '../src/interface/authentication.interface';

export const taskListMock: Array<UserModel> = [
  {
    userName: 'testuser',
    password: 'password123',
  },
];

//based on taskListMock[0]
export const jwtMock =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3R1c2VyIiwicGFzc3dvcmQiOiJwYXNzd29yZDEyMyJ9.Uizzdk0tUQu5kp17xpBmgRon1ng39Ork0DTrk6JfoJk';

export const refreshTokenMock = `mockRefreshToken1${jwtMock}`;

export const accessTokenMock1 = `mockAccessToken1${jwtMock}`;
export const accessTokenMock2 = `mockAccessToken2${jwtMock}`;
