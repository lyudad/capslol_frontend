/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProposalsState {
    proposals: any;
}

const initialState: IProposalsState = {
    proposals: [],
};

const proposalsSlice = createSlice({
    name: 'proposals',
    initialState,
    reducers: {
        setIsSent: (
            state: IProposalsState,
            { payload }: PayloadAction<any>
        ) => {
            state.proposals.push(payload);
        },
    },
});

export const { setIsSent } = proposalsSlice.actions;

export default proposalsSlice.reducer;
