export interface Experiences {
    id?: number | undefined;
    companyName?: string | undefined;
    position?: string | undefined;
    startAt: string | undefined;
    endAt: string | undefined;
}
export interface Educations {
    id: number | undefined;
    name: string | undefined;
    specialization: string | undefined;
    startAt: string | undefined;
    endAt: string | undefined;
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
    userId?: number | undefined;
    profileImage?: string | undefined;
    hourRate?: number | undefined;
    availableHours?: number | undefined;
    position?: string | undefined;
    experiense: Experiences | number[] | undefined;
    educations?: Educations | number | undefined;
    categories?: Category | number | undefined;
    skills?: number[] | undefined;
    english?: string | undefined;
    other?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}

export interface Profile {
    id: number;
    profileImage: string;
    hourRate: number;
    availableHours: number;
    position: string;
    experiense: Experiences[];
    educations: Educations;
    categories: Category;
    skills: Skills[];
    english: string;
    other: string;
    createdAt: Date;
    updatedAt: Date;
}
