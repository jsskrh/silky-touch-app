import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingAddress: {} },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      {
        const newItem = action.payload;
        const exists = state.cart.cartItems.find(
          (item) => item.slug === newItem.slug
        );
        const cartItems = exists
          ? state.cart.cartItems.map((item) =>
              item.name === exists.name ? newItem : item
            )
          : [...state.cart.cartItems, newItem];
        Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
        return { ...state, cart: { ...state.cart, cartItems } };
      }
      break;

    case "CART_REMOVE_ITEM":
      {
        const cartItems = state.cart.cartItems.filter(
          (item) => item.slug !== action.payload.slug
        );
        Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
        return { ...state, cart: { ...state.cart, cartItems } };
      }
      break;

    case "CART_RESET":
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
        },
      };
      break;

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: { ...state.cart.shippingAddress, ...action.payload },
        },
      };
      break;

    default:
      return state;
      break;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
