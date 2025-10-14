import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    endpoints: (builder) => ({
        createNewOrder: builder.mutation({
            query(body) {
                return {
                    url: `/orders/new`,
                    method: 'POST',
                    body,
                }
            },
            
        }),
        myOrders: builder.query({
            query: (id) => `/me/orders`,
            
        }),
    }),

});

export const { useCreateNewOrderMutation, useMyOrderQuery } = orderApi;
    