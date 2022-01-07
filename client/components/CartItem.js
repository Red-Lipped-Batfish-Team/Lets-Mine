import React from "react";
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
import getItemHashRate from "../snippets/getItem";
import getCoinPrice from "../snippets/getCoinPrice";

const CartItem = ({ props }) => {
  const { id, amount, expired, item_id, quantity, rental_duration, model } =
    props;

  //new quantity and duration state to be updated

  //item id
  //increase button would update the cart by searching by item id in cart id
  //update the quantity of that item
  //

  const handleCartIncreaseQuantity = () => {
    if (maxItemQuantity < quantity) {
      let newQuantity = quantity;
      return setCurrQuantity((newQuantity += 1));
    }
  };

  const handleCartDecreaseQuantity = () => {
    if (quantity > 1) {
      let newQuantity = quantity;
      return setCurrQuantity((newQuantity -= 1));
    }
  };

  const handleCartIncreaseDuration = () => {
    if (currDuration < duration) {
      let newDurr = currDuration;
      return setCurrDuration((newDurr += 1));
    }
  };

  const handleCartDecreaseDuration = () => {
    if (currDuration > 1) {
      let newDurr = currDuration;
      return setCurrDuration((newDurr -= 1));
    }
  };

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
            Quantity: {quantity}
            <Button size="small" color="primary">
              +
            </Button>
            <Button size="small" color="primary">
              -
            </Button>
            <br />
            Duration: {rental_duration}
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
