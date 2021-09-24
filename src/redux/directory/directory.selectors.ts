import { createSelector } from "reselect";
import { IRootState } from "../root-reducer";
import { IDirectoryState } from "./directory.datatypes";

const selectDirectory = (state: IRootState): IDirectoryState => state.directory;

export const selectDirectorySections = createSelector(
  [selectDirectory],
  (directory) => directory.sections
);
