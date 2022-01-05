import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import getUserId from "../snippets/getUserId";
import getCoinPrice from "../snippets/getCoinPrice";
import axios from "axios";
/**
 *
 * @param {Object} props
 * @param {String} props.header
 * @param {String} props.body
 * @param {String} props.size
 */
const Card = ({ props }) => {
  const { id, header, quantity, size, duration, hashrate_id } = props;
  
  const [currQuantity, setCurrQuantity] = useState(1);
  const [currDuration, setCurrDuration] = useState(1);
  const [isAdded, setIsAdded] = useState(false)

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
    const coinPrice = await getCoinPrice(hashrate_id)
    const price = coinPrice * (currDuration+currQuantity)
    const userId = await getUserId();

    const cart = {
      borrower_id: userId,
      item_id: id,
      quantity: currQuantity,
      rental_duration: currDuration,
      amount: price,
    };

    const res = await axios.post("/api/carts/", cart);
    console.log(res);
  };

  //useeffect()
  //checking to see if item is in cart
  useEffect(() => {

    const getItems = async () => {
      const userId = await getUserId();

      const res = await axios.get(`/api/items/user/${userId}`);
      console.log(res)
      //check against current item id
      if (res.data.userItem) {
        setIsAdded(true);
      };
      
    };
    getItems()
    //get user id and check all items from user and compare against the current item id, if there set isAdded to true
  },[] )

  return (
    <>
      <div className="card bg-dark mt-3 mb-3" style={{ maxWidth: size }}>
        <h4 className="card-header text-light">{header}</h4>
        <div className="card-body text-light">{quantity}</div>
        <div className="text-light mt-2 mb-2">
          <Button variant="contained" onClick={handleIncreaseQuantity}>
            {" "}
            +
          </Button>
          Quantity: {currQuantity}
          <Button variant="contained" onClick={handleDecreaseQuantity}>
            {" "}
            -
          </Button>
        </div>
        <div className="text-light mt-2 mb-2">
          <Button variant="contained" onClick={handleIncreaseDuration}>
            {" "}
            +
          </Button>
          Duration: {currDuration} Day(s)
          <Button variant="contained" onClick={handleDecreaseDuration}>
            {" "}
            -
          </Button>
        </div>{" "}
        <Button
          className="mt-2 mb-2"
          variant="contained"
          onClick={handleAddItem}
        >
          {" "}
         Add Item
        </Button>
      </div>
    </>
  );
};

export default Card;
