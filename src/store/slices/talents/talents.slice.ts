import { createSlice } from '@reduxjs/toolkit';

interface TalentsState {
    talents: number;
}

const initialState: TalentsState = {
    talents: 0,
};

const talentsSlice = createSlice({
    name: 'talents',
    initialState,
    reducers: {
        setTalents: (state: TalentsState, { payload }) => {
            state.talents += payload;
        },
    },
});

export const { setTalents } = talentsSlice.actions;

export default talentsSlice.reducer;
