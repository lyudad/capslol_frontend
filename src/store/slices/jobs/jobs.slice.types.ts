import { IJob } from 'store/apis/jobs/jobs.types';

export interface IJobsState {
    jobId: number | null;
    jobs: Array<IJob>;
}
