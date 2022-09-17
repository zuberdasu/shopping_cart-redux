import { initialState } from "./initialState";
import {
  SET_API_DATA,
  ON_SEARCH_INPUT,
  ON_BUY_NOW,
  ON_SCREEN_MODE,
  ON_DELETE_CART_ITEM,
} from "./types";

export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_API_DATA:
      return { ...state, apiData: action.payload };
    case ON_BUY_NOW:
      const shoppingCartItems = [...state.shoppingCartItems];
      //check is item already in cart
      const indexOfCartItem = shoppingCartItems.findIndex(
        (item) => item.id === action.payload
      );

      //if already in cart increase quantity, otherwise add new object to cart
      if (indexOfCartItem > -1) {
        shoppingCartItems[indexOfCartItem].quantity += 1;
      } else {
        shoppingCartItems.push({ quantity: 1, id: action.payload });
      }

      return { ...state, shoppingCartItems };

    case ON_DELETE_CART_ITEM: {
      const shoppingCartItems = [...state.shoppingCartItems];

      const indexOfCartItem = shoppingCartItems.findIndex(
        (item) => item.id === action.payload
      );

      shoppingCartItems.splice(indexOfCartItem, 1);

      return { ...state, shoppingCartItems };
    }

    case ON_SEARCH_INPUT:
      const filtered = [...state.apiData].filter((product) => {
        //work out if the product matches the search term
        if (
          product.title.toLowerCase().includes(action.payload.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });

      //if search term has produced no results filtered property in state will be empty and so Interface component will display all products
      return { ...state, searchInput: action.payload, filtered };

    case ON_SCREEN_MODE:
      return { ...state, screenMode: action.payload };
    default:
      return state;
  }
}
