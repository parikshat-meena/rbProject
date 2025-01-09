import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {initialState} from '../reduxState/reduxState';

export const user = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    getUserData: (state, action: PayloadAction<any>) => {
      state.UserData = action.payload;
      return state;
    },
  },
});

export const {getUserData} = user.actions;

export default user;
