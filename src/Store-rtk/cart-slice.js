import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    adjust(state, action) {
      let adder = action.payload.method === 'add' ? 1 : -1;
      let currItem = action.payload.item;
      let index = state.findIndex((item) => item.name === currItem.name);
      let remove = false;
      let flag = false;
      if (index > -1) {
        state.forEach((item) => {
          if (item.name === currItem.name) {
            let temp = item.numInCart;
            if (temp + adder > 0) {
              item.numInCart += adder;
              flag = true;
            } else {
              remove = true;
            }
          }
        });
      }
      if (remove) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      } else if (flag) {
        return state;
      } else {
        let newItem = { ...currItem };
        newItem['numInCart'] = 1;
        state.push(newItem);
      }
    },
    remove(state, action) {
      let updItem = action.payload.item;
      let itemIndex = state.findIndex((item) => item.name === updItem.name);
      return [...state.slice(0, itemIndex), ...state.slice(itemIndex + 1)];
    },
  },
});

export const { adjust, remove } = cartSlice.actions;

export default cartSlice.reducer;
