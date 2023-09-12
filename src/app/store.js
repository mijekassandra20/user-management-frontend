import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userApi } from "../apiSlice";
import { isAdminReducer, tokenReducer } from "../stateSlice";

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        tokenSlice: tokenReducer,
        isAdminSlice: isAdminReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);
