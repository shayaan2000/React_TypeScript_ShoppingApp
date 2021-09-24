import { IUserState, IUserAction } from "./user.datatypes";
import { UserActionTypes } from "./user.types";

const INITIAL_STATE: IUserState = {
  currentUser: null,
};

const userReducer = (
  state = INITIAL_STATE,
  action: IUserAction
): IUserState => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      if (typeof action.payload !== "string" && action.payload !== undefined)
        return {
          ...state,
          currentUser: action.payload,
        };
      return state;

    case UserActionTypes.SIGN_IN_SUCCESS:
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_SUCCESS:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_SUCCESS:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userReducer;
