import { UserType } from 'store/slices/auth/auth.type';

export interface Experiences {
    id?: number | undefined;
    companyName?: string;
    position?: string;
    startAt: string;
    endAt: string;
}
export interface Educations {
    id?: number | undefined;
    name?: string;
    specialization?: string;
    startAt: string;
    endAt: string;
}
export interface Category {
    id: number;
    categoryName: string;
}

export interface Skills {
    id: number;
    name: string;
}

export interface newProfile {
    id: number | undefined;
    userId: number | undefined;
    profileImage?: string;
    hourRate: number;
    availableHours: number;
    position?: string;
    experiense?: Experiences | number[];
    educations?: Educations | number[];
    categories: Category | number | undefined;
    skills: number[] | undefined;
    english: string;
    other?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Profile {
    id: number;
    profileImage: string;
    hourRate: number;
    availableHours: number;
    position: string;
    experiense: Experiences[];
    educations: Educations[];
    categories: Category;
    skills: Skills[];
    english: string;
    other: string;
    user: UserType | undefined;
    createdAt: Date;
    updatedAt: Date;
}
