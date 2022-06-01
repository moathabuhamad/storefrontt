import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const base = `https://at-storefront-server.herokuapp.com/product`;

export const fetchProducts = () => async (dispatch) => {
  const response = await axios.get(base);
  console.log(response);
  dispatch(resetState())
  response.data.forEach((product) => {
    dispatch(create(product));
  });
};

export const adjustProduct = (item, method) => async (dispatch) => {
  const adder = method === 'add' ? 1 : -1;
  const updInventory = item.inventory + adder;
  if (updInventory < 0) {
    return;
  }
  const response = await axios.put(`${base}/${item._id}`, {
    inventory: updInventory,
  });
  dispatch(adjust(response.data));
};

const productSlice = createSlice({
  name: 'product',
  initialState:[],
  reducers: {
    create(state, action) {
      state.push(action.payload);
    },
    adjust(state, action) {
      let index = state.findIndex((item) => item.name === action.payload.name);
      state[index] = action.payload;
    },
    resetState: (state, action) => {
      Object.assign(state, action.payload)
    }
  },
});

export const { create, adjust, resetState } = productSlice.actions;

export default productSlice.reducer;
