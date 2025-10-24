import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    tagTypes: ['Order', 'AdminOrders'],
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
            providesTags: ['Order'],

        }),

        getSalesData: builder.query({
            query: ({ startDate, endDate }) =>
                `/admin/get_sales?startDate=${startDate}&endDate=${endDate}`,
            refetchOnMountOrArgChange: true,
            keepUnusedDataFor: 0,
        }),

        getAdminOrders: builder.query({
            query: (id) => `/admin/orders`,
            providesTags: ['AdminOrders'],


        }),

        updateOrder: builder.mutation({
            query({ id, body }) {
                return {
                    url: `/admin/orders/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: ['Order'],

        }),
        deleteOrder: builder.mutation({
            query({ id }) {
                return {
                    url: `/admin/orders/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['AdminOrders'],

        }),
    }),

});

export const { useCreateNewOrderMutation, useMyOrdersQuery, useOrderDetailsQuery, useLazyGetSalesDataQuery, useGetAdminOrdersQuery, useUpdateOrderMutation, useDeleteOrderMutation } = orderApi;
