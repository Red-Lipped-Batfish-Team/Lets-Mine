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

const CartItem = ({ props, carts, setCarts}) => {
  const {
    id,
    amount,
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
      let newAmount = cartItemTotalPrice;
      newAmount = itemPrice * (newQuantity + cartItemDuration);
      
      const res = await axios.patch(`/api/carts/${id}`, {
        quantity: newQuantity,
        amount: newAmount.toFixed(2),
      });
      // console.log(res);
      dispatch(
        updateTotal({
          duration: 0,
          quantity: 1,
          price: itemPrice.toFixed(2),
        })
      );
      setCartItemQuantity(newQuantity);
      setCartItemTotalPrice(newAmount.toFixed(2));
    }
  };

  const handleCartDecreaseQuantity = async () => {
    if (cartItemQuantity > 1) {
      let newQuantity = cartItemQuantity;
      newQuantity -= 1;
      let newAmount = cartItemTotalPrice;
      newAmount = itemPrice * (newQuantity + cartItemDuration);

      const res = await axios.patch(`/api/carts/${id}`, {
        quantity: newQuantity,
        amount: newAmount.toFixed(2),
      });
      // console.log(res);
      dispatch(
        updateTotal({
          duration: 0,
          quantity: -1,
          price: itemPrice.toFixed(2),
        })
      );
      setCartItemQuantity(newQuantity);
      setCartItemTotalPrice(newAmount.toFixed(2));
    }
    }
  

  const handleCartIncreaseDuration = async() => {
    if (cartItemDuration < max_duration) {
      let newDuration = cartItemDuration;
      newDuration += 1;
      let newAmount = cartItemTotalPrice;
      newAmount = itemPrice * (newDuration + cartItemQuantity);

      const res = await axios.patch(`/api/carts/${id}`, {
        duration: newDuration,
        amount: newAmount.toFixed(2),
      });
      // console.log(res);
      dispatch(
        updateTotal({
          duration: 1,
          quantity: 0,
          price: itemPrice.toFixed(2),
        })
      );
      setCartItemDuration(newDuration);
      setCartItemTotalPrice(newAmount.toFixed(2));
    }
  };

  const handleCartDecreaseDuration = async () => {
    if (cartItemDuration > 1) {
      let newDuration = cartItemDuration;
      newDuration -= 1;
      let newAmount = cartItemTotalPrice;
      newAmount = itemPrice * (newDuration + cartItemQuantity);

      const res = await axios.patch(`/api/carts/${id}`, {
        duration: newDuration,
        amount: newAmount.toFixed(2),
      });
      // console.log(res);
      dispatch(
        updateTotal({
          duration: -1,
          quantity: 0,
          price: itemPrice.toFixed(2),
        })
      );
      setCartItemDuration(newDuration);
      setCartItemTotalPrice(newAmount.toFixed(2));
    }
  };

  const handleDeleteCart = async () => {
    const res = await axios.delete(`/api/carts/${id}`)
    let newCarts = carts.filter(cart => cart.id !== id)
    setCarts([...newCarts])
  }

  

  return (
    <div>
      <Card>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={handleDeleteCart}>
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
            <Button
              size="small"
              color="primary"
              onClick={handleCartDecreaseQuantity}
            >
              -
            </Button>
            <br />
            Duration: {cartItemDuration}
            <Button
              size="small"
              color="primary"
              onClick={handleCartIncreaseDuration}
            >
              +
            </Button>
            <Button size="small" color="primary" onClick={handleCartDecreaseDuration}>
              -
            </Button>
            <br />
            {/* Amount: ${amount}
            <br /> */}
          </Typography>
          <Typography className="mt-2">
            Total: ${cartItemTotalPrice}
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
