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
