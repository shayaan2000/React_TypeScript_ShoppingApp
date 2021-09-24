export interface IShopItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface ICollection {
  id: string;
  title: string;
  routeName: string;
  items: IShopItem[];
}

export type ShopCollectionsType = Record<string, ICollection>;

export interface IShopData {
  [key: string]: ICollection;
}

export interface IShopState {
  collections: ShopCollectionsType | null;
  errorMessage: string | undefined;
  isFetching: boolean;
}

export interface IShopAction {
  type: string;
  payload: string | ShopCollectionsType;
}
