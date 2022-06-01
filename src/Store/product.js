import axios from 'axios';

const base = `https://at-storefront-server.herokuapp.com/product`;
const initialState = [];

// Reducer Function
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // omit other reducer cases
    case 'products/productsLoaded': {
      return action.payload;
    }
    case 'product/added': {
      let updItem = action.payload.updItem;
      let itemIndex = state.findIndex((item) => item.name === updItem.name);
      return [
        ...state.slice(0, itemIndex),
        updItem,
        ...state.slice(itemIndex + 1),
      ];
    }
    default:
      return state;
  }
}

export async function fetchProducts(dispatch, getState) {
  const response = await axios.get(base);
  console.log(response)
  dispatch({ type: `products/productsLoaded`, payload: response.data });
}

export function updateProduct(item, action) {
  // create async thunk inside to handle the action
  return async function reduceQuantity(dispatch, getState) {
    const itemId = item._id;
    if (action === 'add') {
      const updInventory = item.inventory - 1;
      if (updInventory < 0) {
        return;
      }
      const response = await axios.put(`${base}/${itemId}`, {
        inventory: updInventory,
      });
      dispatch({
        type: 'product/added',
        payload: { updItem: response.data, method: action },
      });
    } else {
      const updInventory = item.inventory + 1;
      const response = await axios.put(`${base}/${itemId}`, {
        inventory: updInventory,
      });
      if (action === 'subtract') {
        dispatch({
          type: 'product/subtracted',
          payload: { updItem: response.data, method: action },
        });
      } else {
        dispatch({
          type: 'product/deleted',
          payload: { updItem: response.data, method: action },
        });
      }
    }
  };
}

// Action Creator: A function that returns an action object
export const initializeProduct = () => {
  return {
    type: 'UPDATE_QUANTITY',
    payload: 1,
  };
};

export const updateProductCount = (product, count) => {
  return {
    type: 'UPDATE_QUANTITY',
    payload: { product, count },
  };
};
