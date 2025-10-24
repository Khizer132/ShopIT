import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated, setLoading, setUser } from '../slice/userSlice';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    tagTypes: ["User", "AdminUsers"],
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => `/me`,
            transformResponse: (response) => response.user,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                    dispatch(setIsAuthenticated(true));
                    dispatch(setLoading(false));
                }
                catch (error) {
                    dispatch(setLoading(false));
                    console.log(error);
                }
            },
            providesTags: ["User"],
            }),
        

        updateProfile: builder.mutation({
            query(body) {
                return{
                    url: "/me/update",
                    method: "PUT",
                    body
                }
            
            },
            invalidatesTags: ["User"],
        }),

        updatePassword: builder.mutation({
            query(body) {
                return{
                    url: "/password/update",
                    method: "PUT",
                    body
                }
            
            },
        }),

        /*forgotPassword: builder.mutation({
            query(body) {
                return{
                    url: "/password/forgot",
                    method: "POST",
                    body
                }
            
            },
        })

        resetPassword: builder.mutation({
            query({token, body}) {
                return{
                    url: `/password/reset/${token}`,
                    method: "PUT",
                    body
                }
            
            },
        })*/
        getAdminUsers: builder.query({
            query: (id) => `/admin/users`,
            providesTags: ['AdminUsers'],


        }),
        
        }),

});

export const { useGetMeQuery, useUpdateProfileMutation, useUpdatePasswordMutation, /*useForgotPasswordMutation, */ useResetPasswordMutation, useGetAdminUsersQuery } = userApi;
    