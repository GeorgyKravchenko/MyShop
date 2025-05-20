'use client';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import OrderPageView from './OrderPageView';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useSetData } from '@/hooks/store/useSetData';
import { useActions } from '@/hooks/store/useAction';

export default function OrderPage() {
  const { id } = useParams();
  const orders = useTypedSelector((state) => state.order);

  const { setOrders } = useActions();
  const setDataFetchStatus = useSetData(setOrders, 'orders');
  const filterdOrder = useMemo(() => orders.filter((order) => order.id === id), [orders, id]);
  if (setDataFetchStatus === 'pending')
    <p className="text-center py-12 text-9xl w-full">Loading...</p>;

  return <OrderPageView data={filterdOrder[0]} />;
}
