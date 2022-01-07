import React, { useState, useEffect } from "react";
import StripeCheckout from "../components/StripeCheckout";
import { Button } from "@material-ui/core";

const Checkout = ({ totalDuration, totalPrice, totalQuantity, getTotals, carts }) => {
  //get item count and cart total
  useEffect(() => {
    getTotals();
  }, []);

  return (
    <div>
      <h2>Checkout Summary </h2>
      <h3>Total Items: {totalQuantity}</h3>
      <h3>Total Days: {totalDuration}</h3>
      <h3>Total Price: ${totalPrice}</h3>
      <StripeCheckout carts={carts} />
      <Button>Clear Cart</Button>
    </div>
  );
};

export default Checkout;
