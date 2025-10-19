import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    tagTypes: ['Products', 'AdminProducts'],
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

        getAdminProducts: builder.query({
            query: () => `/admin/products`,
            providesTags: ['AdminProducts'],
        }),
         createProduct: builder.mutation({
            query(body) {
                return {
                    url: `/admin/products`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['AdminProducts'],
            
        }),
        updateProduct: builder.mutation({
            query({id, body}) {
                return {
                    url: `/admin/products/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: ['Products', 'AdminProducts'],
            
        }),
    }),

});

export const { useGetProductsQuery, useGetProductDetailsQuery, useNewReviewMutation, useGetAdminProductsQuery, useCreateProductMutation, useUpdateProductMutation } = productApi;
    