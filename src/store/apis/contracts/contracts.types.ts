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
    jobId: IJob;
    ownerId: IUser;
    freelancerId: IUser;
}

export interface ICreateContract {
    id?: number;
    ownerId?: number;
    freelancerId?: number;
    jobId?: number;
    offerId?: number;
    closedAt?: string | null;
    status?: string;
}

export interface IContract {
    id: number;
    status: string;
    createdAt: string;
    closedAt: string | null;
    offerId: IOffer;
}

export interface MetaInterface {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface ContractResponseInterface {
    meta: MetaInterface;
    data: IContract[];
}

export interface ContractsOptionsInterface {
    page?: number;
    take?: number;
    freelancerId?: number;
    ownerId?: number;
}
