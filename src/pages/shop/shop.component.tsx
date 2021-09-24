import React, { useEffect } from "react";
import "./shop.styles.scss";
import { Route, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../../pages/collection/collection.component";

const ShopPage = () => {
  let isFetching = useSelector(selectIsCollectionFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCollections = async () => {
      dispatch(fetchCollectionsStartAsync());
    };
    fetchCollections();
  }, []);

  const match = useRouteMatch();
  return isFetching ? (
    <div className="spinner-overlay">
      <div className="spinner-container"></div>
    </div>
  ) : (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
};

export default ShopPage;
