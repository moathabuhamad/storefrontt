const initialState = { contents: [] };

export default function reducer(state = initialState, action) {
  let itemIndex, currItem;
  let updItem;

  switch (action.type) {
    case 'product/added':
      currItem = action.payload.updItem;
      itemIndex = state.contents.findIndex(
        (item) => item.name === currItem.name,
      );
      if (itemIndex > -1) {
        updItem = state.contents[itemIndex];
        updItem.numInCart = updItem.numInCart + 1;
        let contents = [
          ...state.contents.slice(0, itemIndex),
          updItem,
          ...state.contents.slice(itemIndex + 1),
        ];
        return { contents };
      } else {
        currItem.numInCart = 1;
        return { contents: [...state.contents, currItem] };
      }

    case 'ADD_ITEM':
      currItem = action.payload;
      itemIndex = state.contents.findIndex(
        (item) => item.name === currItem.name,
      );
      if (itemIndex > -1) {
        updItem = state.contents[itemIndex];
        updItem.numInCart++;
        return {
          contents: [
            ...state.contents.slice(0, itemIndex),
            updItem,
            ...state.contents.slice(itemIndex + 1),
          ],
        };
      } else {
        currItem.numInCart = 1;
        return { contents: [...state.contents, currItem] };
      }

    case 'product/deleted':
      currItem = action.payload.updItem;
      itemIndex = state.contents.findIndex(
        (item) => item.name === currItem.name,
      );
      return {
        contents: [
          ...state.contents.slice(0, itemIndex),
          ...state.contents.slice(itemIndex + 1),
        ],
      };

    case 'product/subtracted':
      currItem = action.payload.updItem;
      itemIndex = state.contents.findIndex(
        (item) => item.name === currItem.name,
      );
      updItem = state.contents[itemIndex];
      updItem.numInCart = updItem.numInCart - 1;
      return {
        contents: [
          ...state.contents.slice(0, itemIndex),
          updItem,
          ...state.contents.slice(itemIndex + 1),
        ],
      };

    case 'CLEAR':
      return initialState;

    default:
      return state;
  }
}

export const decrementItem = (item) => {
  return {
    type: 'DECREMENT_ITEM',
    payload: item,
  };
};

export const addItems = (item) => {
  return {
    type: 'product/added',
    payload: { updItem: item },
  };
};

export const removeItem = (item) => {
  return {
    type: 'REMOVE_ITEM',
    payload: item,
  };
};
