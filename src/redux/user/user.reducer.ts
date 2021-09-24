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
    case UserActionTypes.SIGN_IN_SUCCESS:
    case UserActionTypes.SIGN_UP_SUCCESS:
      if (action.payload !== undefined)
        return {
          currentUser: action.payload,
        };
      return state;

    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        currentUser: null,
      };

    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return state;

    default:
      return state;
  }
};

export default userReducer;
