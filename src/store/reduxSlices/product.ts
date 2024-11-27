import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {initialState} from '../reduxState/reduxState';

export const product = createSlice({
  name: 'productData',
  initialState,
  reducers: {
    getProductData: (state, action: PayloadAction<any>) => {
      state.ProductData = action.payload;
      return state;
    },
  },
});

export const {getProductData} = product.actions;

export default product;
