import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";
import rootReducer from "./root-reducer";
import { composeWithDevTools } from "redux-devtools-extension";

// we store middlewares in an array
const middlewares = [thunk];

//store
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
); //spreading middleware so all in array are sent

// for persistance
export const persistor = persistStore(store);

const exp = { store, persistor };
export default exp;
