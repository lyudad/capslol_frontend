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
