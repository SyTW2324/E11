import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";
import { RootState } from "../../reducers";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const { token } = (getState() as { auth: { token: string } }).auth;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
})

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        console.log("sending refresh token");
        const refreshResult = await baseQuery("/refresh", api, extraOptions);
        console.log(refreshResult);
        if (refreshResult?.data) {
            const user = (api.getState() as RootState).auth.user;
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut({})); // Pass an empty object as an argument
        }
    }


    return result;
};

export const apiSlice = createApi ({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
})