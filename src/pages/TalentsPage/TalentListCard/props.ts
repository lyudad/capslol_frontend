import { IMyInvitation } from 'store/apis/invitations/invitations.types';
import { MetaInterface } from 'store/apis/jobs/jobs.types';
import { Category, Skills } from 'store/apis/publicProfile/publicProfile.types';
import { UserType } from 'store/slices/auth/auth.type';

export interface talentProfile {
    id: number | undefined;
    userId?: number | undefined;
    profileImage?: string | undefined;
    categories?: Category | undefined;
    skills?: Skills[] | undefined;
    other?: string | undefined;
    user?: UserType | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}

export interface Italents {
    meta: MetaInterface;
    data: talentProfile[];
    invatation: IMyInvitation[];
}

export interface IProps {
    jobObj: talentProfile;
    freelancerIdInInvitations: Array<number>;
}

export interface CustomizedState {
    id: number;
    isActive: boolean;
    userOnClickId: number;
    tabs?: number;
}

export interface IQueryFilters {
    category: number | undefined;
    filteredSkills: number[] | undefined;
    searchValue: string | undefined;
}
