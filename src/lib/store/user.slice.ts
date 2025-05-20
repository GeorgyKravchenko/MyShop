import IUser from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateDataById } from '../firebase/db/updateData';

const initialState: IUser = {
  id: '',
  name: '',
  email: '',
  phone: '',
  description: '',
  updatedAt: '',
  createdAt: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      return action.payload;
    },
    updateParams: (
      state,
      { payload }: PayloadAction<{ data: string; key: keyof Omit<IUser, 'id'> }>,
    ) => {
      state[payload.key] = payload.data;
      const data = {
        name: state.name,
        email: state.email,
        phone: state.phone,
        description: state.description,
      };
      updateDataById(data, 'users', state.id);
      return state;
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      console.log(state.id);
      updateDataById(action.payload, 'users', state.id);
      return action.payload;
    },
  },
});
export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
