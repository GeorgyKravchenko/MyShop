'use client'
import { IProduct } from "@/types/product";
import { updateData } from "@/lib/firebase/updateData";
// import {getDataById } from "@/utils/getData";
import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { auth } from "./firebase/firebase.config";
// import { getDataById } from "@/utils/getData";
// import { auth } from "./config/firebase.config";

const initialState: IProduct[] = [];

export const loadCart = createAsyncThunk(
    'cart/loadCart',
    async() => {
        const userId = auth.currentUser?.uid
        if (userId) {
            // const data = await getDataById(userId,'carts')
            // console.log(data?.items||[])
            // // return data
            // return []
        }
        return []
    },
    
)

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setProducts: (state,action:PayloadAction<IProduct[]>) => {
            return action.payload
        },
        clearProducts: () => {
            console.log('dasdsa')
            const userId = auth.currentUser?.uid
            if (userId) {
                updateData({ ...[] }, 'carts', userId)
                  .catch(error => console.error("Update failed:", error));
            }
            return []
        },
        addProduct:(state,action:PayloadAction<IProduct>) => {
            // console.log('addProduct '+userId)
            const userId = auth.currentUser?.uid
            // const newState = [...state,action.payload]
            state.push(action.payload)
            if (userId) {
                updateData({ ...current(state) }, 'carts', userId)
                  .catch(error => console.error("Update failed:", error));
            }
        },
        removeProduct:(state,action:PayloadAction<{id:number}>) => {
            const userId = auth.currentUser?.uid
            const newState = state.filter(p => p.id !== action.payload.id)
            console.table(state)
            if (userId) {
                updateData({ ...current(state) }, 'carts', userId)
                  .catch(error => console.error("Update failed:", error));
            }
            
            return newState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCart.fulfilled, (state, action) => {
            return action.payload as IProduct[]
        }).addCase(loadCart.rejected, (state, action) => {
            console.log(action.error.message)
            return []
        })
    }
})

export const CartReducer = CartSlice.reducer
export const CartAction = {...CartSlice.actions,loadCart}