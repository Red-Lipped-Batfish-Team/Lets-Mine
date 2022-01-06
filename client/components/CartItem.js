import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardActionArea } from "@material-ui/core";
//import icons minus, plus, and trash icon

const CartItem = ({ props }) => {
  const { amount, expired, item_id, quantity, rental_duration, model } = props;
  //item id
  //increase button would update the cart by searching by item id in cart id
  //update the quantity of that item
  //


  // console.log(item);
  // const {title, imageURl, price, quantity} = products
  return (
  <div>
    <ul>
      <h3>model: {model}</h3>
      <li>item: {item_id}</li>
      <li>quantity: {quantity}</li>
      <li>amount: {amount}</li>
    </ul>
    <Link to='/checkout'>
        <div>
          <Button>Checkout</Button>
        </div>
      </Link>
  </div>);
};

export default CartItem;
