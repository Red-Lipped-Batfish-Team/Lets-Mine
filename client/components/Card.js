import React, { useState, useEffect } from "react";
import getUserId from "../snippets/getUserId";
import getCoinPrice from "../snippets/getCoinPrice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  Button,
  Card as ItemCard,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  CssBaseline,
  ButtonGroup
} from "@material-ui/core";
/**
 *
 * @param {Object} props
 * @param {String} props.header
 * @param {String} props.body
 * @param {String} props.size
 */
const Card = ({ props }) => {
  const {
    id,
    model,
    quantity,
    size,
    duration,
    hashrate_id,
    cartItems,
    setCartItems,
  } = props;

  const [currQuantity, setCurrQuantity] = useState(1);
  const [currDuration, setCurrDuration] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch=useDispatch()

  const handleIncreaseQuantity = () => {
    if (currQuantity < quantity) {
      let newQuantity = currQuantity;
      return setCurrQuantity((newQuantity += 1));
    }
  };

  const handleDecreaseQuantity = () => {
    if (currQuantity > 1) {
      let newQuantity = currQuantity;
      return setCurrQuantity((newQuantity -= 1));
    }
  };

  const handleIncreaseDuration = () => {
    if (currDuration < duration) {
      let newDurr = currDuration;
      return setCurrDuration((newDurr += 1));
    }
  };

  const handleDecreaseDuration = () => {
    if (currDuration > 1) {
      let newDurr = currDuration;
      return setCurrDuration((newDurr -= 1));
    }
  };

  const handleAddItem = async () => {
    //get user id
    const coinPrice = await getCoinPrice(hashrate_id);
    const userId = await getUserId();
    const price = coinPrice * (currDuration + currQuantity);

    const cart = {
      borrower_id: userId,
      item_id: id,
      quantity: currQuantity,
      rental_duration: currDuration,
      amount: Math.trunc(price),
    };

    const res = await axios.post("/api/carts/", cart);
    setCartItems([...cartItems]);
    dispatch(addToCart({quantity: currQuantity}))
  };

  useEffect(() => {
    const getItems = async () => {
      const userId = await getUserId();

      const res = await axios.get(`/api/carts/user/${userId}`);
  
      res.data.userCart.map((elem) => {
        if (elem.item_id === id) {
          setIsAdded(true);
        }
      });
    };
    getItems();
  }, [cartItems]);

  return (
    <>
      <CssBaseline />
      <ItemCard>
        <CardHeader
          align="center"
          style={{ background: "#000", color: "#fff" }}
          // action={
          //   <IconButton aria-label="settings" onClick={handleDeleteCart}>
          //     <HighlightOffIcon />
          //   </IconButton>
          // }
          title={model}
        />
        <CardContent align="center">
          <Typography variant="body2">Quantity: {currQuantity}</Typography>
          <ButtonGroup className="mb-2">
            <Button variant="contained" onClick={handleIncreaseQuantity}>
              {" "}
              +
            </Button>
            <Button variant="contained" onClick={handleDecreaseQuantity}>
              {" "}
              -
            </Button>
          </ButtonGroup>

          <Typography variant="body2">Duration: {currDuration}</Typography>
          <ButtonGroup >
            <Button variant="contained" onClick={handleIncreaseDuration}>
              {" "}
              +
            </Button>
            <Button variant="contained" onClick={handleDecreaseDuration}>
              {" "}
              -
            </Button>
          </ButtonGroup>

          <div className="mt-2">
            {isAdded ? (
              <Button
                disabled
                variant="contained"
                className="text-light mt-2 mb-2"
              >
                Added
              </Button>
            ) : (
              <Button
                className="mt-2 mb-2"
                variant="contained"
                onClick={handleAddItem}
              >
                {" "}
                Add Item
              </Button>
            )}
          </div>
        </CardContent>
      </ItemCard>
    </>
  );
};

export default Card;
