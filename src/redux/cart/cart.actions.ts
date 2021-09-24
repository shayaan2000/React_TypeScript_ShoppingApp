import { ICartItem } from "./cart.datatypes";
import { IShopItem } from "../shop/shop.datatypes";
import { CartActionTypes } from "./cart.types";

// payload not needed here
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item: ICartItem | IShopItem) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});

export const clearItemFromCart = (item: ICartItem) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const removeItem = (item: ICartItem) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item,
});
