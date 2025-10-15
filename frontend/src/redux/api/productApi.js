import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: `/products`,
                params: {
                    page: params?.page,
                    keyword: params?.keyword,
                    category: params?.category,
                    "price[gte]": params?.min,
                    "price[lte]": params?.max,
                    "ratings[gte]": params?.ratings,
                }
                    
            }),
        }),
        getProductDetails: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: ['Products'],
        }),
        newReview: builder.mutation({
            query(body) {
                return {
                    url: `/reviews`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: ['Products'],
            
        }),
    }),

});

export const { useGetProductsQuery, useGetProductDetailsQuery, useNewReviewMutation } = productApi;
    