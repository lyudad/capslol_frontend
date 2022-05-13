export interface Profile {
  id: number;
  profileImage: string;
  hourRate: number;
  availableHours: number;
  position: string;
  english: string;
  other: string;
  createdAt: Date;
  updatedAt: Date;
}
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
export interface Skillls {
  id: number;
  name: string;
}
