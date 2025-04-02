'use client'
import { useGetProductsQuery } from '@/lib/api/product.api';
import { useSearchParams } from 'next/navigation';
import React, { memo, useMemo } from 'react'
import  CatalogView  from './CatalogView';
import { withAuth } from '@/lib/firebase/withAuth';


const CatalogPage = () => {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('categories') || '';

  const { data: products, isLoading } = useGetProductsQuery(100);
  const filteredProducts = useMemo(()=>categoryFilter 
    ? products?.filter(product => product.category === categoryFilter) 
    : products,
    [products,categoryFilter])

  return (
    <CatalogView isLoading={isLoading} filteredProducts={filteredProducts}/>
  );
};

export default withAuth(memo(CatalogPage))