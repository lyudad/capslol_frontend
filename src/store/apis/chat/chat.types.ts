import { IJob, IOwner } from '../jobs/jobs.types';

export interface IChatMember {
    id: number;
    isActive: boolean;
    proposalId: IProposal;
}

export interface IChatContact {
    isActive: boolean;
    proposalId: number | undefined;
}
export interface IProposal {
    id: number;
    coverLetter: string;
    createdAt: string;
    hourRate: number;
    freelancerId: IOwner;
    jobId: IJob;
}

export interface ISearch {
    jobId: number | undefined;
    freelancerId: number | undefined;
}
