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
        orderDetails: builder.query({
            query: (id) => `/orders/${id}`,

        }),

        getSalesData: builder.query({
            query: (startDate, endDate) => `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,

        }),
    }),

});

export const { useCreateNewOrderMutation, useMyOrdersQuery, useOrderDetailsQuery, useLazyGetSalesDataQuery } = orderApi;
