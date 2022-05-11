import { configureStore, combineReducers } from "@reduxjs/toolkit";
<<<<<<< HEAD
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/auth/auth.slice";
// import userReducer from "./authApiSlice";
=======
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./apis";
import authReducer from "./slices/auth/auth.slice";
>>>>>>> develop
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user", "isLoggedIn"],
};

const rootReducer = combineReducers({
  authReducer,
<<<<<<< HEAD
  // userReducer,
  // [baseApi.reducerPath]: baseApi.reducer,
=======
  [baseApi.reducerPath]: baseApi.reducer,
>>>>>>> develop
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
<<<<<<< HEAD
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
=======
    getDefaultMiddleware().concat(baseApi.middleware),
>>>>>>> develop
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
