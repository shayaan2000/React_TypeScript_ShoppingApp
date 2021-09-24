import React from "react";
import "./collection-preview.styles.scss";
import CollectionItem from "../collection-item/collection-item.component";
import { ICollection } from "../../redux/shop/shop.datatypes";

interface CollectionPreviewProps {
  collectionItem: ICollection;
}

const CollectionPreview = ({ collectionItem }: CollectionPreviewProps) => {
  const { title, items } = collectionItem;

  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {/*
            We are filtering so only have first 4. 
            After that we are mapping them 
        */}
        {items
          .filter((item, idx) => idx < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
