import React from "react";
import { Card, CardActionArea } from "@material-ui/core";
//import icons minus, plus, and trash icon

const CartItem = ({ props }) => {
  const { amount, expired, item_id, quantity, rental_duration } = props;
  //item id
  //increase button would update the cart by searching by item id in cart id
  //update the quantity of that item
  //


  // console.log(item);
  // const {title, imageURl, price, quantity} = products
  return (
  <div>
    <ul>
      <li>item: {item}</li>
      <li>quantity: {quantity}</li>
      <li>amount: {amount}</li>
    </ul>
  </div>);
};

export default CartItem;
