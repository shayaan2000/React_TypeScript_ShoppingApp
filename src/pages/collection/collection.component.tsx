import React from "react";
import "./collection.styles.scss";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selector";

export const CollectionPage = () => {
  type TParams = { collectionId: string };
  let match = useRouteMatch<TParams>();
  let urlParam = match.params.collectionId;
  let collection = useSelector(selectCollection(urlParam));

  if (!collection) return <div>...</div>;

  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
