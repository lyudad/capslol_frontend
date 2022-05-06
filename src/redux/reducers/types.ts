export interface IUser {
  id?: number | null;
  email?: string;
  firstName?: string;
  lastName?: string;
  role: string;
  phoneNumber: string | null;
  password: string | null;
  createdAt?: Date;
  isGoogle?: boolean;
}

export type Token = string | null;

export interface Auth {
  accessToken: string;
  refreshToken: string;
}

export interface IUserState {
  token?: string | null;
  isLoggedIn?: boolean;
  users?: [];
  user?: IUser | null;
  auth?: Auth | null;
  isLoading?: boolean;
  error?: string | null;
  isHasPassword?: boolean | null;
}
