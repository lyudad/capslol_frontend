import { UserType } from "store/slices/auth/auth.type";

export interface FormValues {
  email: string;
  password: string;
}

export interface ILoginFormValues {
  user: FormValues;
}

export interface IUserData {
  user: UserType;
  accessToken: string;
  message?: string;
}
