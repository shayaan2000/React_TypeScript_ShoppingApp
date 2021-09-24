import React from "react";
import "./collections-overview.styles.scss";
import CollectionPreview from "../collection-preview/collection-preview.component";
import { useSelector } from "react-redux";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selector";

const CollectionsOverview = () => {
  // this selector converts the Record to an array of ICollection for better mapping in UI
  const collections = useSelector(selectCollectionsForPreview);
  return (
    <div className="collections-overview">
      {collections.map((collection) => (
        <CollectionPreview key={collection.id} collectionItem={collection} />
      ))}
    </div>
  );
};

export default CollectionsOverview;
