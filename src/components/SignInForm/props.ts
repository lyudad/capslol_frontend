<<<<<<< HEAD
import { IUser } from "redux/slices/types";

=======
import { UserType } from "store/slices/auth/auth.type";
>>>>>>> develop
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
