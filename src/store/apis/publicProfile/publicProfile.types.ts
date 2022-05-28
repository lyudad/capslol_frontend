export interface Experiences {
    id: number;
    companyName: string;
    position: string;
    startAt: string;
    endAt: string;
}
export interface Educations {
    id: number;
    name: string;
    specialization: string;
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
    profileImage?: string | undefined;
    hourRate?: number | undefined;
    availableHours?: number | undefined;
    position?: string | undefined;
    experiense?: Experiences | undefined;
    educations?: Educations | undefined;
    categories?: Category | undefined;
    skills?: number[] | undefined;
    english: string | undefined;
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
    experiense: Experiences;
    educations: Educations;
    categories: Category;
    skills: Skills[];
    english: string;
    other: string;
    createdAt: Date;
    updatedAt: Date;
}
