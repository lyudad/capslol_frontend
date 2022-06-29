export interface ISkill {
    id: number;
    name: string;
}

export interface ICategory {
    id: number;
    categoryName: string;
}

export interface IOwner {
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
    id: number;
    title: string;
    description: string;
    price: number;
    timeAvailable: number;
    createdAt: string;
    categoryId: ICategory;
    skills: ISkill[];
    languageLevel: string;
    ownerId: IOwner;
    projectDuration: string;
    isArchived: boolean;
}

export interface IUserProfile {
    id: number;
    profileImage: string | undefined;
    availableHours: number | undefined;
    position: string | undefined;
    english: string | undefined;
    other: string | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;
    hourRate: number | undefined;
    categories: ICategory;
    skills: ISkill[];
}

export type JobFormType = Omit<IJob, 'id' | 'createdAt' | 'ownerId'> & {
    ownerId: number;
};

export interface JobResponseInterface {
    meta: MetaInterface;
    data: JobInterface[];
}

export interface JobInterface {
    id: number;
    title: string;
    description: string;
    price: number;
    timeAvailable: number;
    createdAt: string;
    languageLevel: string;
    projectDuration: ProjectDuration;
    isArchived: boolean;
    ownerId: OwnerID;
    categoryId: CategoryID;
    skills: Skill[];
}

export type transformResponseToList = {
    id: number;
    name: string;
};

export interface CategoryID {
    id: number;
    categoryName: string;
}

export interface OwnerID {
    id: number;
    firstName: string;
    lastName: string;
    role: Role;
    email: string;
    phoneNumber: string;
    createdAt: string;
    isGoogle: boolean;
}

export enum Role {
    Freelancer = 'Freelancer',
    JobOwner = 'Job Owner',
}

export enum ProjectDuration {
    From6MonthsTo1Year = 'from 6 months to 1 year',
    LessThen6Months = 'less then 6 months',
    Over1Year = 'over 1 year',
}

export interface Skill {
    id: number;
    name: string;
}

export interface MetaInterface {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface JobsOptionsInterface {
    q?: string | null;
    category?: number | null;
    timeAvailable?: number | null;
    skills?: number[] | null;
    languageLevel?: string | null;
    projectDuration?: string | null;
    page?: number;
    take?: number | null;
    price?: number | null;
    ownerId?: number | null;
    isArchived?: number | null;
}

export enum English {
    BEGINNER = 'Beginner',
    PREINTERMEDIATE = 'Pre-Intermediate',
    INTERMEDIATE = 'Intermediate',
    ADVANCED = 'Advanced',
}
