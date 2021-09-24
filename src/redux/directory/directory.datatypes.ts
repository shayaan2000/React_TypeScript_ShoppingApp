export interface ISection {
  title: string;
  imageUrl: string;
  id: number;
  linkUrl: string;
  size?: string;
}

export interface IDirectoryState {
  sections: ISection[];
}

export interface IDirectoryAction {
  type: string;
  payload: ISection;
}
