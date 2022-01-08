import React, { useState, useEffect } from "react";
import StripeCheckout from "../components/StripeCheckout";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "axios";

const Checkout = ({ carts, setCarts }) => {
  const total = useSelector((state) => state.cart);
  const userId = carts[0].borrower_id;

  const handleClearCart = async () => {
    const res = await axios.delete(`/api/carts/user/${userId}`);
    setCarts([])
  };

  return (
    <div>
      <h2>Checkout Summary </h2>
      <h3>Total Items : {total.totalQuantity}</h3>
      <h3>Total Days : {total.totalDuration}</h3>
      <h3>Checkout Total : ${total.totalPrice}</h3>
      <StripeCheckout carts={carts} userId={userId}/>
      <Button onClick={handleClearCart}>Clear Cart</Button>
    </div>
  );
};

export default Checkout;
