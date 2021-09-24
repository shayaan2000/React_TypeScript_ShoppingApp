import { User } from "firebase/auth";

export type UserType = User | null;

export interface IUserState {
  currentUser: UserType;
}

export interface IUserAction {
  type: string;
  payload?: UserType | string;
}
