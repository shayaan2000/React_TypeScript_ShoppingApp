import { createSelector } from "reselect";
import { IUserState } from "./user.datatypes";
import { IRootState } from "../root-reducer";

const selectUser = (state: IRootState): IUserState => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
