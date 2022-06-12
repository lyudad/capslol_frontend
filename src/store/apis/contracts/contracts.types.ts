export interface IUser {
    createdAt: string;
    email: string;
    firstName: string;
    id: number;
    isGoogle: boolean;
    lastName: string;
    phoneNumber: string;
    role: string;
}

export interface IJob {
    id: number | undefined;
    title: string;
    description: string;
    price: number;
    timeAvailable: number;
    createdAt: string;
    languageLevel: string;
    projectDuration: string;
}

export interface IOffer {
    id: number;
    hourRate: number;
    status: string;
    createdAt: string;
}
export interface IContract {
    id: number;
    status: string;
    createdAt: string;
    closedAt: string | null;
    ownerId: IUser;
    freelancerId: IUser;
    jobId: IJob;
    offerId: IOffer;
}

export interface ICreateContract {
    ownerId?: number;
    freelancerId?: number;
    jobId?: number;
    offerId?: number;
}
