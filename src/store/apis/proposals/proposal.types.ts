export interface IProposal {
    jobId: number;
    freelancerId: number | undefined;
    coverLetter: string;
    hourRate: number | undefined;
}

export interface IJob {
    id: number;
    price?: number | undefined;
}

export interface IMyJob {
    id: number | undefined;
    title: string;
    description: string;
    price: number;
    timeAvailable: number;
    createdAt: string;
}

export interface IMyProposal {
    id: number;
    jobId: IMyJob;
    freelancerId: number | undefined;
    coverLetter: string;
    hourRate: number | undefined;
    createdAt: string;
}
