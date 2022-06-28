export interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    role?: string;
    email?: string;
    phoneNumber?: number;
    createdAt?: string;
    isGoogle: boolean;
}

export interface IJob {
    id?: number;
    title?: string;
    description?: string;
    price?: number;
    timeAvailable?: number;
    createdAt?: string;
    languageLevel?: string;
    projectDuration?: string;
}

export interface IMyInvitation {
    id?: number;
    createdAt: string;
    ownerId: IUser;
    freelancerId: IUser;
    jobId: IJob;
}

export interface newInvitation {
    ownerId: number | undefined;
    freelancerId: number | undefined;
    jobId: number | undefined;
}
