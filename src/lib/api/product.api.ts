'use client'
import { IProduct } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "api/products",
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
    endpoints: build =>({
        getProducts: build.query<IProduct[],number>({query:(limit=5)=>`products?limit=${limit}`}),
        getSearchProducts: build.query<IProduct[],string>({query:(searchTerm)=>`products?q=${searchTerm}`}),
        getProductsFromCategory: build.query<IProduct[],string>({query:(category)=>`products/category/${category}`})
    })
})

export const {useGetProductsQuery,useGetProductsFromCategoryQuery,useGetSearchProductsQuery}=productApi
