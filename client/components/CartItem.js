import React, {useState, useEffect, useRef} from "react";
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
import axios from "axios"

const CartItem = ({ props, setTotalQuantity, setTotalDuration, totalDuration, totalQuantity }) => {
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
    hashrate_id
  } = props;

  const [cartItemQuantity, setCartItemQuantity] = useState(quantity)
  const [cartItemDuration, setCartItemDuration] = useState(rental_duration);
  const [cartItemTotalPrice, setCartItemTotalPrice] = useState(amount);

  const itemPrice = useRef(0)

  useEffect(() => {
    const getItemPrice = async () => {
      itemPrice = await getCoinPrice(hashrate_id);
    };
  })
  

  const handleCartIncreaseQuantity = async () => {
    if (quantity<max_quantity ) {
      let newQuantity = quantity 
      newQuantity += 1
      let newQuantity = quantity;
      newQuantity += 1;
      const res = await axios.patch(`/api/carts/${id}`, {quantity: newQuantity});
      console.log(res)
      setCartItemQuantity((newQuantity));
      setTotalQuantity(newQuantity)
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
            <Button size="small" color="primary" onClick={handleCartIncreaseQuantity}>
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
          <Typography className="mt-2">Amount: ${amount}</Typography>
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
