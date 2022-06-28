import { UserType } from 'store/slices/auth/auth.type';

export interface IPassword {
    id: number | undefined;
    password: string;
}

export interface IUser {
    data: UserType | undefined;
}
