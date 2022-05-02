import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
import { userReducer } from "./reducers/userSlice";
import { type } from "os";

// const persistConfig = {
//   key: "auth",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, userReducer);

const rootReducer = combineReducers({
  userReducer,
});

// export const store = configureStore({
//   reducer: persistedReducer,

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ["persist/PERSIST"],
//       },
//     }),
//   devTools: process.env.NODE_ENV !== "production",
// });

export const setupStore = () => {
  return configureStore({
    reducer: userReducer,
    // reducer: {
    //   userState: userReducer,
    // },
  });
};

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

//==========================================================================================
// import { configureStore } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { persistStore } from "redux-persist";
// import userReducer from "./reducers/userSlice";

// const persistConfig = {
//   key: "auth",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, userReducer);

// export const store = configureStore({
//   reducer: persistedReducer,

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ["persist/PERSIST"],
//       },
//     }),
//   devTools: process.env.NODE_ENV !== "production",
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
