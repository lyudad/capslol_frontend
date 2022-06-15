import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { talentProfile } from 'pages/TalentsPage/TalentListCard/props';

interface TalentsState {
    talents: Array<talentProfile>;
}

const initialState: TalentsState = {
    talents: [],
};

const talentsSlice = createSlice({
    name: 'talents',
    initialState,
    reducers: {
        setTalents: (
            state: TalentsState,
            { payload }: PayloadAction<talentProfile[]>
        ) => {
            state.talents = payload;
        },
    },
});

export const { setTalents } = talentsSlice.actions;

export default talentsSlice.reducer;
