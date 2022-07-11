export interface IResponse {
    data: IUser;
    message: string;
}

export interface IAuthRequest {
    email: string;
    password?: string;
}

export interface IGoogleRequest {
    tokenId: string;
}

export interface IUser {
    user: UserType;
    accessToken?: string;
}

export type UserType = {
    id: number;
    firstName?: string;
    lastName?: string;
    role?: string | null;
    email?: string;
    phoneNumber?: null;
    createdAt?: string;
    isGoogle?: boolean;
    isConfirmed?: boolean | undefined;
};

export interface IResponseError {
    data: ErrorType;
    status: number;
}

export interface ErrorType {
    message: string;
    statusCode: number;
}

export interface Email {
    email: string;
}
export interface Password {
    token: string | undefined;
    password: string;
}

export enum Role {
    FREELANCER = 'Freelancer',
    JOB_OWNER = 'Job Owner',
    NOSET = 'No set',
}

export interface setRole {
    userId: number;
    roleType: string;
}

export const FREELANCER = 'Freelancer';
export const JOB_OWNER = 'Job Owner';

export interface IConfirmEmailRequest {
    token: string | undefined;
}
