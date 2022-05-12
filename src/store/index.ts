import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./apis";
import authReducer from "./slices/auth/auth.slice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { publicProfileApi } from "./apis/publicProfile";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user", "isLoggedIn"],
};

const rootReducer = combineReducers({
  authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [publicProfileApi.reducerPath]: publicProfileApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(baseApi.middleware, publicProfileApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
