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
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
