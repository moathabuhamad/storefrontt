import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import category from './category.js';
import product from './product.js';
import cart from './cart.js';

const reducers = combineReducers({ category, product, cart });
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

// store is set up to accept thunk function in `dispatch`
const store = () => {
  return createStore(reducers, composedEnhancer);
};

export default store();
