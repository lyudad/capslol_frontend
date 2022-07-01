import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse, UserType } from './auth.type';

interface UsersState {
    user: UserType | null;
    accessToken: string | null | undefined;
    loading: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
    isLoggedIn: boolean | undefined;
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
            state.isLoggedIn = data.isLoggedIn;
        },
        logOut: (state: UsersState) => {
            state.user = null;
            state.accessToken = '';
            state.isLoggedIn = false;
        },
        setUserRole: (
            state: UsersState,
            { payload: { data } }: PayloadAction<IResponse>
        ) => {
            state.user = data.user;
        },
    },
});

export const { setCredentials, logOut, setUserRole } = authSlice.actions;

export default authSlice.reducer;
