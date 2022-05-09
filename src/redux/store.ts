import { Token } from "./reducers/types";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
import { userReducer } from "./reducers/userSlice";
import { authApi } from "./authApiSlice";
import { passwordApi } from "./services/passwordApi/passwordApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user", "isLoggedIn"],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const reducers = combineReducers({
  userReducer: persistedReducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(authApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
