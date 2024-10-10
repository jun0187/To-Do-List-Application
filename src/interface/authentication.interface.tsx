export interface UserModel {
  email: string;
  password: string;
}

export interface UserRegisterModel extends UserModel {
  firstName: string;
  lastName: string;
}

export interface TokenModel {
  access_token: string;
  refresh_token: string;
}
