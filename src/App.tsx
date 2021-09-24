import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/home/home.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignOutPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkCurrentUserAsync } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(checkCurrentUserAsync());
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route
          exact
          path="/signin"
          render={() => (user ? <Redirect to="/" /> : <SignInAndSignOutPage />)}
        />
      </Switch>
    </div>
  );
}

export default App;
