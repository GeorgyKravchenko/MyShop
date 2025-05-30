'use client';
import { AppStore, makeStore } from '@/lib/store/store';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
export default React.memo(StoreProvider);
