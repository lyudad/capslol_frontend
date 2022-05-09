export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export type Token = string;

export interface Auth {
  accessToken: string;
  refreshToken: string;
}

export interface TypeUserState {
  isLoggedIn: boolean;
  user: User | null;
  auth: Auth | null;
  isLoading: boolean;
  error: string | null;
  isHasPassword: boolean;
}
