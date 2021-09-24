import React from "react";
import "./collection-item.styles.scss";
import { IShopItem } from "../../redux/shop/shop.datatypes";
import CustomButton from "../custom-button/custom-button.component";
import { addItem } from "../../redux/cart/cart.actions";
import { useDispatch } from "react-redux";

interface ICollectionItemProps {
  item: IShopItem;
}

const CollectionItem = ({ item }: ICollectionItemProps) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = item;
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton
        inverted
        onClick={() => {
          dispatch(addItem(item));
        }}
      >
        ADD TO CART
      </CustomButton>
    </div>
  );
};

export default CollectionItem;
