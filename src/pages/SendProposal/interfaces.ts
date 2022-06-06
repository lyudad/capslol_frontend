import { IMyProposal } from 'store/apis/proposals/proposal.types';

export interface IProps {
    fs: string;
    color: string;
    mb?: string;
}

export interface IFormValue {
    coverLetter: string;
    freelancerValue: number;
}

export interface IJobId {
    id: number;
}

export type TFilterArg = IMyProposal[] | undefined;

export type TFilterReturn = number | undefined;
