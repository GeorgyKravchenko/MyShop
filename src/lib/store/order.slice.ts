import { IOrder } from '@/types/order';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../firebase/firebase.config';
import { updateData } from '../firebase/db/updateData';

// const orders = localStorage.getItem('orders')

const initialState: IOrder[] = [];
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<IOrder>) => {
      const userId = auth.currentUser?.uid;
      state.push(action.payload);
      if (userId) {
        updateData({ ...current(state) }, 'orders', userId);
      }
    },
    setOrders: (state, payload: PayloadAction<IOrder[]>) => {
      return payload.payload;
    },
  },
});
export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
