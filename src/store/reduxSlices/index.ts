import {combineReducers} from '@reduxjs/toolkit';
import product from './product';
import user from './user';

const reducer = combineReducers({
  product: product.reducer,
  user: user.reducer,
});

export default reducer;
