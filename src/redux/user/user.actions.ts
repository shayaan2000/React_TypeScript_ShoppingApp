import { UserActionTypes } from "./user.types";
import { UserType, IUserAction } from "./user.datatypes";
import { ThunkDispatch } from "redux-thunk";
import { IRootState } from "../root-reducer";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  signInWithGoogle,
  auth,
  createUserProfileDocument,
} from "../../firebase/firebase.util";
import { createUserWithEmailAndPassword } from "@firebase/auth";

export const setCurrentUser = (user: UserType): IUserAction => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInStart = () => ({
  type: UserActionTypes.SIGN_IN_START,
});

export const signInSuccess = () => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
});

export const signInFailure = () => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: null,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
  payload: null,
});

export const signOutFailure = () => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
});

export const signUpStart = () => ({
  type: UserActionTypes.SIGN_UP_START,
});

export const signUpSuccess = () => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: null,
});

export const signUpFailure = () => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
});

// Thunk
type UserThunkDispatch = ThunkDispatch<IRootState, void, IUserAction>;
export const signInStartAsync =
  (email: string, password: string) => async (dispatch: UserThunkDispatch) => {
    dispatch(signInStart());
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(signInSuccess());
    } catch (err: unknown) {
      dispatch(signInFailure());
    }
  };

export const signInGoogleStartAsync =
  () => async (dispatch: UserThunkDispatch) => {
    dispatch(signInStart());

    try {
      await signInWithGoogle();
      dispatch(signInSuccess());
    } catch (err: unknown) {
      console.log("Error signing in with google", err);
      dispatch(signInFailure());
    }
  };

export const signOutStartAsync = () => async (dispatch: UserThunkDispatch) => {
  dispatch(signOutStart());

  try {
    await auth.signOut();
    dispatch(signOutSuccess());
  } catch (err: unknown) {
    console.log("Error signing in with google", err);
    dispatch(signOutFailure());
  }
};

export const signUpStartAsync =
  (email: string, password: string, displayName: string) =>
  async (dispatch: UserThunkDispatch) => {
    dispatch(signUpStart());
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createUserProfileDocument(user, displayName);
      dispatch(signUpSuccess());
    } catch (err: unknown) {
      console.log("Error in signup", err);
      dispatch(signUpFailure());
    }
  };

/* 
try {
  const { user } = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
await createUserProfileDocument(user, displayName);

  // emptying form
  setCredentials({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
} catch (err: unknown) {
  console.log("Error in signup", err);
} */
