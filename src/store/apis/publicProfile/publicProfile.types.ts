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
