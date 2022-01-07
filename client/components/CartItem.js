import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import getCoinPrice from "../snippets/getCoinPrice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateTotal } from "../features/cart/cartSlice";

const CartItem = ({ props, setUpdate }) => {
  const {
    id,
    amount,
    expired,
    item_id,
    quantity,
    rental_duration,
    model,
    max_duration,
    max_quantity,
    hashrate_id,
  } = props;

  const dispatch = useDispatch();
  const [cartItemQuantity, setCartItemQuantity] = useState(quantity);
  const [cartItemDuration, setCartItemDuration] = useState(rental_duration);
  const [cartItemTotalPrice, setCartItemTotalPrice] = useState(amount);
  let itemPrice = useRef(0);

  useEffect(() => {
    const getItemPrice = async () => {
      itemPrice = await getCoinPrice(hashrate_id);
    };
    getItemPrice();
  });

  const handleCartIncreaseQuantity = async () => {
    if (cartItemQuantity < max_quantity) {
      let newQuantity = cartItemQuantity;
      newQuantity += 1;
      let newAmount = amount;
      newAmount = itemPrice * (newQuantity + rental_duration);
      const res = await axios.patch(`/api/carts/${id}`, {
        quantity: newQuantity,
        amount: newAmount,
      });
      // console.log(res);
      dispatch(
        updateTotal({
          duration: 0,
          quantity: 1,
          price: itemPrice,
        })
      );
      setUpdate(newAmount);
      setCartItemQuantity(newQuantity);
      setCartItemTotalPrice(newAmount);
    }
  };

  // const handleCartDecreaseQuantity = () => {
  //   if (quantity > 1) {
  //     let newQuantity = quantity;
  //     return setCurrQuantity((newQuantity -= 1));
  //   }
  // };

  // const handleCartIncreaseDuration = () => {
  //   if (rental_duration < max_duration) {
  //     let newDurr = currDuration;
  //     return setCurrDuration((newDurr += 1));
  //   }
  // };

  // const handleCartDecreaseDuration = () => {
  //   if (duration > 1) {
  //     let newDurr = currDuration;
  //     return setCurrDuration((newDurr -= 1));
  //   }
  // };

  return (
    <div>
      <Card>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <HighlightOffIcon />
            </IconButton>
          }
          title={model}
          // subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2">
            Quantity: {cartItemQuantity}
            <Button
              size="small"
              color="primary"
              onClick={handleCartIncreaseQuantity}
            >
              +
            </Button>
            <Button size="small" color="primary">
              -
            </Button>
            <br />
            Duration: {cartItemDuration}
            <Button size="small" color="primary">
              +
            </Button>
            <Button size="small" color="primary">
              -
            </Button>
            <br />
            {/* Amount: ${amount}
            <br /> */}
          </Typography>
          <Typography className="mt-2">
            Amount: ${cartItemTotalPrice}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small" color="primary">
            +
          </Button>
          <Button size="small" color="primary">
            -
          </Button>
        </CardActions> */}
      </Card>
    </div>
  );
};

export default CartItem;
