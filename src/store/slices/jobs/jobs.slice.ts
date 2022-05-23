import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IJob } from 'store/apis/jobs/jobs.types';

interface IJobsState {
    jobs: Array<IJob>;
}

const initialState: IJobsState = {
    jobs: [],
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setJobs: (state: IJobsState, { payload }: PayloadAction<IJob[]>) => {
            state.jobs = payload;
        },
    },
});

export const { setJobs } = jobsSlice.actions;

export default jobsSlice.reducer;
