import { UserType } from 'store/slices/auth/auth.type';

export interface IPassword {
    id: number | undefined;
    password: string;
}

export interface IUserValue {
    id: number | undefined;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}

export interface IUser {
    data: UserType | undefined;
}
