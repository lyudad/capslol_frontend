import { IJob, IOwner } from '../jobs/jobs.types';

export interface IChatMember {
    id: number;
    isActive: boolean;
    proposalId: IProposal;
}

export interface IProposal {
    id: number;
    coverLetter: string;
    createdAt: string;
    hourRate: number;
    freelancerId: IOwner;
    jobId: IJob;
}
