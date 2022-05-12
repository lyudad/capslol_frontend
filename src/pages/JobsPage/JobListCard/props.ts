// export interface IJob {
//   id?: number;
//   date?: string;
//   jobName?: string;
//   salary?: string;
//   description?: string;
//   jobOwner?: string;
//   skills?: [];
//   category?: string;
//   timeAvailable?: string;
//   englishLevel?: string;
// }

export interface IJobObj {
  id: number;
  date: string;
  jobName: string;
  salary: string;
  description: string;
  jobOwner: string;
  skills: string[];
  category: string;
  timeAvailable: string;
  englishLevel: string;
}
