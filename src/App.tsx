import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/home/home.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignOutPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth } from "./firebase/firebase.util";
import { User } from "firebase/auth";
import { Unsubscribe } from "@firebase/firestore";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
let unsubscribe: Unsubscribe | null = null;

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser); // just in state
      dispatch(setCurrentUser(firebaseUser));
      //dispatching
      console.log("User", firebaseUser);
    });

    return unsubscribe;
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

/* 
useEffect(() => {
    unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser); // just in state
      dispatch(setCurrentUser(firebaseUser));
      //dispatching
      console.log("User", firebaseUser);
    });

    return unsubscribe;
  }, []);


*/
