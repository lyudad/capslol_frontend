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

export interface IProps {
    jobObj: talentProfile;
    idArray: Array<number>;
}
