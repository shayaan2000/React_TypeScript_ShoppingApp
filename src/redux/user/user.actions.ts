import { UserActionTypes } from "./user.types";
import { UserType, IUserAction } from "./user.datatypes";

export const setCurrentUser = (user: UserType): IUserAction => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
