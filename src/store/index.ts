import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { baseApi } from './apis';
import authReducer from './slices/auth/auth.slice';
import jobsReducer from './slices/jobs/jobs.slice';
import talentsReducer from './slices/talents/talents.slice';
import { cloudinaryApi } from './apis/publicProfile';

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['accessToken', 'user', 'isLoggedIn', 'proposals'],
};
const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        jobsReducer,
        talentsReducer,
        [baseApi.reducerPath]: baseApi.reducer,
        [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat([baseApi.middleware, cloudinaryApi.middleware]),

    devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
