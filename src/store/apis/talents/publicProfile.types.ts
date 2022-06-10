export interface Experiences {
    id?: number | undefined;
    companyName?: string | undefined;
    position?: string | undefined;
    startAt: string | undefined;
    endAt: string | undefined;
}
export interface Educations {
    id?: number | undefined;
    name?: string | undefined;
    specialization?: string | undefined;
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
    createdAt: Date;
    updatedAt: Date;
}
