import {  combineReducers, configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/product.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { CartReducer } from "./cart.slice";
import { useDispatch, useSelector, useStore } from "react-redux";
import { orderReducer } from "./order.slice";
import { userReducer } from "./user.slice";
// import { useDispatch, useSelector, useStore } from "react-redux";

const reducer = combineReducers({[productApi.reducerPath]: productApi.reducer,
    cart:CartReducer,
    order:orderReducer,
    user:userReducer
  })

export const makeStore = () => {
    const store = configureStore({
      reducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
    });
  
    setupListeners(store.dispatch);
    return store;
  };


export type AppStore = ReturnType<typeof makeStore>;
export type TypedRootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<TypedRootState>()
export const useAppStore = useStore.withTypes<AppStore>()