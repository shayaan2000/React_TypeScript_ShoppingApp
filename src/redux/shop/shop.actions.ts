import ShopActionTypes from "./shop.types";
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.util";
import { collection } from "@firebase/firestore";
import { getDocs } from "@firebase/firestore";
import { IShopAction, ShopCollectionsType } from "./shop.datatypes";
import { ThunkDispatch } from "redux-thunk";
import { IRootState } from "../root-reducer";

export const fetchCollectionsStart = () => {
  return {
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
    payload: "",
  };
};

export const fetchCollectionsSuccess = (
  collectionsMap: ShopCollectionsType
) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage: string) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

type MyThunkDispatch = ThunkDispatch<IRootState, void, IShopAction>;
export const fetchCollectionsStartAsync = () => (dispatch: MyThunkDispatch) => {
  const collectionRef = collection(firestore, "collection");
  dispatch(fetchCollectionsStart());

  getDocs(collectionRef)
    .then((snapshot) => {
      console.log("SNAPSHOT IS HERE: ", snapshot);
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    })
    .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
};
