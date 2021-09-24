import { UserActionTypes } from "./user.types";
import { UserType, IUserAction } from "./user.datatypes";
import { ThunkDispatch } from "redux-thunk";
import { IRootState } from "../root-reducer";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  signInWithGoogle,
  auth,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.util";
import { User } from "firebase/auth";
import { createUserWithEmailAndPassword } from "@firebase/auth";

export const setCurrentUser = (user: UserType): IUserAction => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInStart = () => ({
  type: UserActionTypes.SIGN_IN_START,
});

export const signInSuccess = (user: User) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
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
});

export const signOutFailure = () => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
});

export const signUpStart = () => ({
  type: UserActionTypes.SIGN_UP_START,
});

export const signUpSuccess = (user: User) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: user,
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
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(signInSuccess(user));
    } catch (err: unknown) {
      dispatch(signInFailure());
    }
  };

export const signInGoogleStartAsync =
  () => async (dispatch: UserThunkDispatch) => {
    dispatch(signInStart());

    try {
      const { user } = await signInWithGoogle();
      dispatch(signInSuccess(user));
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
      dispatch(signUpSuccess(user));
    } catch (err: unknown) {
      console.log("Error in signup", err);
      dispatch(signUpFailure());
    }
  };

export const checkCurrentUserAsync =
  () => async (dispatch: UserThunkDispatch) => {
    try {
      const user = await getCurrentUser();
      dispatch(setCurrentUser(user));
    } catch (error) {
      dispatch(setCurrentUser(null));
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
