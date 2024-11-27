import {combineReducers} from '@reduxjs/toolkit';
import product from './product';

const reducer = combineReducers({
  product: product.reducer,
});

export default reducer;
