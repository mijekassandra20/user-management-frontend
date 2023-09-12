import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        // prepareHeaders: (headers, { getState }) => {
        //     const token = getState().auth.token;

        //     // If we have a token set in state, let's assume that we should be passing it.
        //     if (token) {
        //         headers.set("Authorization", `Bearer ${token}`);
        //     }

        //     return headers;
        // },
        // transformResponse: (response) => {
        //     const tokenFromHeader = response.headers.get("Authorization").split(" ")[1];

        //     return {
        //         data: response.data,
        //         token: tokenFromHeader,
        //     };
        // },
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "user/",
            providesTags: (result, error, arg) =>
                result ? [...result.map(({ id }) => ({ type: "User", id })), "User"] : ["User"],
        }),
        getUserInfo: builder.query({
            query: (userId) => `user/${userId}`,
        }),
        addUser: builder.mutation({
            query: (user) => ({
                url: "/user",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `user/${user._id}`,
                method: "PATCH",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "user/login",
                method: "POST",
                body: credentials,
                credentials: "include",
            }),
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `user/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserInfoQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useLoginUserMutation,
    useDeleteUserMutation,
    useLogoutUserQuery,
} = userApi;
