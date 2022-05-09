import { IUser } from "redux/reducers/types";
export interface FormValues {
  email: string;
  password: string;
}

export interface ILoginFormValues {
  user: FormValues;
}

export interface IUserData {
  user: IUser;
  accessToken: string;
  message?: string;
}
