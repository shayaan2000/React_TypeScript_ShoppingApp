import React, { MouseEventHandler } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectCartItemsCount);
  const handleCartIconClick: MouseEventHandler<SVGSVGElement> = () => {
    dispatch(toggleCartHidden());
  };

  return (
    <div className="cart-icon">
      <ShoppingIcon className="shopping-icon" onClick={handleCartIconClick} />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
