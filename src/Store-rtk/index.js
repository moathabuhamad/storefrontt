import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import productSlice from './product-slice.js';
import categorySlice from './category-slice.js';
import cartSlice from './cart-slice.js';

const reducers = combineReducers({
  product: productSlice,
  category: categorySlice,
  cart: cartSlice,
});

const store = configureStore({ reducer: reducers });

export default store;
