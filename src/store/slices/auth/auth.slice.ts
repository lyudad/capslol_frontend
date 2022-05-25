import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse, UserType } from './auth.type';

interface UsersState {
    user: UserType | null;
    accessToken: string | null | undefined;
    loading: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
    isLoggedIn: boolean;
}
const initialState: UsersState = {
    user: null,
    accessToken: '',
    loading: 'idle',
    error: '',
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state: UsersState,
            { payload: { data } }: PayloadAction<IResponse>
        ) => {
            state.user = data.user;
            state.accessToken = data.accessToken;
            state.isLoggedIn = true;
        },
    },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
