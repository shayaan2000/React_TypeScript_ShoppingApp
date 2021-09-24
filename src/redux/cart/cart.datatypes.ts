import { IShopItem } from "../shop/shop.datatypes";

export interface ICartItem extends IShopItem {
  quantity: number;
}

export interface ICartState {
  hidden: boolean;
  cartItems: ICartItem[];
}

export interface ICartAction {
  type: string;
  payload: ICartItem;
}
