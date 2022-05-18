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

export interface Profile {
    id: number;
    profileImage: string;
    hourRate: number;
    availableHours: number;
    position: string;
    experiense: Experiences;
    educations: Educations;
    categories: Category;
    skills: Skills;
    english: string;
    other: string;
    createdAt: Date;
    updatedAt: Date;
}
