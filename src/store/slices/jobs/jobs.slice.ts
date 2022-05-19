import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IJob } from 'store/apis/jobs/jobs.types';

interface IJobsState {
    jobId: number | null;
    jobs: Array<IJob>;
}
const initialState: IJobsState = {
    jobId: null,
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
            { payload }: PayloadAction<number | null>
        ) => {
            state.jobId = payload;
        },
    },
});

export const { setJobs, setJobId } = jobsSlice.actions;

export default jobsSlice.reducer;
