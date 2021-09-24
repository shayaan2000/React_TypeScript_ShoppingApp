import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { IUserState } from "./user/user.datatypes";
import { IDirectoryState } from "./directory/directory.datatypes";
import { ICartState } from "./cart/cart.datatypes";
import { IShopState } from "./shop/shop.datatypes";
import userReducer from "./user/user.reducer";
import directoryReducer from "./directory/directory.reducer";
import cartReducer from "./cart/cart.reducer";
import shopReducer from "./shop/shop.reducer";

// configs for persist
const persistConfig = {
  key: "root", //where we want to start in reducer
  storage,
  //list of reducers we want to store
  whitelist: ["cart"],
};

// state type for root reducer combines state types of all
export interface IRootState {
  user: IUserState;
  directory: IDirectoryState;
  cart: ICartState;
  shop: IShopState;
}

const rootReducer = combineReducers<IRootState>({
  user: userReducer,
  directory: directoryReducer,
  cart: cartReducer,
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);
