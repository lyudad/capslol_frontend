import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IJob } from 'store/apis/jobs/jobs.types';

interface IJobsState {
    jobId: number | undefined;
    jobs: Array<IJob>;
}
const initialState: IJobsState = {
    jobId: undefined,
    jobs: [],
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setJobs: (state: IJobsState, { payload }: PayloadAction<IJob[]>) => {
            state.jobs = payload;
        },

        setJobId: (
            state: IJobsState,
            { payload }: PayloadAction<number | undefined>
        ) => {
            state.jobId = payload;
        },
    },
});

export const { setJobs, setJobId } = jobsSlice.actions;

export default jobsSlice.reducer;
