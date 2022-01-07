import React, { useState, useEffect } from "react";
import StripeCheckout from "../components/StripeCheckout";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";

const Checkout = ({
  // totalDuration,
  // totalPrice,
  // totalQuantity,
  // getTotals,
  carts,
}) => {
  const total = useSelector((state) => state.cart);
  //get item count and cart total
  // useEffect(() => {
  //   getTotals();
  // }, []);
  console.log(total);

  return (
    <div>
      <h2>Checkout Summary </h2>
      <h3>Total Items: {total.totalQuantity}</h3>
      <h3>Total Days: {total.totalDuration}</h3>
      <h3>Total Price: ${total.totalPrice}</h3>
      <StripeCheckout carts={carts} />
      <Button>Clear Cart</Button>
    </div>
  );
};

export default Checkout;
