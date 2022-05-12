export interface IResponse {
  data: IUser;
  message: string;
}

export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IGoogleRequest {
  tokenId: string;
}

export interface IUser {
  user: UserType
  accessToken: string;
}

export type UserType = {
  id?: number,
  firstName?: string,
  lastName?: string,
  role?: null,
  email?: string,
  phoneNumber?: null,
  createdAt?: string,
  isGoogle?: boolean,
};

export interface IResponseError  {
  data: ErrorData
  status: number
}

type ErrorData = {
  message: string,
  statusCode: number
}

export interface Email {
  email: string;
}
export interface Password {
  token: string | undefined;
  password: string;
}

