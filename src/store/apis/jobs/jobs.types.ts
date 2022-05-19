export interface ISkill {
    id: number;
    name: string;
}

export interface ICategory {
    id: number;
    categoryName: string;
}

export interface IJob {
    id: number;
    title: string;
    description: string;
    price: number;
    timeAvailable: number;
    createdAt: string;
    categories: ICategory[];
    skills: ISkill[];
    languageLevel: number;
}
