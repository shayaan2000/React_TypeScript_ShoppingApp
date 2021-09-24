import ShopActionTypes from "./shop.types";
import { IShopState, IShopAction } from "./shop.datatypes";
// import SHOP_DATA from "./shop.data";

const INITIAL_STATE: IShopState = {
  collections: null,
  isFetching: false,
  errorMessage: undefined,
};

const shopReducer = (
  state = INITIAL_STATE,
  action: IShopAction
): IShopState => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      //narrowing for different types of payload
      if (typeof action.payload !== "string")
        return {
          ...state,
          isFetching: false,
          collections: action.payload,
        };
      return state;
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      //narrowing for different types of payload
      if (typeof action.payload === "string")
        return {
          ...state,
          isFetching: false,
          errorMessage: action.payload,
        };
      return state;

    default:
      return state;
  }
};

export default shopReducer;
