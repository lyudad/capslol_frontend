export interface IUser {
    id: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    role: string | undefined;
    email: string | undefined;
    phoneNumber: number | undefined;
    createdAt: string | undefined;
    isGoogle: boolean;
}

export interface IJob {
    id: number | undefined;
    title: string | undefined;
    description: string | undefined;
    price: number | undefined;
    timeAvailable: number | undefined;
    createdAt: string | undefined;
    languageLevel: string | undefined;
    projectDuration: string | undefined;
}

export interface IMyOffer {
    id: number | undefined;
    hourRate: number | undefined;
    status: string;
    createdAt: string;
    ownerId: IUser;
    freelancerId: IUser;
    jobId: IJob;
}

export enum Status {
    DECLINED = 'Declined',
    ACCEPTED = 'Accepted',
    PENDING = 'Pending',
}
export interface IChangeStatus {
    id: number | undefined;
    status: Status;
}

export interface ICreateOffer {
    hourRate: number | undefined | string;
    status: string;
    ownerId: number | undefined;
    freelancerId: number;
    jobId: number | undefined;
}

export interface MetaInterface {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface OfferResponseInterface {
    meta: MetaInterface;
    data: IMyOffer[];
}

export interface OfferOptionsInterface {
    page?: number;
    take?: number;
    freelancerId?: number;
}
