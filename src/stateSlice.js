import { createSlice } from "@reduxjs/toolkit";

const token = createSlice({
    name: "token",
    initialState: {
        token: null,
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        clearToken(state) {
            state.token = null;
        },
    },
});

const isAdmin = createSlice({
    name: "isAdmin",
    initialState: {
        isAdmin: false,
    },
    reducers: {
        setIsAdmin(state, action) {
            state.isAdmin = action.payload;
        },
    },
});

export const { setToken, clearToken } = token.actions;
export const { setIsAdmin } = isAdmin.actions;
export const tokenReducer = token.reducer;
export const isAdminReducer = isAdmin.reducer;
