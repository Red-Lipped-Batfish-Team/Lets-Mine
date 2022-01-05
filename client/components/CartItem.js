import React from "react";
import { Card, CardActionArea } from "@material-ui/core";
//import icons minus, plus, and trash icon

const CartItem = ({ item }) => {
  //item id
  //increase button would update the cart by searching by item id in cart id
  //update the quantity of that item
  //
  console.log(item);
  // const {title, imageURl, price, quantity} = products
  return <div>{item}</div>;
};

export default CartItem;
