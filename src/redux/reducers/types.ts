export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  password: string;
  createdAt?: Date;
}

export type Token = string;

export interface Auth {
  accessToken: string;
  refreshToken: string;
}

export interface IUserState {
  isLoggedIn: boolean;
  users?: [];
  user: IUser | null;
  auth: Auth | null;
  isLoading: boolean;
  error: string | null;
  isHasPassword: boolean | null;
}
